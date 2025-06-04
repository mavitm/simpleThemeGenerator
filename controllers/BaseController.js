const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require("node:path");

class BaseController {
  constructor(req, nunjucksExtensions) {
    this.req = req
    this.layout = 'default.njk'
    this.template = ''
    this.data = {}
    this.css = [
      '/assets/libs/bootstrap-5.3.6-dist/css/bootstrap.min.css'
    ]
    this.js = [
        '/assets/libs/anime/lib/anime.iife.min.js',
        '/assets/libs/bootstrap-5.3.6-dist/js/popper.min.js',
        '/assets/libs/bootstrap-5.3.6-dist/js/bootstrap.bundle.min.js',
        '/assets/js/main.js'
    ]
    
    this.extensions = nunjucksExtensions
  }

  setTemplate(templateName) {
    this.template = templateName
    return this
  }
  
  add(key, value){
    this.data[key] = value
    return this
  }

  addCss(path){
    if(!this.css.includes(path)){
      this.css.push(path)
    }
    return this
  }

  addJs(path){
    if(!this.js.includes(path)){
      this.js.push(path)
    }
    return this
  }
  
  put(name, html){
    if (this.extensions?.placeholder) {
      this.extensions.placeholder.put(name, html)
    }
    return this
  }
  
  async handle() {
    return this.render()
  }
  
  renderFile(templatePath, vars={}){
    // const fullPath = path.resolve(templatePath)
    // if(fs.existsSync(fullPath)){
    //   return nunjucks.render(templatePath, vars)
    // }
    // return templatePath+ ' templatePath not found '+fullPath
    return nunjucks.render(templatePath, vars)
  }
  
  makePartial(partialName, vars={}){
    //find partial @path, ~path, ../path, ./path
    const templatePath = `/partials/${partialName}.njk`
    return this.renderFile(templatePath, vars)
  }
  
  render() {
    const vars = {
      ...this.data,
      css: this.css,
      js: this.js
    }
    vars.page = this.renderFile(this.template, vars)
    const result = this.renderFile('layouts/'+this.layout, vars)
    Object.values(this.extensions).forEach(extension => {
      if(typeof extension.reset === 'function'){ extension.reset() }
    })
    return result
  }
}

module.exports = BaseController
