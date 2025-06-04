const fs = require('fs');
const path = require('path');
const lucide = require('lucide');

const outputDir = path.resolve(__dirname, '../public/assets/icons');
const spritePath = path.join(outputDir, 'lucide-icons.svg');
const jsonPath = path.join(outputDir, 'lucide-icons.json');

console.log({outputDir, spritePath})
const iconNames = []
let svgSpriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">`;

for (const iconName in lucide.icons) {
    const iconData = lucide.icons[iconName];
    const aliasName = String(iconName[0]).toLowerCase()+String(iconName).slice(1);
    let svgPath = '';
    
    iconData.forEach(element => {
        const [tag, attributes] = element;
        let attrsString = '';
        for (const key in attributes) {
            attrsString += ` ${key}="${attributes[key]}"`;
        }
        svgPath += `<${tag}${attrsString}></${tag}>`;
    });

    svgSpriteContent += `
    <symbol id="lucide-${aliasName}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${svgPath}
    </symbol>
  `;

    iconNames.push(aliasName)
}

svgSpriteContent += `</svg>`;

fs.mkdirSync(outputDir, {recursive: true});

fs.writeFileSync(spritePath, svgSpriteContent, 'utf-8');
fs.writeFileSync(jsonPath, JSON.stringify(iconNames), 'utf-8');

console.log('Lucide ikon sprite başarıyla oluşturuldu:', spritePath);