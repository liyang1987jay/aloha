/*首页入口文件*/ 
/*初始化*/ 
require(["common/config"],function(C){
	/*API*/
	window.URL={
		mainUrl:C.ROOT_PATH
	};
	window.C=C;
	require(["modules/welcome"]);
});

