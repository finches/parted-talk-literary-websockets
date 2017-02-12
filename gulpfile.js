var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
 
gulp.task('default', ['copy-modules', 'compile-src'], function () {
    return gulp.src(['./*.ts'])
        .pipe(ts({
            noImplicitAny: false
        }))
        .pipe(gulp.dest('dist/local'));
});

gulp.task('compile-src', ['clean'], function(){
    return gulp.src('./src/*.ts')
            .pipe(ts({
                noImplicitAny: false
            }))
            .pipe(gulp.dest('dist/local/src'));
});

gulp.task('copy-modules', ['clean'], function(){
    return gulp.src('./node_modules')
                .pipe(gulp.dest('dist/local'));
});

gulp.task('clean', function(){
    return del('dist/local');
});