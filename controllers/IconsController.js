const BaseController = require('./BaseController')
const fs = require('fs');
const path = require('path');
const icons = require('../public/assets/icons/lucide-icons.json').map(icon => icon.name).join('')

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
    const jsonPath = path.join(__dirname, '../public/assets/icons/lucide-icons.json')
    const json = await fs.promises.readFile(jsonPath, 'utf8')
    this.add('allIcons', JSON.parse(json))
    
    return super.handle();
  }

}

module.exports = IconsController
