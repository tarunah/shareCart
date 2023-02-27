var express = require('express');
var app = express();
const path = require('path');
const doT = require('dot');

app.get('/', function(req, res) {
  doT.templateSettings = {
    evaluate: /\[\[([\s\S]+?)\]\]/g,
    interpolate: /\[\[=([\s\S]+?)\]\]/g,
    encode: /\[\[!([\s\S]+?)\]\]/g,
    use: /\[\[#([\s\S]+?)\]\]/g,
    define: /\[\[##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\]\]/g,
    conditional: /\[\[\?(\?)?\s*([\s\S]*?)\s*\]\]/g,
    iterate: /\(\(~\s*(?:\)\)|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\)\))/g,
    varname: 'model',
    strip: true,
    append: true,
    selfcontained: false
  };
  doT.process({
    path: path.join(__dirname, '../../dist/')
  });
  res.send('DOT files compiled successfully');
  process.exit(0);
});

app.listen(8983, function() {
  console.log('Server started for compiling shell at ', 8983);
});
