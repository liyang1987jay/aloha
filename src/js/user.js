/**
 * @Author 李阳
 * @Date 2016/7/25
 * @fileName
 */
/*用户界面*/
/*API*/
require(["common/config"],function(C){
	window.URL = {
		/*获取用户信息列表*/
		getUserListUrl: C.API_PATH + "api/sys/user/getAll",
	};
	window.C = C;
	require(["modules/user"]);
});