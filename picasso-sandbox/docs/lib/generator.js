'use strict'; // eslint-disable-line
/* eslint no-script-url: 0 */

const fs = require('fs');
const path = require('path');

const Handlebars = require('handlebars');
const marked = require('marked');

const mkdRend = new marked.Renderer();

mkdRend.link = function link(href, title, text) {
  let targetBlank = true;

  if (this.options.sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href))
      .replace(/[^\w:]/g, '')
      .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return '';
    }
  }

  if (href.substring(0, 4) !== 'http' && href.substring(href.length - 3) === '.md') {
    href = href.replace(/\.md$/gi, '.html');
    targetBlank = false;
  }

  let out = `<a href="${href}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  if (targetBlank) {
    out += ' target="_blank"';
  }
  out += `>${text}</a>`;

  return out;
};

marked.setOptions({
  renderer: mkdRend,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

function readFile(file) {
  return fs.readFileSync(file, 'utf-8');
}

function writeFile(file, contents) {
  fs.writeFileSync(file, contents, 'utf-8');
}

/**
 * Builds directories recursively from file path
 *
 * @param  {String} pathToBuild Directory to build including file path (will be popped)
 * @return {Undefined}          Returns nothing
 */
function recursiveDirectoryBuilder(pathToBuild) {
  const paths = pathToBuild.replace(/\\/g, '/').split('/');
  paths.pop();
  const dir = [];
  let compiledDir = '';

  while (paths.length) {
    dir.push(paths.shift());
    compiledDir = dir.join('/');

    if (compiledDir && !fs.existsSync(compiledDir)) {
      fs.mkdirSync(compiledDir);
    }
  }
}

function toTitleCase(input) {
  if (input && input.length > 2) {
    return input.split(' ')
     .map(i => i[0].toUpperCase() + i.substr(1).toLowerCase())
     .join(' ');
  }
  return input;
}

const template = Handlebars.compile(readFile(path.resolve(__dirname, '../template.html')));

function kebabToCamelCase(value) {
  value = value.split('/').join(' / ');
  return value[0].toUpperCase() + value.substr(1).replace(/-([a-z])/g, g => ` ${g[1].toUpperCase()}`);
}

/**
 * This rootPath generator function is to get the right amount of ../../ for subfolder files in the destination
 * So that linking to style.css etc works OK, using rootPathGenerator('../mysub/file.html', '../') = '../../'
 *
 * @param  {String} destination Destination file which to produce ../../'s for
 * @param  {String} rootFolder  The actual root folder
 * @return {String}             Returns a string with correct amount of ../../'s to the rootPath for appending files to
 */
function rootPathGenerator(destination, rootFolder) {
  return Array(destination.replace(path.resolve(__dirname, rootFolder), '').replace(/\\/g, '/').split('/').length - 2).fill('../').join('');
}

/**
 * Generate file from options
 *
 * @param  {Object} opts Options such as dest, src and title
 * @return {Undefined}   Returns nothing
 */
function generateFile(opts) {
  const rootPath = rootPathGenerator(opts.dest, '../');

  const distPath = `${rootPath}dist/`;
  const markdown = readFile(opts.src);
  const content = marked(markdown);

  const sidebarItems = opts.files.map(filename => (
`<li>
  <a href="${distPath}${filename}.html">${kebabToCamelCase(filename)}</a>
</li>
`
  ));

  const html = template({
    content,
    sidebar: `<ul>${sidebarItems.join('')}</ul>`,
    title: toTitleCase(opts.title),
    rootPath
  });

  recursiveDirectoryBuilder(opts.dest);

  writeFile(opts.dest, html);
}


module.exports = {
  generateFile
};
