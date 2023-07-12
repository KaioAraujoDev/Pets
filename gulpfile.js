const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const typescript = require('gulp-typescript');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const svgmin = require ('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');

const watch = require('gulp-watch');


gulp.task('optimize-png', (done) =>
  gulp.src('./src/public/imgs/**/*.png')
    .pipe(imagemin([
        imageminPngquant({ quality: [0.5, 0.6] })
    ]))
    .pipe(gulp.dest('./dist/public/imgs'))
    .on('end', done)
);

gulp.task('optimize-svg',(done)=>{
    gulp.src('./src/public/imgs/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/public/imgs'))
    .on('end', done)
})

gulp.task('optimize-image', gulp.series('optimize-png', 'optimize-svg'));




function startServer(){
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    }) 
}

function minifyHTML(src, dest){
    return gulp.src(src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dest))
}

function compileSass(src, dest){
    return gulp
        .src(src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

function compileTypescript(src, dest){
   const tsProject = typescript.createProject('tsconfig.json');
    return gulp
        .src(src)
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

gulp.task('watch-scss',(done)=>{
    gulp.watch('./src/scss/**/*.scss')
        .on('change', (path)=>{
            const pathModified = path;
            const destinationPath = path.replace('src','dist').replace(/scss/g,'css').replace(/\/[^/]*$/, '');
            
            
            compileSass(pathModified,destinationPath);
            done();
        })
  
})

gulp.task('watch-ts',(done)=>{
    gulp.watch('./src/ts/**/*.ts')
        .on('change',(path)=>{
            const pathModified = path;
            const destinationPath = path.replace('src','dist').replace(/\bts\b(?!.*pets)/g, 'js').replace(/\/[^/]*$/, '');
    
            compileTypescript(pathModified,destinationPath);
            done();

        })
})

gulp.task('watch-html',(done)=>{
    return watch('./src/**/*.html', (event)=>{
        const pathModified = event.path;
        const destinationPath = event.path.replace('src','dist').replace(/\/[^/]*$/, '');

        minifyHTML(pathModified,destinationPath);
        browserSync.reload();
        done();
        
    })
})   
  
gulp.task('start-server', startServer)
gulp.task('default', gulp.parallel('start-server', 'watch-scss','watch-ts','watch-html'))



