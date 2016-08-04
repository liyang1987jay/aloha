/**
 * 公用配置文件
 */
define(function() {

    var C = {
        /*api地址*/
        API_PATH: "http://192.168.1.116:8000/xiaodongdong/api/",
        /*项目根路径*/
        ROOT_PATH: "http://192.168.1.116:90/web/",
        IMG_PATH: "http://192.168.1.116:8000/xiaodongdong/",
       /*ajax请求类型*/
        DATA_TYPE: "JSON",
        /*ajax方法类型*/
        DATA_METHOD: "post",
        /*成功code值*/
        SUCCESS_CODE:"10000"
    };
    /*后台总权限控制api*/
    C.AUTH_API_PATH = C.API_PATH + "sys/login/checkAuth";
    /*退出登录*/
    C.LOGOUT_PATH = C.API_PATH + "sys/login/logout";

    window.C = C;
    return C;
});

