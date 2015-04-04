'use strict';

var   ss      = require( '../../../lib/socketstream');

module.exports = defineAbcClientAndLoad;

function defineAbcClient(conf) {
  var r = {
    css: './abc/style.css',
    code: './abc/index.js',
    view: './abc/abc.html',
    tmpl: './templates/abc/1.html'
  };
  for(var k in conf) r[k] = conf[k];
  return ss.client.define('abc',r);
}

function defineAbcClientAndLoad(conf,run,load) {
  var client = defineAbcClient(conf);
  if (run) {
    run();
  }
  if (load !== false) {
    ss.api.bundler.load();
    ss.api.client.templateEngines = ss.client.templateEngine.load();
    ss.api.client.formatters = ss.client.formatters.load();
    ss.api.client.send('code', 'init', ss.client.options.defaultEntryInit);
  }

  return client;
}
