'use strict'; // eslint-disable-line

const path = require('path');
const fs = require('fs');

const generateFile = require('./generator').generateFile;

function walk(dir, root) {
  root = root || '';

  dir = path.resolve(__dirname, dir);
  if (!root) {
    root = `${dir}/`;
  }

  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = `${dir}/${file}`;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { results = results.concat(walk(file, root)); } else { results.push(file.replace(root, '')); }
  });

  return results;
}

const files = walk('../../../docs/dist/').filter(f => /\.md$/.test(f)).map(f => f.replace(/\.md$/, ''));

const filesToPrint = ['index'].concat(files);

files.forEach(file => generateFile({
  src: path.resolve(__dirname, `../../../docs/dist/${file}.md`),
  dest: path.resolve(__dirname, `../dist/${file}.html`),
  files: filesToPrint,
  title: file
}));

generateFile({
  src: path.resolve(__dirname, '../../../README.md'),
  dest: path.resolve(__dirname, '../dist/index.html'),
  files: filesToPrint,
  title: 'Index'
});
