/**
 * @Author 李阳
 * @Date 2016/7/8
 * @fileName
 */
define(function() {
    var Login = {
        init: function() {
            //图片切换
            this.superSize();
            //显示隐藏验证码
            this.showOrHideCode();
            //提交
			this.loginSubmit();
            //回车提交
			this.enterSubmit();
        },
        superSize: function() {
            $.supersized({
                // 功能
                slide_interval: 4000,
                transition: 1,
                transition_speed: 1000,
                performance: 1,

                // 大小和位置
                min_width: 0,
                min_height: 0,
                vertical_center: 1,
                horizontal_center: 1,
                fit_always: 0,
                fit_portrait: 1,
                fit_landscape: 0,

                // 组件
                slide_links: 'blank',
                slides: [{
                    image: 'images/login/1.jpg'
                }, {
                    image: 'images/login/2.jpg'
                }, {
                    image: 'images/login/3.jpg'
                }, {
                    image: 'images/login/4.jpg'
                }, {
                    image: 'images/login/5.jpg'
                }]

            });
        },
        showOrHideCode: function() {
            //显示隐藏验证码
            $("#hide").click(function() {
                $(".code").fadeOut("slow");
            });
            $("#captcha").focus(function() {
                $(".code").fadeIn("fast");
            });
        },
        loginSubmit: function() {
            //动画登录
            $('.btn-submit').click(function() {
                $('.input-username,dot-left').addClass('animated fadeOutRight')
                $('.input-password-box,dot-right').addClass('animated fadeOutLeft')
                $('.btn-submit').addClass('animated fadeOutUp')
                setTimeout(function() {
                        $('.avatar').addClass('avatar-top');
                        $('.submit').hide();
                        $('.submit2').html('<div class="progress progress-striped active"> <div class="progress-bar progress-bar-success" role="progressbar" data-transitiongoal="100"></div> </div>');
                        $('.progress .progress-bar').progressbar({
                            done: function() {
								console.log("11111");
							}
                        });
                    },
                    300);

            });
        },
		enterSubmit:function () {
			// 回车提交表单
			$('#form_login').keydown(function(event){
				var self = this;
				if (event.keyCode == 13) {
					self.loginSubmit();
				}
			});

		}
    }
    require(['jquery', 'functions', 'supersized', 'progressbar'], function($, D) {
        $(function() {
            var act = null;
            if (D.get('act')) {
                act = D.get('act');
            }
            /*控制*/
            switch (act) {
                case "logout":
                    Login.logout();
                    break;
                default:
                    Login.init();
                    break;
            }
        })
    })
})
