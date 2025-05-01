const BaseController = require('./BaseController')

class HomeController extends BaseController {
  constructor(req, extensions) {
    super(req, extensions)
    this.template = 'index.njk'
    this.data = {
      username: 'Ayhan',
      date: new Date().toLocaleDateString()
    }
    this.css = ['/assets/css/home.css']
    this.js = ['/assets/js/home.js']
  }
}

module.exports = HomeController
