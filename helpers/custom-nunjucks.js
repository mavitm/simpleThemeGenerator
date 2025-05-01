const dayjs = require('dayjs')
const {
    capitalize,
    deCapitalize,
    ucWords,
    slugify,
    truncate
} = require('./utils')
const { PlaceholderStorage, PutTag, PlaceholderTag } = require('./nunjucks-placeholder')

function customizedNunjucks(env) {
    //registerNunjucksFilters(env)

    const placeholderStorage = new PlaceholderStorage()
    env.addExtension('put', new PutTag(placeholderStorage))
    env.addExtension('placeholder', new PlaceholderTag(placeholderStorage))

    return {
        placeholder: placeholderStorage,
    }
}

function registerNunjucksFilters(env) {
    // Basit string yardımcıları
    env.addFilter('capitalize', capitalize)
    env.addFilter('deCapitalize', deCapitalize)
    env.addFilter('ucWords', ucWords)
    env.addFilter('slugify', slugify)
    env.addFilter('truncate', truncate)


    env.addFilter('money', num =>
        Number(num).toLocaleString('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2
        })
    )

    env.addFilter('date', (val, fmt = 'DD.MM.YYYY') =>
        dayjs(val).format(fmt)
    )

    env.addFilter('time', val =>
        dayjs(val).format('HH:mm')
    )
}

module.exports = {customizedNunjucks}
