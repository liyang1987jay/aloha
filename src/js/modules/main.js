/**
 * [login.js]
 * @auth        liyang
 * @anotherdate 2016-07-25
 */
define(['common'], function(Common) {
    var Main = {
        init: function() {
           Common.init();
        },
        checkAuth:function(){
            $(document).click(function(){
                Common.checkAuth();
            })
        }
    }
    $(function() {
        Main.init();
    })
})