import path from 'path';


export function goUp() {
  let currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);
  if (parentDir !== currentDir) {
   process.chdir(parentDir);
  }
  console.log(`You are now in ${process.cwd()}`);
}
