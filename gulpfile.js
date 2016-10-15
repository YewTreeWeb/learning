/*---------------
Required
---------------*/
var gulp        = require('gulp'),
browserSync = require('browser-sync'),
sass        = require('gulp-sass'),
prefix      = require('gulp-autoprefixer'),
cp          = require('child_process'),
jade        = require('gulp-jade'),
gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/*---------------
Jekyll
---------------*/
/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
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
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], function() {
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
  return gulp.src(['assests/scss/scss-main.scss', 'assests/sass/sass-main.sass'])
  .pipe( $.plumber() )
  .pipe( $.sourcemaps.init() )
  .pipe( sass({
    //includePaths: ['scss'],
    outputStyle: 'compressed',
    onError: browserSync.notify
  }).on('error', $.sass.logError) )
  .pipe( prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }) )
  .pipe( $.sourcemaps.write() )
  .pipe( $.rename( {suffix:'.min'} ) )
  .pipe( gulp.dest('_site/css') )
  .pipe( browserSync.reload({stream:true}) )
  .pipe( gulp.dest('css') );
});

/*---------------
Scripts
---------------*/
/**
* Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('scripts', function () {
  return gulp.src(['assets/js/**/*.js', '!assets/js/**/*.min.js'])
  .pipe( $.plumber() )
  .pipe( $.sourcemaps.init() )
  .pipe( $.babel() )
  .pipe( $.sourcemaps.write('.') )
  .pipe( $.rename( {suffix:'.min'} ) )
  .pipe( gulp.dest('_site/js') )
  .pipe( browserSync.reload({stream:true}) )
  .pipe( gulp.dest('js') );
});

/*---------------
Jade
---------------*/
gulp.task('jade', function(){
  return gulp.src( '_jade/*.jade' )
  .pipe( jade() )
  .pipe( gulp.dest('includes') );
});

/*---------------
Images
---------------*/
gulp.task('images', function() {
  return gulp.src( 'assets/images/**/*' )
    .pipe( $.cache( $.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }) ) )
    .pipe( gulp.dest('_site/images') )
    .pipe( gulp.dest('images') );
});

/*---------------
Watch
---------------*/
/**
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('_jade/*.jade', ['jade']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/*---------------
Default
---------------*/
/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);
