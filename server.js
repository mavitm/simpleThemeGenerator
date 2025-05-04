// server.js
const express = require('express')
const nunjucks = require('nunjucks')
const sass = require('sass')
const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const livereload = require('livereload')
const connectLivereload = require('connect-livereload')

const { customizedNunjucks } = require('./helpers/custom-nunjucks')
const { compileSass } = require('./helpers/scss')
const { capitalize } = require('./helpers/utils')

const app = express()
const PORT = 3000

const originalStderr = process.stderr.write
process.stderr.write = function (chunk, encoding, callback) {
  const str = chunk.toString()
  if (str.indexOf('Deprecation Warning') > -1 || str.indexOf('deprecation warnings') > -1) {
    return true // yut
  }
  return originalStderr.call(process.stderr, chunk, encoding, callback)
}


// LiveReload
const liveReloadServer = livereload.createServer()
app.use(connectLivereload())

// Statik dosyalar
app.use(express.static('public'))

// Nunjucks yapılandırması
const nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
const customExtensions = customizedNunjucks(nunjucksEnv)

// SCSS watcher
chokidar.watch('scss/**/*.scss').on('change', (filePath) => {
  console.log(`🎨 SCSS değişti: ${filePath}`)
  compileSass()
  liveReloadServer.refresh('/')
})
compileSass()

// Template değişiklikleri için watcher
chokidar.watch('views/**/*.njk').on('change', (filePath) => {
  console.log(`📝 Template değişti: ${filePath}`)
  liveReloadServer.refresh('/')
})

chokidar.watch('controllers/**/*.js').on('change', (filePath) => {
  console.log(`🧠 Controller değişti: ${filePath}`)
  delete require.cache[require.resolve(path.resolve(filePath))]
  liveReloadServer.refresh('/')
})

// Dinamik route → controller yükle
app.get('/:page?', async (req, res) => {
  const page = req.params.page || 'home'
  const className = capitalize(page) + 'Controller'
  const controllerPath = path.join(__dirname, 'controllers', className + '.js')

  if (fs.existsSync(controllerPath)) {
    const ControllerClass = require(controllerPath)
    const controller = new ControllerClass(req, customExtensions)
    const html = await controller.render()
    res.send(html)
  } else {
    res.status(404).send(`<h1>404 - Controller '${className}' not found</h1>`)
  }
})

// Sunucu başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu hazır: http://localhost:${PORT}`)
})
