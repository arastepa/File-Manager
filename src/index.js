import fs from 'fs';
import path from 'path';
import os from 'os';
import { userInfo } from 'os';
import readline from 'readline';
import { pipeline } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import crypto from 'crypto';
import { goUp } from './nwd/up.js';
import { changeDirectory } from './nwd/changeDir.js';
import {listDirectory} from './nwd/ls.js'
import { readContnet } from './fileManipulations/cat.js';
import { createFile } from './fileManipulations/createFile.js';
import { renameFile } from './fileManipulations/renameFile.js';
import { copyFile } from './fileManipulations/copy.js';
import { deleteFile } from './fileManipulations/delete.js';
import { moveFile } from './fileManipulations/move.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : userInfo().username;

let currentDir = os.homedir();
process.chdir(currentDir);
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
        readContnet(args[0]);
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
  console.log(`You are currently in ${process.cwd()}`);
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
