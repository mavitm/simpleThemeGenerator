window.themeOpt = {}
function themeViewInit() {
    const opt = window.storage.get('theme_ui', false)
    if (opt) {
        themeOpt.currentColor = opt.currentColor || 'dark'
        themeOpt.context = opt.context || 'system'

        if (Object.prototype.hasOwnProperty.call(opt, 'context')) {
            applyViewColor(opt.context)
        } else {
            applyViewColor('system')
        }
    } else {
        applyViewColor('system')
    }
}

function applyViewColor(strContext) {
    const opt = {
        currentColor: 'light',
        context: strContext
    }

    console.log(strContext)
    
    if (strContext === 'system') {
        opt.currentColor =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
    } else if (strContext === 'light' || strContext === 'dark') {
        opt.currentColor = strContext
    } else {
        opt.currentColor = 'dark'
    }

    // Her ihtimale karşı tüm temaları kaldır
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(opt.currentColor)

    // Bootstrap tema özelliği
    document.documentElement.setAttribute('data-bs-theme', opt.currentColor)

    // Global tema ayarını güncelle
    themeOpt.currentColor = opt.currentColor
    themeOpt.context = opt.context

    // Kalıcı ayar olarak sakla
    window.storage.set('theme_ui', themeOpt)
}


window.addEventListener('load', () => {
    themeViewInit()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        //const newColorScheme = e.matches ? "dark" : "light";
        themeViewInit()
    })
})