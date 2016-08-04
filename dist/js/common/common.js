/**
 * 后台公用模块
 */
define(["jquery", "config", "functions", 'jquery.cookie', 'bootstrap'], function($, C, D) {
	var Common = {
		init: function() {
			this.checkAuth();
			this.placeholder();
			this.headerHandle();
			this.leftHandle();
			this.middleHandle();
			this.getLoginName();
		},
		checkAuth: function() {
			var authUrl = C.AUTH_API_PATH; //验证权限接口
			var that = this;
			$.ajax({
				url: authUrl,
				type: C.DATA_METHOD,
				dataType: C.DATA_TYPE,
				//跨域请求
				xhrFields: {
					withCredentials: true
				},
				success: function(res) {
					if (res.returnCode != C.SUCCESS_CODE) {
						$("#mainModal").find('.modal-title').text('提示');
						$("#mainModal").find('.modal-body').html(res.msg);
						$('#mainModal').modal("show");
						$('#mainModal').on('hidden.bs.modal', function(e) {
							D.goto('login.html');
							$.removeCookie("sessionId");
							$.removeCookie("loginName");
						})
					} else {
						var rootMenuList = res.result.rootMenuList;
						rootMenuList = $.parseJSON(rootMenuList);
						that.getRootMenu(rootMenuList);
						var subMenuList = res.result.subMenuList;
						subMenuList =  $.parseJSON(subMenuList);
						that.getLeftMenu(subMenuList);
					}
				},
				error: function() {
					layer.alert("服务端无响应", function() {
						D.goto("login.html");
					});
				}
			})
		},
		getRootMenu: function(rootMenuList) {
				Common.renderTpl("topModuleMenu", rootMenuList);
		},
		getLoginName: function() {
			if (null != $.cookie('loginName')) {
				var loginName = $.cookie('loginName');
				$("#loginName").html(loginName);
			}
		},
		getLeftMenu: function(subMenuList) {
			var menu = [];
			$.each(subMenuList,function(index, el) {
				var menuChild = {}
				menuChild.parentCode = el.sysMenuCode;
				menuChild.menuList = el.childMenuList;
				menu.push(menuChild);
			});
			this.renderTpl("lefModuleMenu",menu);
		},
		//上部菜单切换
		headerHandle: function() {
			$(".aloha-module-menu").on("click", "a", function() {
				$('ul[id^="admincpNavTabs_"]').hide();
				$(".aloha-module-menu").find("li").removeClass("active");
				var modules = $(this).parent().addClass("active").attr("data-param");
				$("#admincpNavTabs_" + modules).show().find(".second").removeClass("active").first().addClass('active')
					.find(".mid-nav").show().find(".third").removeClass('active').first().addClass('active')
					.find('a:first').trigger('click');

			})
		},
		//左侧菜单
		leftHandle: function() {
			$(".lefModuleMenu").on("click",".second>.left-nav-tab", function() {
				if ($(this).parent().hasClass("active")) return;
				$(".second").removeClass("active");
				$(".second").find(".mid-nav").hide();
				$(this).parent().addClass('active').find(".mid-nav").show()
					.find(".third").removeClass('active').first().addClass('active')
					.find('a:first').trigger('click');

			})
		},
		//中间菜单
		middleHandle: function() {
			$(".lefModuleMenu").on("click",".third>a", function() {
				/*if($(this).parent().hasClass("active"))return;*/
				$(".third").removeClass("active");
				$(".second").removeClass("active");
				$(this).parent().closest(".mid-nav").show();
				$(this).parent().addClass("active");
				$(this).parent().closest('.second').addClass('active');
				var url = $(this).attr("url-param");
				if (url == undefined) {
					$(".J_iframe").attr("src", "ie6update.html");
				}
				$(".J_iframe").attr("src", url);

			})
		},
		placeholder: function() {
			/*
			 * 为低版本IE添加placeholder效果
			 *
			 * 使用范例：
			 * [html]
			 * <input id="captcha" name="captcha" type="text" placeholder="验证码" value="" >
			 * [javascrpt]
			 * $("#captcha").nc_placeholder();
			 *
			 * 生效后提交表单时，placeholder的内容会被提交到服务器，提交前需要把值清空
			 * 范例：
			 * $('[data-placeholder="placeholder"]').val("");
			 * $("#form").submit();
			 *
			 */
			(function($) {
				$.fn.aloha_placeholder = function() {
					var isPlaceholder = 'placeholder' in document.createElement('input');
					return this.each(function() {
						if (!isPlaceholder) {
							$el = $(this);
							$el.focus(function() {
								if ($el.attr("placeholder") === $el.val()) {
									$el.val("");
									$el.attr("data-placeholder", "");
								}
							}).blur(function() {
								if ($el.val() === "") {
									$el.val($el.attr("placeholder"));
									$el.attr("data-placeholder", "placeholder");
								}
							}).blur();
						}
					});
				};
			})(jQuery)
		},
		renderTpl: function(id, data) {
			require(['handelbars'], function(Handelbars) {
				var template = Handelbars.compile($("#" + id + "Tpl").html());
				var html = template(data);
				$("#" + id).html(html);
			})


		}
	}
	return Common;
});