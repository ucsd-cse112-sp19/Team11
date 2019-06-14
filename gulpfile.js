var gulp = require("gulp");
var terser = require("gulp-terser");
var rename = require("gulp-rename");

gulp.task("default", function() {
    return gulp.src("./src/**/*.js")
    // Minify the file
        .pipe(terser())
    // Output
        .pipe(gulp.dest("dist"));

});
