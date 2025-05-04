# placeholder
https://mozilla.github.io/nunjucks/api.html#custom-tags

------------------------------------------------------
use njk file
```html
<html>
    <head>
        {% placeholder head %}
    </head>
    <body>
        {% placeholder body %}
    ...
```

*put from controller side*
```js
  render() {
    this.put('head', '<title>Home</title>') 
    this.put('body', this.renderFile('your.njk', this.data)
    return super.render();
  }
```
*put from njk to njk*
```html
{% put head %}
    <title>Home</title>
{% endput %}

{% put body %}
    {% include "page.njk" %}
{% endput %}
```


# docs
https://mozilla.github.io/nunjucks/templating.html
