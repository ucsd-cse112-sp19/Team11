var gulp = require('gulp')
var del = require('del')
var uglify = require('gulp-uglify')


gulp.task('clean', () => del(['dist']))


gulp.task('uglify', function() {
  return gulp.src('./src/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist'))
})
