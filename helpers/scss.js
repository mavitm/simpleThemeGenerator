const sass = require('sass')
const fs = require('fs')
const path = require('path')

function compileSass() {
    const result = sass.compile(path.join(__dirname, '../scss/main.scss'), {
        style: 'compressed'
    })
    fs.writeFileSync(path.join(__dirname, '../public/assets/css/main.css'), result.css)
    console.log('✅ SCSS derlendi: css/main.css')
}

module.exports = { compileSass }
