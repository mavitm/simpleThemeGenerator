const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
const { customizedNunjucks } = require('./helpers/custom-nunjucks')
const { capitalize } = require('./helpers/utils')

const controllersDir = path.join(__dirname, 'controllers')
const publicDir = path.join(__dirname, 'public')

// Nunjucks ortamını oluştur
let nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  watch: false
})
nunjucksEnv = customizedNunjucks(nunjucksEnv)

async function buildControllers() {
  const files = fs.readdirSync(controllersDir)

  for (const file of files) {
    if (!file.endsWith('Controller.js') || file === 'BaseController.js') continue

    const controllerPath = path.join(controllersDir, file)
    const ControllerClass = require(controllerPath)

    const page = file.replace('Controller.js', '').toLowerCase()

    const fakeReq = {
      params: { page },
      url: `/${page === 'home' ? '' : page}`,
      query: {},
      body: {},
      method: 'GET',
      headers: {}
    }

    const controller = new ControllerClass(fakeReq, nunjucksEnv)

    try {
      const html = await controller.handle()
      const fileName = controller.template.replace('.njk', '.html')
      const filePath = path.join(publicDir, fileName)

      fs.writeFileSync(filePath, html, 'utf8')
      console.log(`✓ ${fileName} başarıyla oluşturuldu.`)
    } catch (err) {
      console.error(`✗ ${file} build edilirken hata oluştu:`, err)
    }
  }
}

// Script başlat
buildControllers().catch((err) => {
  console.error('Build sırasında genel bir hata oluştu:', err)
})
