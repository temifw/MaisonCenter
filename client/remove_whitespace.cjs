const fs = require('fs');
const path = require('path');

const dir = '/home/fazl/maison center/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace max-w-[1440px] mx-auto with w-full
  content = content.replace(/max-w-\[1440px\]\s+mx-auto/g, 'w-full');
  content = content.replace(/mx-auto\s+max-w-\[1440px\]/g, 'w-full');
  
  // Also reduce px-20 to px-8 and px-margin-desktop to px-8 so it feels more edge-to-edge
  content = content.replace(/\bpx-20\b/g, 'px-8 md:px-12');
  content = content.replace(/\bpx-margin-desktop\b/g, 'px-8 md:px-12');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
