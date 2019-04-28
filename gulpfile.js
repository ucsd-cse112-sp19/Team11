var gulp = require('gulp')
var uglify = require('gulp-uglify')

gulp.task('uglify', function() {
  return gulp.src('./src/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist'))
})
