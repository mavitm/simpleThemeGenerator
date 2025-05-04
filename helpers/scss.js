// const sass = require('sass')
// const fs = require('fs')
// const path = require('path')
//
// function compileSass() {
//     const result = sass.compile(path.join(__dirname, '../scss/main.scss'), {
//         style: 'compressed',
//         quietDeps: true,
//     })
//     fs.writeFileSync(path.join(__dirname, '../public/assets/css/main.css'), result.css)
//     console.log('✅ SCSS derlendi: css/main.css')
// }
//
// module.exports = { compileSass }

// const { exec } = require('child_process')
// const path = require('path')
//
// function compileSass() {
//     const input = path.join(__dirname, '../scss/main.scss')
//     const output = path.join(__dirname, '../public/assets/css/main.css')
//
//     const cmd = `tailwindcss -i "${input}" -o "${output}" --minify`
//
//     exec(cmd, (err, stdout, stderr) => {
//         if (err) return console.error('❌ Tailwind derleme hatası:', err.message)
//         if (stderr) console.error('⚠️ Tailwind uyarı:', stderr)
//         console.log('✅ Tailwind derlendi:', output)
//     })
// }
//
// module.exports = { compileSass }

const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

function compileSass() {
    const inputScss = path.join(__dirname, '../scss/main.scss')
    const tempCss = path.join(__dirname, '../temp/main.css')
    const outputCss = path.join(__dirname, '../public/assets/css/main.css')

    // 1. SCSS derle → temp CSS üret
    exec(`npx sass "${inputScss}" "${tempCss}"`, (sassErr) => {
        if (sassErr) return console.error('❌ SCSS derleme hatası:', sassErr.message)

        // 2. Tailwind ile post-process et → minify output
        const tailwindCmd = `tailwindcss -i "${tempCss}" -o "${outputCss}" --minify`
        exec(tailwindCmd, (twErr, stdout, stderr) => {
            if (twErr) return console.error('❌ Tailwind derleme hatası:', twErr.message)
            if (stderr) console.error('⚠️ Tailwind uyarı:', stderr)
            console.log('✅ Tailwind derlendi:', outputCss)

            // 3. temp dosyasını sil (isteğe bağlı)
            fs.unlinkSync(tempCss)
        })
    })
}

module.exports = { compileSass }