import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(directoryPath);

let modifiedFiles = 0;

files.forEach(file => {
  const originalContent = fs.readFileSync(file, 'utf8');
  let newContent = originalContent;

  const sizeMap = {
    'rounded-[large]': 'rounded-lg',
    'rounded-3xl': 'rounded-lg',
    'rounded-2xl': 'rounded-lg',
    'rounded-xl': 'rounded-md',
    'rounded-lg': 'rounded-md'
  };

  // Replace class names dynamically
  newContent = newContent.replace(/(className=|class=|`)(["`'])(.*?)\2/g, (match, prefix, quote, innerString) => {
    let newInner = innerString;
    
    // Process arbitrary large roundings first, e.g. rounded-[40px] -> rounded-lg
    newInner = newInner.replace(/\brounded-\[\d+(px|rem|em)\]\b/g, 'rounded-lg');

    // Process main corner replacements
    for(const [oldClass, newClass] of Object.entries(sizeMap)) {
      if(oldClass === 'rounded-[large]') continue;
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      newInner = newInner.replace(regex, newClass);
    }

    // Process rounded-full to rounded-md for elements that are likely buttons/badges
    // Heuristic: has px-* and py-* or is obviously a button
    if (newInner.includes('rounded-full')) {
      const isCircle = /\bw-(\d+|\[[^\]]+\])\b/.test(newInner) && /\bh-(\d+|\[[^\]]+\])\b/.test(newInner);
      const hasPadding = /\b(px-|py-|p-)\d+\b/.test(newInner);
      
      // If it has padding and is not explicitly a small circle (like w-4 h-4), it's a pill shape. 
      if (hasPadding && !isCircle) {
        newInner = newInner.replace(/\brounded-full\b/g, 'rounded-md');
      }
    }

    return `${prefix}${quote}${newInner}${quote}`;
  });

  if (originalContent !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedFiles++;
    console.log(`Updated: ${path.relative(__dirname, file)}`);
  }
});

console.log(`\nRefactoring complete! Updated ${modifiedFiles} files.`);
