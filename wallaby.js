module.exports = function (wallaby) {
  
  return {
      
    debug:false,
    
    files: [
      {pattern: 'wwwroot/jspm_packages/system.js', instrument: false},
      {pattern: 'wwwroot/config.js', instrument: false},
      {pattern: 'wwwroot/src/**/*.js', load: false}
    ],
    
    tests: [
      {pattern: 'test/src/**/*Spec.js', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    
    //preprocessors: {
    //  'test/*.js': babelPreprocessor,
    //  'src/*.js': babelPreprocessor
    //},
    
    middleware: (app, express) => {
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
