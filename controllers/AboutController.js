const BaseController = require('./BaseController')

class AboutController extends BaseController {
  constructor(req, extensions) {
    super(req, extensions)
    this.template = 'about.njk'
    this.data = {
      username: 'Arin',
      date: new Date().toLocaleDateString()
    }
    this.css = ['/assets/css/about.css']
    this.js = ['/assets/js/about.js']
  }
}

module.exports = AboutController
