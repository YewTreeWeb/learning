/*---------------
Required
---------------*/
var gulp    = require('gulp'),
browserSync = require('browser-sync'),
sass        = require('gulp-sass'),
prefix      = require('gulp-autoprefixer'),
cp          = require('child_process'),
jade        = require('gulp-jade'),
uglify      = require('gulp-uglify'),
rename      = require('gulp-rename'),
plumber     = require('gulp-plumber'),
imagemin    = require('gulp-imagemin'),
concat      = require('gulp-concat'),
sourcemaps  = require('gulp-sourcemaps'),
babel       = require('gulp-babel'),
del         = require('del');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/*---------------
Error notification
---------------*/
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

/*---------------
Jekyll
---------------*/
/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( 'jekyll' , ['build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/*---------------
BrowserSync
---------------*/
/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('browser-sync', ['sass', 'scripts', 'jade', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false
  });
});

/*---------------
Styles
---------------*/
/**
* Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('sass', function () {
  return gulp.src(['assets/sass/sass-main.sass', 'assets/scss/scss-main.scss'])
  .pipe( plumber() )
  .pipe( sourcemaps.init() )
  .pipe( sass({
    //includePaths: ['scss'],
    outputStyle: 'compressed',
    onError: browserSync.notify
  }).on('error', handleErrors) )
  .pipe( prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }) )
  .pipe( sourcemaps.write('maps') )
  .pipe( rename( {suffix:'.min'} ) )
  .pipe( gulp.dest('_site/css') )
  .pipe( browserSync.reload({stream:true}) )
  .pipe( gulp.dest('assets/css') );
});

/*---------------
Scripts
---------------*/
/**
* Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('scripts', function() {
  return gulp.src(['assets/js/**/*.js', '!assets/js/**/*.min.js'])
  .pipe( plumber() )
  .pipe( sourcemaps.init() )
  .pipe( babel().on('error', handleErrors) )
  .pipe( uglify().on('error', handleErrors) )
  .pipe( sourcemaps.write('maps') )
  .pipe( rename( {suffix:'.min'} ) )
  .pipe( gulp.dest('_site/js') )
  .pipe( browserSync.reload({stream:true}) )
  .pipe( gulp.dest('assets/js') );
});

/*---------------
Jade
---------------*/
gulp.task('jade', function(){
  return gulp.src( '_jade/*.jade' )
  .pipe( jade() )
  .pipe( gulp.dest('_includes') )
  .pipe( browserSync.reload({stream:true}) );
});

/*---------------
Images
---------------*/
gulp.task('images', function() {
  return gulp.src( 'assets/images/**/*' )
    .pipe( cache( imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }) ) )
    .pipe( gulp.dest('_site/images') )
    .pipe( browserSync.reload({stream:true}) )
    .pipe( gulp.dest('assets/images') );
});

/*---------------
Watch
---------------*/
/**
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
  gulp.watch(['assets/scss/**/*.scss', 'assets/sass/**/*.sass'], ['sass']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('_jade/*.jade', ['jade']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/**/*', 'subjects/**/*.html', 'assets/**/*'], ['jekyll-rebuild']);
});

/*---------------
Default
---------------*/
/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);
