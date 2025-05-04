
# 📦 Proje Kurulum Rehberi (`setup.md`)

Bu proje SCSS, TailwindCSS ve Nunjucks tabanlı bir tema geliştirme altyapısı sunar.  
Sayfa/layout üretimi, otomatik derleme ve canlı sunucu özellikleriyle birlikte çalışır.

---

## ⚙️ Gereksinimler

- **Node.js** v18+
- **TailwindCSS CLI** (global olarak kurulu olmalı)
- (Opsiyonel) **PowerShell script izni** (Windows kullanıcıları için gerekli olabilir)

---

## 🔧 TailwindCSS Kurulumu

Proje, TailwindCSS CLI aracılığıyla `main.css` dosyasını oluşturur.

```bash
npm install -g tailwindcss
```

Kurulumun başarıyla gerçekleştiğini doğrulamak için:

```bash
tailwindcss -v
```

Örnek çıktı:

```bash
tailwindcss v4.1.5
```

---

### ❗ tailwindcss komutu tanınmıyorsa

Şu dizini sistem `PATH` ortam değişkeninize ekleyin:

```
C:\Users\KULLANICI_ADI\AppData\Roaming\npm
```

---

### ⚠️ PowerShell Script Engeli (Windows)

Eğer şu şekilde bir hata alırsanız:

```
tailwindcss.ps1 cannot be loaded because running scripts is disabled...
```

PowerShell'de aşağıdaki komutla script çalıştırma iznini verebilirsiniz:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Bu işlem yalnızca bir kez yapılmalıdır.

---

## 🔨 Derleme Süreci

- `main.scss` dosyası önce `sass` ile derlenir (modüller `_*.scss` olarak tanımlıdır).
- Ortaya çıkan geçici CSS, `tailwindcss` CLI ile post-process edilir.
- Nihai `main.css` dosyası `public/assets/css/` içine yazılır.

---

## 🧩 Kullanım Komutları

### Geliştirme Sunucusu Başlatma

```bash
npm run serve
```

### HTML Build Alma

```bash
npm run build:html
```

---

## 📄 Sayfa ve Layout Üretimi

### Yeni Sayfa Oluşturma

```bash
npm run create -- page about
```

veya

```bash
node arin.js create page about
```

> `about`: oluşturulacak sayfanın adı

---

### Yeni Layout Oluşturma

```bash
npm run create -- layout about
```

veya

```bash
node arin.js create layout about
```

> `about`: oluşturulacak layout'un adı

---

## 📁 Proje Dosya Yapısı

```plaintext
project-root/
│
├── scss/
│   ├── _variables.scss
│   ├── _colors.scss
│   ├── _buttons.scss
│   └── main.scss
│
├── public/
│   └── assets/
│       └── css/
│           └── main.css
│
├── views/
│   ├── layouts/
│   ├── partials/
│   └── pages/
│
├── controllers/
│   └── HomeController.js
│
├── arin.js
├── server.js
└── setup.md
```

---

## 🧠 Notlar

- SCSS modülleri `_` ile başlamalıdır (`_variables.scss` gibi).
- `main.scss` dosyası, bu modülleri `@import` ile içeri alır.
- Tailwind post-process işlemi, `scss` derlemesinden sonra uygulanır.
- `compileSass()` fonksiyonu içinde bu süreç zincirleme olarak gerçekleştirilir.
- `tailwindcss` CLI doğrudan `exec` ile çağrılır; global olarak erişilebilir olmalıdır.

---

Bu `setup.md` dosyasını projenin kök dizinine ya da `docs/` klasörüne ekleyerek geliştiricilere referans olarak sunabilirsiniz.
