/**
 * Created by Administrator on 2016/6/23.
 * @author 李阳
 */
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload, //实时重载
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
    //through = require('through2');

//源码路径
var srcPath = {
    html: './src/*.html',
    js: './src/js/*.js',
    jsModule:'./src/js/modules/*.js',
    less: './src/less/*.less',
    css: './src/css/*.css',
    images: './src/images/*'
}
var distPath = {
        html: './dist',
        js: './dist/js',
        jsModule:'./dist/js/modules',
        jsMin: './dist/js/min',
        css: './dist/css',
        cssMin: './dist/css/min'
    }
    //fileinclude任务
gulp.task('fileinclude', function() {
        return gulp.src(srcPath.html)
            .pipe(plugins.logger({
                before: 'fileinclude Starting...',
                after: 'fileinclude complete...'
            }))
            .pipe(plugins.fileInclude())
            .pipe(plugins.changed('dist'))
            .pipe(gulp.dest(distPath.html))
            .pipe(plugins.notify({
                message: 'fileinclude task completed'
            }))
    })

    //less任务
gulp.task('less', function() {
        return gulp.src(srcPath.less)
            .pipe(plugins.logger({
                before: 'less Starting...',
                after: 'less complete...'
            }))
            .pipe(plugins.less())
            //添加前缀׺
            .pipe(plugins.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(plugins.changed('dist'))

        //保存未压缩文件到我们指定的目录下面
        .pipe(gulp.dest(distPath.css))

        //.pipe(rev.manifest())
        //给文件添加后缀
        .pipe(plugins.rename({
                suffix: 'min'
            }))
            //压缩样式文件
            .pipe(plugins.minifyCss())
            .pipe(plugins.changed('dist'))
            .pipe(plugins.rev())
            //保存压缩文件到我们指定的目录下面
            .pipe(gulp.dest(distPath.cssMin))
            .pipe(plugins.notify({
                message: 'less task completed'
            }))
    })
//css任务
gulp.task('css', function() {
    return gulp.src(srcPath.css)
        .pipe(plugins.logger({
            before: 'css Starting...',
            after: 'css complete...'
        }))
        .pipe(plugins.concat('xdd.css'))
        .pipe(plugins.changed('dist'))

        //保存未压缩文件到我们指定的目录下面
        .pipe(gulp.dest(distPath.css))

        //.pipe(rev.manifest())
        //给文件添加后缀
        .pipe(plugins.rename({
            suffix: 'min'
        }))
        //压缩样式文件
        .pipe(plugins.minifyCss())
        .pipe(plugins.changed('dist'))
        /*.pipe(plugins.rev())*/
        //保存压缩文件到我们指定的目录下面
        .pipe(gulp.dest(distPath.cssMin))
        .pipe(plugins.notify({
            message: 'css task completed'
        }))
})
    //js任务
gulp.task('scripts', function() {
        return gulp.src(srcPath.js)
            .pipe(plugins.logger({
                before: 'scripts Starting...',
                after: 'scripts complete...'
            }))
            //压缩脚本文件
            .pipe(plugins.uglify())
            //.pipe(plugins.rev())
            .pipe(plugins.changed(distPath.js))
            //提示任务完成
            .pipe(gulp.dest(distPath.js))
            .pipe(plugins.notify({
                message: 'Scripts task completed'
            }))
    })
        //js module任务
gulp.task('jsModules', function() {
        return gulp.src(srcPath.jsModule)
            .pipe(plugins.logger({
                before: 'jsModule Starting...',
                after: 'jsModule complete...'
            }))
            //压缩脚本文件
            .pipe(plugins.uglify())
            //.pipe(plugins.rev())
            .pipe(plugins.changed(distPath.jsModule))
            //提示任务完成
            .pipe(gulp.dest(distPath.jsModule))
            .pipe(plugins.notify({
                message: 'jsModule task completed'
            }))
    })
    //images任务
gulp.task('images', function() {
        return gulp.src(srcPath.images, function() {
        })
    })
    // 静态服务器
gulp.task('server', ['css', 'scripts', 'fileinclude', 'images','jsModules'], function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch(srcPath.css).on('change', reload);
    gulp.watch(srcPath.html).on('change', reload);
    gulp.watch(srcPath.js).on('change', reload);
    gulp.watch(srcPath.images).on('change', reload);
    gulp.watch(srcPath.jsModule).on('change', reload);
});

gulp.task('watch', function() {
    //监听fileinclude任务
   gulp.watch(srcPath.html, function() {
            gulp.run('fileinclude');
        });
        //监听less任务
   /* gulp.watch(srcPath.less, function() {
            gulp.run('less');
        });*/
    //监听css任务
    gulp.watch(srcPath.css, function() {
            gulp.run('css');
        });
        //监听scriptts任务
    gulp.watch(srcPath.js,function() {
        gulp.run('scripts');
    });
    //监听module任务
    gulp.watch(srcPath.jsModule,function(){
        gulp.run('jsModules');
    })
})
gulp.task('default', ['fileinclude','css','scripts','jsModules','server', 'watch']);