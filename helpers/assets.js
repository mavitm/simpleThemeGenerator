const sass = require('sass')
const fs = require('fs')
const path = require('path')
const terser = require('terser')

function compileSass() {
    return new Promise((resolve) => {
        const result = sass.compile(path.join(__dirname, '../scss/main.scss'), {
            style: 'compressed',
            quietDeps: true,
        })
        fs.writeFileSync(path.join(__dirname, '../public/assets/css/main.css'), result.css)
        console.log('✅ SCSS derlendi: css/main.css')
        resolve()
    })
}

async function compileJs() {
    const sourceDir = path.join(__dirname, '../source-js')
    const outputFile = path.join(__dirname, '../public/assets/js/main.js')
    try {
        const files = fs.readdirSync(sourceDir)
            .filter(f => f.endsWith('.js'))
            .sort()

        let combinedCode = ''

        for (const file of files) {
            const content = fs.readFileSync(path.join(sourceDir, file), 'utf-8')
            combinedCode += `\n// ${file}\n` + content + '\n'
        }

        const minified = await terser.minify(combinedCode, {
            format: {
                comments: false,
            }
        })

        fs.writeFileSync(outputFile, minified.code)
        console.log(`✅ JS birleştirildi ve minify edildi → ${outputFile}`)
    } catch (err) {
        console.error('❌ JS derleme hatası:', err.message)
    }
}



module.exports = {compileSass, compileJs}
