const BaseController = require('./BaseController')
const fs = require('fs')
const path = require('path')

let iconNames = []
try {
  iconNames = require('../public/assets/icons/lucide-icons.json')
} catch (err) {
  console.warn('Icon list could not be loaded. Have you run "npm run svg:sprite"?')
}


class IconsController extends BaseController {
  constructor(req, extensions) {
    super(req, extensions)
    this.template = 'icons.njk'
    this.data = {
      username: 'Arin',
      date: new Date().toLocaleDateString()
    }
    this.addCss('/assets/css/icons.css')
    this.addJs('/assets/js/icons.js')
  }

  async handle() {
    if (iconNames.length === 0) {
      try {
        const jsonPath = path.join(__dirname, '../public/assets/icons/lucide-icons.json')
        const json = await fs.promises.readFile(jsonPath, 'utf8')
        iconNames = JSON.parse(json)
      } catch (err) {
        console.error('Failed to load icon list:', err.message)
        iconNames = []
      }
    }
    this.add('allIcons', iconNames)

    return super.handle();
  }


}

module.exports = IconsController
