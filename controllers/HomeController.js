const BaseController = require('./BaseController')

class HomeController extends BaseController {
  constructor(req, extensions) {
    super(req, extensions)
    this.template = 'index.njk'
    this.add('username', 'Ayhan').add('date', new Date().toLocaleDateString())
    this.addCss('/assets/css/home.css')
  }
  
  render() {
    return super.render();
  }

}

module.exports = HomeController
