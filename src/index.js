import fs from 'fs';
import path from 'path';
import os from 'os';
import { userInfo } from 'os';
import readline from 'readline';
import { pipeline } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import crypto from 'crypto';
import { goUp } from './nwd/up';
import { changeDirectory } from './nwd/changeDir';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : userInfo().username;

let currentDir = os.homedir();
console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', async (input) => {
  const [command, ...args] = input.trim().split(' ');

  try {
    switch (command) {
      case 'up':
        goUp();
        break;
      case 'cd':
        changeDirectory(args[0]);
        break;
      case 'ls':
        listDirectory();
        break;
      case 'cat':
        readFile(args[0]);
        break;
      case 'add':
        createFile(args[0]);
        break;
      case 'rn':
        renameFile(args[0], args[1]);
        break;
      case 'cp':
        copyFile(args[0], args[1]);
        break;
      case 'mv':
        moveFile(args[0], args[1]);
        break;
      case 'rm':
        deleteFile(args[0]);
        break;
      case 'os':
        handleOsCommand(args[0]);
        break;
      case 'hash':
        calculateHash(args[0]);
        break;
      case 'compress':
        compressFile(args[0], args[1]);
        break;
      case 'decompress':
        decompressFile(args[0], args[1]);
        break;
      case '.exit':
        exitProgram();
        break;
      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  } finally {
    printCurrentDirectory();
  }
});

rl.on('SIGINT', exitProgram);

function exitProgram() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
}

function printCurrentDirectory() {
  console.log(`You are currently in ${currentDir}`);
}

function listDirectory() {
  const items = fs.readdirSync(currentDir);
  const directories = items.filter(item => fs.lstatSync(path.join(currentDir, item)).isDirectory()).sort();
  const files = items.filter(item => fs.lstatSync(path.join(currentDir, item)).isFile()).sort();
  directories.forEach(dir => console.log(`DIR: ${dir}`));
  files.forEach(file => console.log(`FILE: ${file}`));
}

function readFile(filePath) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
  const stream = fs.createReadStream(fullPath, 'utf-8');
  stream.pipe(process.stdout);
}

function createFile(fileName) {
  const filePath = path.join(currentDir, fileName);
  fs.writeFileSync(filePath, '', 'utf-8');
}

function renameFile(oldPath, newFileName) {
  const fullOldPath = path.isAbsolute(oldPath) ? oldPath : path.join(currentDir, oldPath);
  const newPath = path.join(path.dirname(fullOldPath), newFileName);
  fs.renameSync(fullOldPath, newPath);
}

function copyFile(srcPath, destPath) {
  const fullSrcPath = path.isAbsolute(srcPath) ? srcPath : path.join(currentDir, srcPath);
  const fullDestPath = path.isAbsolute(destPath) ? destPath : path.join(currentDir, destPath);
  const readStream = fs.createReadStream(fullSrcPath);
  const writeStream = fs.createWriteStream(fullDestPath);
  readStream.pipe(writeStream);
}

function moveFile(srcPath, destPath) {
  copyFile(srcPath, destPath);
  deleteFile(srcPath);
}

function deleteFile(filePath) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
  fs.unlinkSync(fullPath);
}

function handleOsCommand(option) {
  switch (option) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
      });
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(process.arch);
      break;
    default:
      console.log('Invalid input');
  }
}

function calculateHash(filePath) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(fullPath);
  stream.on('data', (chunk) => hash.update(chunk));
  stream.on('end', () => console.log(hash.digest('hex')));
}

function compressFile(srcPath, destPath) {
  const fullSrcPath = path.isAbsolute(srcPath) ? srcPath : path.join(currentDir, srcPath);
  const fullDestPath = path.isAbsolute(destPath) ? destPath : path.join(currentDir, destPath);
  const readStream = fs.createReadStream(fullSrcPath);
  const writeStream = fs.createWriteStream(fullDestPath);
  const brotli = createBrotliCompress();
  pipeline(readStream, brotli, writeStream, (err) => {
    if (err) console.log('Operation failed');
  });
}

function decompressFile(srcPath, destPath) {
  const fullSrcPath = path.isAbsolute(srcPath) ? srcPath : path.join(currentDir, srcPath);
  const fullDestPath = path.isAbsolute(destPath) ? destPath : path.join(currentDir, destPath);
  const readStream = fs.createReadStream(fullSrcPath);
  const writeStream = fs.createWriteStream(fullDestPath);
  const brotli = createBrotliDecompress();
  pipeline(readStream, brotli, writeStream, (err) => {
    if (err) console.log('Operation failed');
  });
}
