/**
 * @Author 李阳
 * @Date 2016/7/7
 * @fileName
 */
require.config({
    paths:{
        'jquery':['./lib/jquery/jquery/2.2.0/jquery.min'],
        'jquery.validate':['./lib/jquery/jquery.validate/1.15/jquery.validate.min'],
        'jquery.cookie':['./lib/jquery/jquery.cookie/jquery.cookie'],
        'eharts':['./lib/echarts/echarts.min'],
        'handelbars':['./lib/handelbars/handlebars-v4.0.5'],
        'layer':['./lib/layer/2.3/layer'],
        'progressbar':['./lib/progressbar/bootstrap-progressbar.min'],
        'supersized':['./lib/supersized/supersized.3.2.7.min'],
        'config':['./common/config'],
        'functions':['./common/functions']
    },
    shim:{
        'jquery.cookie':{
            deps:['jquery'],
        },
        'supersized':{
            deps:['jquery']
        },
        'progressbar':{
            deps:['jquery']
        }
    }
})