#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const SSI = require('node-ssi');
const { program } = require('commander');

program.version('1.0.0')
  .description('shtml to html.')
  .option('-s, --source <path>', 'source folder', 'src')
  .option('-d, --destination <path>', 'destination folder', 'dist')
  .option('-e, --extension <ext>', 'file extension', '.shtml')
program.parse();

const options = program.opts();

const src = path.join(process.cwd(), options.source);
const dest = path.join(process.cwd(), options.destination);
const ext = options.extension.startsWith('.') ? options.extension : '.'+options.extension;

const ssi = new SSI({
  baseDir: src,
  encoding: 'utf-8',
  payload: {},
});

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true });
}
fs.cpSync(src, dest, { recursive: true, filter: f => !f.endsWith(ext) && !f.endsWith('.shtml') });

handle(src, dest);

async function handle(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(src);
    for (const file of files) {
      if (file === '.' || file === '..') {
        continue;
      }
      await handle(path.join(src, file), path.join(dest, file));
    }
  }
  if (!src.endsWith(ext)) {
    return;
  }
  await new Promise((resolve, reject) => {
    ssi.compileFile(src, (err, content) => {
      if (err) {
        return reject(err);
      }
      fs.writeFileSync(dest, content);
      resolve();
    });
  });
}
