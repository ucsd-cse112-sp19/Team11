var gulp = require("gulp");
var del = require("del");
var uglify = require("gulp-uglify-es").default;
var runSequence = require("gulp4-run-sequence");
var gulpDocumentation = require("gulp-documentation");
var rename = require("gulp-rename");

gulp.task("clean", function(done) {
    del(["dist"]);
    del(["docs"]);
    done();
});

gulp.task("default", function(done) {
    runSequence("clean", "documentation", "uglify");
    done();
});

gulp.task("documentation", function() {
    return gulp.src("./src/**/*.js")
        .pipe(gulpDocumentation("html"))
        .pipe(gulp.dest("docs"));
});

gulp.task("uglify", function() {
    return gulp.src("./src/**/*.js")
    // Minify the file
        .pipe(uglify())
    // Rename the files
        .pipe(rename({suffix: ".min"}))
    // Output
        .pipe(gulp.dest("dist"));

});

function done() {
    console.log("Gulp build process complete");
}
