// if you don't specify a html file, the sniper will generate a div
var app = require("hmm-logo");
var xhr = require("xhr");
xhr("./data/example.json", function(err,resp,body){
  var data = JSON.parse(body);
  var instance = new app({el: yourDiv,data: data, columnInfo: false, xaxis: false, yaxis: false});
  instance.render();
});
