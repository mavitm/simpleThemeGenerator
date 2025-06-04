function storageAdapter(storage = localStorage) {
    this.adapter = storage
}

storageAdapter.prototype.set = function (key, value) {
    let update = false,
        oldValue = null
    if (this.has(key)) {
        update = true
        oldValue = this.get(key)
    }
    this.adapter.setItem(key, JSON.stringify(value))
    if (update) {
        this._appTriggerEvent('storage.changeItem', {key, newValue: value, oldValue})
    } else {
        this._appTriggerEvent('storage.newItem', {key, newValue: value})
    }
    this._appTriggerEvent('storage.setItem', {key, newValue: value})
}

storageAdapter.prototype.get = function (key, defaultVal = null) {
    const value = this.adapter.getItem(key)
    if (value === null) {
        return defaultVal
    }
    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}
storageAdapter.prototype.remove = storageAdapter.prototype.del = function (key) {
    let deleteItem = this.get(key)
    this.adapter.removeItem(key)
    if (deleteItem === null) {
        return false
    }
    this._appTriggerEvent('storage.deletedItem', {item: deleteItem})
    return true
}

storageAdapter.prototype.has = function (key) {
    return this.adapter.getItem(key) !== null;
}

storageAdapter.prototype.clear = function () {
    this.adapter.clear()
}

storageAdapter.prototype._appTriggerEvent = function (name, detailDict) {
    eventBus.emit(name, detailDict)
}

function temporaryData(expiryTime = 10000) {
    this.temporaryData = {}
    this.expiryTime = expiryTime
}

temporaryData.prototype.setItem = temporaryData.prototype.set = function (key, value, expiryTime = null) {
    if (Object.prototype.hasOwnProperty.call(this.temporaryData, key)) {
        clearTimeout(this.temporaryData[key].interval)
    }
    expiryTime = expiryTime || this.expiryTime
    this.temporaryData[key] = {
        value,
        expiryTime,
        interval: setTimeout(() => {
            delete this.temporaryData[key]
        }, expiryTime)
    }
}

temporaryData.prototype.getItem = function (key, defaultVal = null) {
    if (Object.prototype.hasOwnProperty.call(this.temporaryData, key)) {
        return this.temporaryData[key].value
    }
    return defaultVal
}

temporaryData.prototype.removeItem = function (key) {
    if (Object.prototype.hasOwnProperty.call(this.temporaryData, key)) {
        clearTimeout(this.temporaryData[key].interval)
        delete this.temporaryData[key]
    }
}

temporaryData.prototype.clear = function () {
    for (let key in this.temporaryData) {
        clearTimeout(this.temporaryData[key].interval)
        delete this.temporaryData[key]
    }
}

temporaryData.prototype.has = function (key) {
    return Object.prototype.hasOwnProperty.call(this.temporaryData, key)
}

temporaryData.prototype.get = temporaryData.prototype.getItem
temporaryData.prototype.remove = temporaryData.prototype.removeItem
temporaryData.prototype.del = temporaryData.prototype.removeItem

function isLocalStorageAvailable() {
    try {
        const testKey = '__test__'
        localStorage.setItem(testKey, 'ok')
        localStorage.removeItem(testKey)
        return true
    } catch (e) {
        return false
    }
}

if (isLocalStorageAvailable()) {
    window.storage = new storageAdapter()
} else {
    window.storage = new storageAdapter(new temporaryData(86400 * 1000))
}

window.temporaryData = new temporaryData()