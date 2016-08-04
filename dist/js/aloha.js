/**
 * @Author 李阳
 * @Date 2016/7/7
 * @fileName
 */
require.config({
    paths: {
        'jquery': ['./lib/jquery/jquery/2.2.0/jquery.min'],
        'jquery.validate': ['./lib/jquery/jquery.validate/1.15/jquery.validate.min'],
        'jquery.cookie': ['./lib/jquery/jquery.cookie/jquery.cookie'],
        'eharts': ['./lib/echarts/echarts.min'],
        'handelbars': ['./lib/handelbars/handlebars-v4.0.5'],
        'layer': ['./lib/layer/2.3/layer'],
        'bootstrap': ['./lib/bootstrap/bootstrap.min'],
        'progressbar': ['./lib/progressbar/bootstrap-progressbar.min'],
        'supersized': ['./lib/supersized/supersized.3.2.7.min'],
        'boostrap-table':['./lib/bootstrap-table/bootstrap-table.min'],
        'boostrap-table-local':['./lib/bootstrap-table/locale/bootstrap-table-zh-CN.min'],
        'config': ['./common/config'],
        'functions': ['./common/functions'],
        "common": ['./common/common']
    },
    /**
         * 设置css.js文件路径
         */
        map  : {
            '*': {
                'css' : './lib/css'
            }
        },
    //shim专门用来配置不兼容的模块。每个模块要定义。例如此例中handlebars，不是符合AMD规范  
    //----属性1：exports值（输出的变量名），表明这个模块外部调用时的名称；  
    //----属性2：deps数组，表明该模块的依赖性。  
    shim: {
        'jquery.cookie': {
            deps: ['jquery'],
        },
        'supersized': {
            deps: ['jquery']
        },
        'progressbar': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'handelbars': {
              exports: 'Handlebars' 
        },
        'bootstrap-table':{
            deps:[
                'css!../lib/bootstrap-table/css/css/bootstrap-table.min.css',
                'boostrap-table-local',
                'boostrap-table',
                'jquery'
            ]
        }
    }
})