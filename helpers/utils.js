function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function deCapitalize(str) {
    return str.charAt(0).toLowerCase() + str.slice(1)
}

function slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

function truncate(str, length = 50) {
    return str.length > length ? str.slice(0, length) + '...' : str
}

function ucWords(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase())
}

module.exports = {
    capitalize,
    slugify,
    truncate,
    ucWords,
    deCapitalize
}
