module.exports = function () {

  //var babelPreprocessor = file => require('babel').transform(file.content, {sourceMap: true});
  var babelPreprocessor = file => require('babel-core').transform(file.content, {sourceMap: true});

  return {
      
    debug:true,
      
    //files: [
    //  {pattern: 'jspm_packages/system.js', instrument: false},
    //  {pattern: 'config.js', instrument: false},
    //  {pattern: 'wwwroot/src/**/*.js', load: false}
    //],
    
    files: [
      {pattern: '/wwwroot/jspm_packages/system.js', instrument: false},
      {pattern: '/wwwroot/config.js', instrument: false},
      {pattern: '/wwwroot/src/**/*.js', load: false}
    ],
    
    tests: [
      {pattern: 'test/src/**/*Spec.js', load: false}
    ],

    preprocessors: {
      'test/*.js': babelPreprocessor,
      'src/*.js': babelPreprocessor
    },

    //middleware: (app, express) => {
    //  app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
    //},
    middleware: (app, express) => {
      //app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
      //app.use('/wwwroot/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
      //app.use('jspm_packages', express.static(require('path').join(__dirname, 'wwwroot/jspm_packages')));
      //app.use('jspm_packages', express.static(require('path').join(__dirname, '/wwwroot/jspm_packages')));
      //app.use('wwwroot/jspm_packages', express.static(require('path').join(__dirname, '/wwwroot/jspm_packages')));
      app.use('/wwwroot/jspm_packages', express.static(require('path').join(__dirname, '/wwwroot/jspm_packages')));
    },



    setup: function (wallaby) {
      wallaby.delayStart();

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i].replace(/\.js$/, '')));
      }

      Promise.all(promises).then(function () {
        wallaby.start();
      }).catch(function (e) { setTimeout(function (){ throw e; }, 0); });
    }
  };
};




