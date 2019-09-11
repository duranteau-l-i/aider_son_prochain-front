require('@babel/register')();
require('ignore-styles');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');

chai.should();
chai.use(sinonChai);
chai.use(chaiEnzyme);
enzyme.configure({ adapter: new Adapter() });

// setup JSDOM
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
copyProps(window, global);

// Set 'src' as a node path (for resolving the 'src' folder)
var path = require('path');
process.env.NODE_PATH = path.join(__dirname, '..', 'src');
require('module').Module._initPaths();
