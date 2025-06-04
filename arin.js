#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Yardımcılar
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const [,, command, type, nameRaw] = process.argv

if (command !== 'create' || !type || !nameRaw) {
    console.log('Kullanım: node arin.js create [page|layout] <isim>')
    process.exit(1)
}

const name = nameRaw.toLowerCase()

if (type === 'page') {
    const className = capitalize(name) + 'Controller'
    const controllerFile = path.join(__dirname, 'controllers', `${className}.js`)
    const viewFile = path.join(__dirname, 'views', `${name}.njk`)
    const viewFileCss = path.join(__dirname, 'public/assets/css', `${name}.css`)
    const viewFileJs = path.join(__dirname, 'public/assets/js', `${name}.js`)

    const controllerContent = `const BaseController = require('./BaseController')

class ${className} extends BaseController {
  constructor(req, extensions) {
    super(req, extensions)
    this.template = '${name}.njk'
    this.data = {
      username: 'Arin',
      date: new Date().toLocaleDateString()
    }
    this.css = ['/assets/css/${name}.css']
    this.js = ['/assets/js/${name}.js']
  }
}

module.exports = ${className}
`

    const viewContent = `{% extends "layouts/default.njk" %}

{% block title %}${capitalize(name)}{% endblock %}

{% block content %}
<p>Merhaba ben {{ username }}</p>

<p>Bu içerik ${name}.njk içinden geliyor.</p>
<p>Bugünün tarihi: {{ date }}</p>
{% endblock %}
`

    if (fs.existsSync(controllerFile) || fs.existsSync(viewFile)) {
        console.error(`✗ ${className}.js veya ${name}.njk zaten mevcut.`)
        process.exit(1)
    }

    fs.writeFileSync(controllerFile, controllerContent)
    fs.writeFileSync(viewFile, viewContent)
    fs.writeFileSync(viewFileCss, '')
    fs.writeFileSync(viewFileJs, '')

    console.log(`✓ ${className}.js ve ${name}.njk oluşturuldu.`)
}

else if (type === 'layout') {
    const layoutFile = path.join(__dirname, 'views', 'layouts', `${name}.njk`)

    const layoutContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% block title %}Varsayılan Başlık{% endblock %}</title>
  <link rel="stylesheet" href="/assets/css/main.css">
  {% if css %}
    {% for file in css %}
      <link rel="stylesheet" href="{{ file }}">
    {% endfor %}
  {% endif %}
</head>
<body>
  {% include "partials/header.njk" %}
  <main>
    {% block content %}{% endblock %}
  </main>

  {% placeholder test %}

  {% if js %}
    {% for file in js %}
      <script src="{{ file }}"></script>
    {% endfor %}
  {% else %}
    js yoktu
  {% endif %}
</body>
</html>
`

    if (fs.existsSync(layoutFile)) {
        console.error(`✗ ${name}.njk layout'u zaten mevcut.`)
        process.exit(1)
    }

    fs.writeFileSync(layoutFile, layoutContent)
    console.log(`✓ Layout oluşturuldu: layouts/${name}.njk`)
}

else {
    console.error(`✗ Bilinmeyen tür: ${type}`)
    process.exit(1)
}
