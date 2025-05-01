# ChatGPT Hatırlatma: Nunjucks Placeholder Sistemi

Bu proje, Nunjucks template motoru ile dinamik içerik blokları üretmek için özel bir "placeholder/put" sistemi içeriyor. Aşağıdaki teknik parçalar üzerinde konuştuk ve çalışır hale getirdik:

## 📁 Yapı

- `PlaceholderStorage.js`: 
  - `put(name, html)`: belirli key’e içerik ekler
  - `get(name)`: içerik okur
  - `reset()`: tümünü sıfırlar

- `PutTag.js`:
  - `{% put 'key' %}...{% endput %}` tag’ini Nunjucks içinde tanımlar
  - `parse()` içinde `parser.parseExpression()` + `body` ile çalışır
  - `run()` içinde `body()` çağrılarak içeriği saklar

- `PlaceholderTag.js`:
  - `{% placeholder 'key' %}` ile içerik bastırır
  - `parse()` içinde `parser.parseExpression()` ile `name` alır
  - `run()` içinde `this.placeholderStorage.get(name)` çağrılır

## 🧠 Teknik Detaylar

- `parse()` fonksiyonlarında `parser.parseExpression()` kullanıldı
- `args.addChild(new nodes.Literal(...))` ile `name` node’un düzgün çözülmesi sağlandı
- `run(context, name)` içinde `name?.value` ile key elde edildi
- `content` → `SafeString(html)` ile güvenli şekilde placeholder’a yazıldı

## 🔧 Kullanım

```njk
{% put 'meta' %}
  <meta name="description" content="Açıklama">
{% endput %}

{% placeholder 'meta' %}
