'use strict';

var gulp = require('gulp'),
watch = require('gulp-watch'),
prefixer = require('gulp-autoprefixer'),
uglify = require('gulp-uglify-es').default,
sass = require('gulp-sass'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
sourcemaps = require('gulp-sourcemaps'),
rigger = require('gulp-rigger'),
cssmin = require('gulp-minify-css'),
rimraf = require('rimraf'),
browserSync = require('browser-sync'),
browserify = require('browserify'),
babelify = require('babelify'),
reload = browserSync.reload;

var path = {

build: { 
html: 'build/',
js: 'build/js/',
css: 'build/css/',
img: 'build/img/',
fonts: 'build/fonts/',
upload: 'build/upload/'
},
src: { 
html: 'src/*.html',
js: 'src/js/main.js',
style: 'src/style/main.scss',
img: 'src/img/*',
fonts: 'src/fonts/*',
upload: 'src/upload/**/**/*'
},
watch: { 
html: 'src/**/*.html',
js: 'src/js/**/*.js',
style: 'src/style/**/*.scss',
img: 'src/img/*',
fonts: 'src/fonts/*',
upload: 'src/upload/**/**/*'
},
clean: './build'
};

gulp.task("webserver", function (done) {

    browserSync({
    server:{
        baseDir: "./build"
    },
    host: 'localhost',
    port: 3000
    });
    done();
});

gulp.task('html:build', function (done) {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html)) 
        .pipe(reload({stream: true}));
    done();
}); 

gulp.task('js:build', function () {
    var b = browserify({
      entries: path.src.js,
      debug: true,
      transform: [babelify.configure({
        presets: ['@babel/preset-env']
      })]
    });
  
    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
  });

gulp.task('style:build', function(done) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
    done();
});
gulp.task('img:build', function(done) {
    gulp.src(path.src.img)        
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
    done();
});
gulp.task('fonts:build', function(done) {
    gulp.src(path.src.fonts)        
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
    done();
});


gulp.task('upload:build', function (done) {
    gulp.src(path.src.upload) 
        .pipe(gulp.dest(path.build.upload)) 
        .pipe(reload({stream: true}));
    done();
});  

gulp.task('build', gulp.parallel('html:build',
'js:build',
'style:build','img:build','fonts:build','upload:build'));

gulp.task('watch:js', function(done) {
    gulp.watch([path.watch.js], gulp.series(['js:build']));   
    done();
});
gulp.task('watch:html', function(done) {    
    gulp.watch([path.watch.html], gulp.series(['html:build']));
    done();
});
gulp.task('watch:style', function(done) {
    gulp.watch([path.watch.style], gulp.series(['style:build']));
    done();
});
gulp.task('watch:img', function(done) {
    gulp.watch([path.watch.img], gulp.series(['img:build']));
    done();
});
gulp.task('watch:fonts', function(done) {
    gulp.watch([path.watch.fonts], gulp.series(['fonts:build']));
    done();
});
gulp.task('watch:upload', function(done) {
    gulp.watch([path.watch.upload], gulp.series(['upload:build']));
    done();
});

gulp.task('watch', gulp.parallel('watch:js', 'watch:html', 'watch:style', 'watch:img', 'watch:fonts', 'watch:upload'));


gulp.task('clean', function(callback){
    rimraf(path.clean, callback);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));