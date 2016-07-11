/**
 * 公用配置文件
 */
define(function() {

    var C = {
        /*api地址*/
        API_PATH: "http://192.168.1.103:8080/platform/api/",
        /*项目根路径*/
        ROOT_PATH: "http://192.168.1.103:90/web/",
        IMG_PATH: "http://192.168.1.103:8080/platform/",
        /*ajax请求类型*/
        DATA_TYPE: "json",
        /*ajax方法类型*/
        DATA_METHOD: "post",
    };
    /*后台总权限控制api*/
    C.AUTH_API_PATH = C.API_PATH + "sys/login/checkAuth";

    window.C = C;
    return C;
});
