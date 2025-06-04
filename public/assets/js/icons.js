window.addEventListener('load', () => {


    
    const searchInput = document.getElementById('search-icons');
    const iconList = document.getElementById('icon-search');
    const listItems = iconList ? iconList.querySelectorAll('.searchable') : [];

    if (searchInput && iconList && listItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();

            listItems.forEach(listItem => {
                const dataKey = listItem.dataset.key.toLowerCase();

                if (searchText.length > 0 && dataKey.includes(searchText)) {
                    listItem.classList.add('b-inline');
                    listItem.classList.remove('d-none');
                } else if (searchText.length > 0) {
                    listItem.classList.add('d-none');
                    listItem.classList.remove('b-inline');
                } else {
                    listItem.classList.add('b-inline');
                    listItem.classList.remove('d-none');
                }
            });
        });
        
        document.querySelectorAll('.view-icon').forEach(icon => {
            icon.addEventListener('click', function () {
                viewSvg(this)
            })
        })
        document.getElementById('icon-copy').addEventListener('click', function () {
            copFromText(document.getElementById('icon-codes').value);
        })
    }
})

function viewSvg(elm){
    const iconName = elm.getAttribute('data-key')
    const iconSize = elm.getAttribute('data-size')
    const customIconsize = getIconTemplate(iconName, iconSize)
    const iconsize = getIconTemplate(iconName)
    const iconsizeX2 = getIconTemplate(iconName, 'x2', true)
    const iconsizeX3 = getIconTemplate(iconName, 'x3', true)
    const iconsizeX4 = getIconTemplate(iconName, 'x4', true)
    const iconsizeX4s = getIconTemplate(iconName, 'x4 spin', true)
    const iconsizeX4p = getIconTemplate(iconName, 'x4 pulse', true)
    document.getElementById("icon-modalLabel").innerText = 'lucide-'+iconName
    document.getElementById("icon-codes").value = customIconsize.outerHTML
    document.getElementById('icon-size').innerHTML = ''
    document.getElementById('icon-size').appendChild(iconsize)
    document.getElementById('icon-size').appendChild(iconsizeX2)
    document.getElementById('icon-size').appendChild(iconsizeX3)
    document.getElementById('icon-size').appendChild(iconsizeX4)
    document.getElementById('icon-size').appendChild(iconsizeX4s)
    document.getElementById('icon-size').appendChild(iconsizeX4p)
}


function getIconTemplate(name, cssClass = '', addAttr = false) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon ' + cssClass);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    if (addAttr) {
        svg.setAttribute('data-key', name);
        svg.setAttribute('data-size', cssClass);
        svg.addEventListener('click', () => { viewSvg(svg); });
    }

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icons/lucide-icons.svg?v=1#lucide-' + name);
    svg.appendChild(use);

    return svg;
}



