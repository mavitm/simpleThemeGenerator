window.addEventListener('load', function() {
    if(document.querySelectorAll('[data-bs-toggle="tooltip"]')){
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
    if(document.querySelectorAll('[data-bs-toggle="popover"]')){
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    }
    if(document.querySelectorAll('[data-copy-text]')){
        const listItems = document.querySelectorAll('[data-copy-text]');
        listItems.forEach(listItem => {
            listItem.addEventListener('click', function() {
                const copyText = this.getAttribute('data-copy-text');
                copFromText(copyText);
            });
        });
    }
})


function copFromText(copyText) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText)
            .then(() => {
                viewToast('Copied to clipboard: ' + copyText);
            })
            .catch(err => {
                console.error('Panoya kopyalama başarısız:', err);
            });
    } else {
        fallbackCopyTextToClipboard(copyText);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = 0;
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        viewToast('Copied to clipboard: ' + text);
    } catch (err) {
        console.error(err);
    }
    document.body.removeChild(textArea);
}

function viewToast(text){
    const toast = document.createElement('div');
    toast.classList.add('toast', 'show', 'bg-dark', 'text-white', 'position-fixed', 'bottom-0', 'start-0', 'm-3', 'p-3');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}