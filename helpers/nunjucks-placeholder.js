/****
 layout.njk:
 <head>
 {% placeholder meta %}
 </head>

 use page njk:
 {% put meta %}
 <meta name="description" content="Ana sayfa açıklaması">
 {% endput %}
 ****/

const nunjucks = require('nunjucks')

// ───── Placeholder Storage ─────
class PlaceholderStorage {
    constructor() {
        this.placeholders = {}
    }

    put(name, content) {
        const key = typeof name === 'string' ? name : name?.value
        if (!this.placeholders[key]) this.placeholders[key] = []
        this.placeholders[key].push(content)
    }

    get(name) {
        return this.placeholders[name]?.join('\n') || ''
    }

    reset() {
        this.placeholders = {}
    }
}

// ───── {% put %} Tag ─────
class PutTag {
    constructor(placeholderStorage) {
        this.tags = ['put']
        this.placeholderStorage = placeholderStorage
    }

    parse(parser, nodes) {
        const tok = parser.nextToken()
        const args = new nodes.NodeList(tok.lineno, tok.colno)

        const name = parser.parsePrimary()
        //args.addChild(name)
        args.addChild(new nodes.Literal(name.lineno, name.colno, name.value))
        
        // Bu satır kritik: {% put name %} tag'inin bittiğini belirtir
        parser.advanceAfterBlockEnd('put') // 🔥 string zorunlu!

        // Şimdi {% endput %} tag'ine kadar body'yi alıyoruz
        const body = parser.parseUntilBlocks('endput')
        parser.advanceAfterBlockEnd()

        //args.addChild(body)
        return new nodes.CallExtension(this, 'run', args, [body])
    }

    run(context, name, body) {
        try {
            const raw = body()
            this.placeholderStorage.put(name, new nunjucks.runtime.SafeString(raw))
        } catch (e) {
            this.placeholderStorage.put(name, '')
        }
        return ''
    }

}

// ───── {% placeholder %} Tag ─────
class PlaceholderTag {
    constructor(placeholderStorage) {
        this.tags = ['placeholder']
        this.placeholderStorage = placeholderStorage
    }

    parse(parser, nodes) {
        parser.nextToken() // atla {% placeholder ... %}
        const nameNode = parser.parseExpression()
        parser.advanceAfterBlockEnd('placeholder')
        const args = new nodes.NodeList()
        args.addChild(new nodes.Literal(nameNode.lineno, nameNode.colno, nameNode.value))
        return new nodes.CallExtension(this, 'run', args)
    }
    
    run(context, name) {
        const key = typeof name === 'string' ? name : name?.value
        const html = this.placeholderStorage.get(key)
        return new nunjucks.runtime.SafeString(html)
    }
}

// ───── Export All ─────
module.exports = {
    PlaceholderStorage,
    PutTag,
    PlaceholderTag
}
