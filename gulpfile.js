// Gulp dependencies
var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
 
// Default gulp task, builds out the index file and moves it to the dist folder
gulp.task('default', ['copy-modules', 'compile-src'], function () {
    return gulp.src(['./*.ts'])
        .pipe(ts({
            noImplicitAny: false
        }))
        .pipe(gulp.dest('dist/local'));
});

// Compiles all files in the "src" folder
gulp.task('compile-src', ['clean'], function(){
    return gulp.src('./src/*.ts')
            .pipe(ts({
                noImplicitAny: false
            }))
            .pipe(gulp.dest('dist/local/src'));
});

// Copies node modules so the server can reference them correctly
gulp.task('copy-modules', ['clean'], function(){
    return gulp.src('./node_modules')
                .pipe(gulp.dest('dist/local'));
});

// Deletes the dist folder so we have a clean slate each build
gulp.task('clean', function(){
    return del('dist/local');
});