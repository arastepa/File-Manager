import fs from 'fs';
import path from 'path';

export function renameFile(oldPath, newFileName) {
    const fullOldPath = path.isAbsolute(oldPath) ? oldPath : path.join(process.cwd(), oldPath);
    const newPath = path.join(path.dirname(fullOldPath), newFileName);
    fs.renameSync(fullOldPath, newPath);
  }