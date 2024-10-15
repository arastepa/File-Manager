import fs from 'fs';
import path from 'path';

export function listDirectory() {
    try {

        const items = fs.readdirSync(process.cwd());
        const directories = items.filter(item => fs.lstatSync(path.join(process.cwd(), item)).isDirectory()).sort();
        const files = items.filter(item => fs.lstatSync(path.join(process.cwd(), item)).isFile()).sort();
        directories.forEach((dir, index) => console.log(`| ${index} | DIR: | ${dir}`));
        files.forEach((file, index) => console.log(`| ${index} | FILE: | ${file}`));
    }
    catch
    {
        console.log('operation failed');
    }
  }
  