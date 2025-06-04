const eventBus = {
    emit(name, detail = {}) {
        document.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }))
    },
    on(name, handler) {
        document.addEventListener(name, e => handler(e.detail))
    },
    off(name, handler) {
        document.removeEventListener(name, handler)
    }
}

window.eventBus = eventBus
