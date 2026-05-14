const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

const dirs = ['src/components', 'src/pages'];
for (const dir of dirs) {
  const files = walkSync(path.join(__dirname, dir));
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Remove all inner "use client"; occurrences
    content = content.replace(/"use client";?\s*/g, '');
    content = content.replace(/'use client';?\s*/g, '');
    
    // Add it to the top
    fs.writeFileSync(file, '"use client";\n' + content);
    console.log(`Added use client to ${file}`);
  });
}
