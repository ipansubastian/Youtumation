/* eslint-disable no-eval */
const fs = require('fs');
const { resolve } = require('path');

let msg1 = '';
let msg2 = '';

let json1 = Object.assign(eval(fs.readFileSync('src/manifest.js').toString()), { first: true });
let json2;
const distDir = 'build';
// console.log(json1)
setInterval(() => {
  try {
    json2 = eval(fs.readFileSync('src/manifest.js').toString());
    if (JSON.stringify(json1) !== JSON.stringify(json2) || json2 === undefined) {
      json1 = json2;
      fs.writeFileSync(resolve(distDir, 'manifest.json'), JSON.stringify(json2));
    }
    msg1 = msg2;
    msg2 = 'Manifest Compiled!';
  } catch (e) {
    msg1 = msg2;
    msg2 = e;
  }
  if (msg1.toString() !== msg2.toString()) {
    console.log('-------------------------');
    console.log(msg2);
    console.log('-------------------------\n');
  }
}, 100);
