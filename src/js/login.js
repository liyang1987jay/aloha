/**
 * @Author 李阳
 * @Date 2016/7/7
 * @fileName
 */
/*登录*/
require(["common/config"],function(C){
    /*API*/
    window.URL={
        mainUrl:C.ROOT_PATH,
        /*登录验证*/
        loginUrl:C.API_PATH+"sys/login/tologin",
        /*验证码图片*/
        checkCodeUrl:C.API_PATH+"sys/code",
        /*退出登录*/
        logoutUrl:C.API_PATH+"sys/login/logout"
    };
    window.C=C;
    require(["modules/login"]);
});

