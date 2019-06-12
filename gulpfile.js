var gulp = require("gulp");
var terser = require("gulp-terser");
var rename = require("gulp-rename");

gulp.task("default", function() {
    return gulp.src("./src/**/*.js")
    // Minify the file
        .pipe(terser())
    // Rename the files
        .pipe(rename({suffix: ".min"}))
    // Output
        .pipe(gulp.dest("dist"));

});
