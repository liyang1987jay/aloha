/**
 * 后台公用模块
 */
define(function() {
			var Common = {
				init: function () {
					this.checkAuth();
				},
				checkAuth: function () {
					$.ajax({
						url: authUrl,
						type: C.DATA_METHOD,
						dataType: C.DATA_TYPE,
						success: function (data) {
							if (data.code != C.SUCCESS_CODE) {
								layer.alert(data.msg, function () {
									D.goto("login.html");
								});
							} else {
								var login_name = res.result.sessionUser.sysUserLoginName;
								$.cookie("login_name", login_name);
							}
						},
						error: function () {
							layer.alert("服务端无响应", function () {
								D.goto("login.html");
							});
						}
					});
				},
				tab: function () {
					$(".left .left-nav ul li").click(function () {
						$(this).addClass("active").siblings().removeClass("active");
					});
					$(".mid .mid-nav ul li").click(function () {
						$(this).addClass("active").siblings().removeClass("active");
					});

					$(".info-hd ul li").click(function () {
						$(this).addClass("active").siblings().removeClass("active").closest($this).siblings(".info-bd").find("ul>li").eq($(this).index()).addClass("active").siblings().removeClass("active");
					});
				}
			}
				require(["jquery", "common/config", "functions", 'jquery.cookie'], function($, C, D) {
					var authUrl = C.AUTH_API_PATH;
					var myCookieId = $.cookie("session_id");
					$(function() {
						Comon.init();
					});
				})
			});