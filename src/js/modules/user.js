define(["jquery", "config", "functions", 'bootstrap','bootstrap-table' ], function($, C, D) {
	var User = {
		userList: function() {
			$('#userTable').bootstrapTable({
				locale: 'zh-CN',
				url: URL.getUserListUrl,
                sortName: "rkey",//排序列  
                striped: true,//条纹行  
                sidePagination: "server",//服务器分页  
                //showRefresh: true,//刷新功能  
                //search: true,//搜索功能  
                clickToSelect: true,//选择行即选择checkbox  
                singleSelect: true,//仅允许单选  
                //searchOnEnterKey: true,//ENTER键搜索  
                pagination: true,//启用分页  
                escape: true,//过滤危险字符  
                queryParams: getParams,//携带参数  
                pageCount: 10,//每页行数  
                pageIndex: 0,//其实页  
                method: "get",//请求格式  
                //toolbar: "#toolBar",  
			});
		}
	}
	$(function() {
		var url = $(".J_iframe").attr("src");
		var act = D.getUrl(url, 'act');
		switch (act) {
			case "userList":
				User.activityList();
				break;
		}
	})
})