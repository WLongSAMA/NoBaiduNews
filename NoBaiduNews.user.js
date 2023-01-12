// ==UserScript==
// @name         NoBaiduNews
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽百度主页新闻推荐流，只保留网址导航功能。
// @author       WLong
// @license      MIT
// @match        *://www.baidu.com
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @supportURL   https://github.com/WLongSAMA/NoBaiduNews
// ==/UserScript==

(function() {
    'use strict';

    //window.addEventListener('load', function(){
        var int = self.setInterval(function() {
            //debugger;
            document.getElementById("s_menu_mine").click();
            if (document.getElementById("s_content_100")) {
                document.getElementById('s_menus_wrapper').innerHTML = '<span id="s_menu_mine" class="s-menu-item current" data-id="100"><span class="s-menu-item-underline"></span></span>';
                //document.getElementById('s_content_2').remove();
                window.clearInterval(int);
            }
        },1000);
    //})
})();


