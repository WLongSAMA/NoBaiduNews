// ==UserScript==
// @name         NoBaiduNews
// @namespace    https://github.com/WLongSAMA/NoBaiduNews
// @version      0.3
// @description  屏蔽百度主页新闻推荐流，只保留网址导航功能。
// @author       WLong
// @license      MIT
// @match        *://www.baidu.com
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @supportURL   https://github.com/WLongSAMA/NoBaiduNews
// ==/UserScript==

(function () {
    'use strict';

    //window.addEventListener('load', function(){
    var int = self.setInterval(function () {
        //debugger;
        if (document.title == "百度一下") { //移动端
            var newslist = document.getElementsByClassName("blank-frame");
            if (newslist[0] != null) {
                newslist[0].parentNode.removeChild(newslist[0]); //移除新闻流
                if (document.getElementById("foot").firstChild.nodeName == "DIV") {
                    document.getElementById("foot").firstChild.remove(); //移除提交反馈
                }
            }
            document.getElementById("ns-square-point").style.display = "none"; //隐藏右上角小红点
            document.getElementById("ts-image-uploader-icon").style.display = "none"; //隐藏不可用的图片搜索按钮

            document.getElementById("navs").remove(); //移除列表分隔行
            //暂时不支持响应式改变高度
            document.getElementById("header").style.height = document.documentElement.clientHeight - document.getElementById("bottom").clientHeight - 10 + "px"; //修复卡片高度
            window.clearInterval(int);

        } else { //桌面端
            if (document.getElementById("s_content_2")) {
                document.getElementById("s_content_2").remove();
            }
            document.getElementById("s_menu_mine").click();
            if (document.getElementById("s_content_100")) {
                document.getElementById('s_menus_wrapper').innerHTML = '<span id="s_menu_mine" class="s-menu-item current" data-id="100"><span class="s-menu-item-underline"></span></span>';
                window.clearInterval(int);
            }
        }
    }, 100);
    //})
})();
