'use strict';

// Load plugins
var gulp = require('gulp'),
    livereload = require('gulp-livereload');

 // Setup connect server
gulp.task('connect', function() {
  var connect = require('connect');
  var app = connect()
      .use(require('connect-livereload')({ port: 35729 }))
      .use(connect.static('.'))
      .use(connect.directory('.'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function() {
      console.log('Started connect web server on http://localhost:9000');
    });
});

// Serve
gulp.task('serve', ['connect'], function() {
  require('opn')('http://localhost:9000');
});

// Watch
gulp.task('watch', ['connect', 'serve'], function() {

  // Create LiveReload server
  var server = livereload();

  // Watch any files in assets folder reload on change
  gulp.watch(['./assets/**', './*.html']).on('change', function(file) {
    server.changed(file.path);
  });

});
