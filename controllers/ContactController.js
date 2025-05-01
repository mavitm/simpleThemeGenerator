const BaseController = require('./BaseController')

class ContactController extends BaseController {
  constructor(req, extensions) {
    super(req, extensions)
    this.template = 'contact.njk'
    this.data = {
      username: 'Arin',
      date: new Date().toLocaleDateString()
    }
    this.css = ['/assets/css/contact.css']
    this.js = ['/assets/js/contact.js']
  }
}

module.exports = ContactController
