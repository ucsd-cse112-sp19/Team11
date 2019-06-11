var gulp = require("gulp");
var del = require("del");
var uglify = require("gulp-uglify-es").default;
var terser = require("gulp-terser");
var runSequence = require("gulp4-run-sequence");
var rename = require("gulp-rename");

gulp.task("clean", function(done) {
    del(["dist"]);
    return done();
});

gulp.task("default", function(done) {
    runSequence("clean", "terser");
    return done();
});

gulp.task("terser", function() {
    return gulp.src("./src/**/*.js")
    // Minify the file
        .pipe(terser())
    // Rename the files
        .pipe(rename({suffix: ".min"}))
    // Output
        .pipe(gulp.dest("dist"));

});

function done() {
    console.log("Gulp build process complete");
}
