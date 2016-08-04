/**
 * [login.js]
 * @auth        liyang
 * @anotherdate 2016-07-25
 */
define(function() {
    var Login = {
        init: function() {
            //图片切换
            this.superSize();
            //显示隐藏验证码
            this.showOrHideCode();
            //提交校验
            this.checkSubmit();
            //回车提交
            this.enterSubmit();
            //更换验证码
            this.checkCode();
            //退出登录
            //this.logout();
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
            $('#hide').click(function() {
                $('.code').fadeOut('slow');
            });
            $('#captcha').focus(function() {
                $('.code').fadeIn('fast');
            });
        },
        checkCode: function() {
            $(".code-img").find("img").attr("src", URL.checkCodeUrl + "?t=" + D.time());
            $(".change").click(function() {
                $(".code-img").find("img").attr("src", URL.checkCodeUrl + "?t=" + D.time());
            });
        },
        checkSubmit: function() {
            var self = this;
            $(".btn-submit").click(function() {

                var user_name = $('#user_name').val();
                var password = $('#password').val();
                var captcha = $('#captcha').val();
                if (user_name == "") {
                    $(".error").fadeIn("slow").html("请输入账号");
                    return true;
                }
                if (password == "") {
                    $(".error").fadeIn("slow").html("请输入密码");
                    return true;
                }
                if (captcha == "") {
                    $(".error").fadeIn("slow").html("请输入验证码");
                    return true;
                }
                var data = D.json_encode({
                    "sys_user_login_name": user_name,
                    "sys_user_login_pass": password,
                    "code": captcha
                });
                D.ajax(URL.loginUrl, data, function(res) {
                    if (C.SUCCESS_CODE == res.returnCode) {
                        $.cookie("sessionId", res.result.sessionId);
                        var sessionUser =$.parseJSON(res.result.sessionUser);
                        var login_name = sessionUser.sysUserLoginName;
                        $.cookie("loginName",login_name );
                        self.loginSubmit();
                    } else {
                        $(".error").fadeIn("slow").html(res.msg);
                        $(".change").trigger("click");
                    }
                })

            })


        },
        loginSubmit: function() {
            //动画登录
            $('.input-username,dot-left').addClass('animated fadeOutRight');
            $('.input-password-box,dot-right').addClass('animated fadeOutLeft');
            $('.btn-submit').addClass('animated fadeOutUp');
            setTimeout(function() {
                    $('.avatar').addClass('avatar-top');
                    $('.submit').hide();
                    $('.submit2').html('<div class="progress progress-striped active"> <div class="progress-bar progress-bar-success" role="progressbar" data-transitiongoal="100"></div> </div>');
                    $('.progress .progress-bar').progressbar({
                        done: function() {
                            $(".error").fadeOut("slow").html("");
                            D.goto("main.html");
                        }
                    });
                },
                300);
        },
        enterSubmit: function() {
            // 回车提交表单
            $(document).keyup(function(event) {
                if (event.keyCode == 13) {
                     $(".btn-submit").trigger("click");
                }
            });
        },
        logout: function() {
            D.ajax(URL.logoutUrl, null, function(res) {
                console.log(res);
                if (C.SUCCESS_CODE == res.returnCode) {
                    $.removeCookie("sessionId");
                    $.removeCookie("loginName");
                    Login.init();
                }
            })


        }
    }
    require(['jquery', 'functions', 'supersized', 'jquery.cookie', 'progressbar'], function($, D) {
        $(function() {
            var url = window.document.location.href.toString();
            var u = url.split("#");
            var act =  u[1];
            /*控制*/
            switch (act) {
                case 'logout':
                    Login.logout();
                    break;
                default:
                    Login.init();
                    break;
            }
        })
    })
})