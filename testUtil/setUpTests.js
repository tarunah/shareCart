let Enzyme = require('enzyme');
let EnzymeAdapter = require('enzyme-adapter-react-16');
let crypto = require('crypto');

Enzyme.configure({ adapter: new EnzymeAdapter() });

window.crypto = {
  getRandomValues: function(buffer) {
    return crypto.randomFillSync(buffer);
  }
};
