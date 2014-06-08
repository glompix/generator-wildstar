(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var options = {
    name: 'My Lame Addon'
  };

  module.exports = yeoman.generators.Base.extend({
    questions: function () {
      var done = this.async();
      this.prompt({
        "type" : "input",
        "name" : "name",
        "message" : "Your project name",
        "default" : this.appname // Default to current folder name
      }, function (answers) {
        options.name = answers.name;
        done();
      });
    },
    debug: function () {
      this.log('DEBUG: sourceRoot = "' + this.sourceRoot() + '"');
      this.log('DEBUG: destinationRoot = "' + this.destinationRoot() + '"');
      this.log('DEBUG: options = "' + JSON.stringify(options) + '"');
    },
    init: function () {
      this.src.registerWriteFilter('name filter', nameFilter);
      this.src.copy('DemoPkg.lua', 'DemoPkg.lua');
      this.src.copy('PackageDemo.lua', options.addonName + '.lua');
      this.src.copy('PackageDemo.xml', options.addonname + '.xml');
      this.src.copy('toc.xml', 'toc.xml');
    }
  });

  function nameFilter(file) {
    var regex = /\{\{ADDON_NAME\}\}/g;
    file.contents = file.contents.replace(regex, options.addonName);
  }

})();