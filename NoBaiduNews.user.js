// ==UserScript==
// @name         NoBaiduNews
// @namespace    https://github.com/WLongSAMA/NoBaiduNews
// @version      0.5.2
// @description  屏蔽百度和必应主页新闻推荐流，只保留网址导航功能。
// @author       WLong
// @license      MIT
// @match        *://www.baidu.com
// @match        *://m.baidu.com
// @match        *://cn.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @supportURL   https://github.com/WLongSAMA/NoBaiduNews
// @downloadURL https://update.greasyfork.org/scripts/458079/NoBaiduNews.user.js
// @updateURL https://update.greasyfork.org/scripts/458079/NoBaiduNews.meta.js
// ==/UserScript==

(function () {
    'use strict';

    var n = 0;
    var int = self.setInterval(function () {
        //debugger;
        if (document.title == "百度一下") { //百度移动端
            var newslist = document.getElementsByClassName("blank-frame");
            if (newslist[0] != null) {
                newslist[0].parentNode.removeChild(newslist[0]); //移除新闻流
                if (document.getElementById("foot").firstChild.nodeName == "DIV") {
                    document.getElementById("foot").firstChild.remove(); //移除提交反馈
                }
            }
            document.getElementById("ns-square-point").style.display = "none"; //隐藏右上角小红点
            document.getElementById("ts-image-uploader-icon").style.display = "none"; //隐藏不可用的图片搜索按钮
            //document.getElementsByClassName("voice call")[0].style.borderRight = "none"; //隐藏录音图标后面的分隔线
            document.getElementsByClassName("square-banner-bgicon")[0].style.display = "none"; //隐藏顶部热播爆款好剧

            document.getElementById("navs").remove(); //移除列表分隔行
            document.getElementById("logo").style.paddingTop = "150px"; //优化LOGO和搜索框的显示位置

            window.addEventListener("resize", function () {
                document.getElementById("header").style.height = document.documentElement.clientHeight - document.getElementById("bottom").clientHeight - 10 + "px"; //修复卡片高度
            }, false);
            window.dispatchEvent(new Event('resize'));
            window.clearInterval(int);
        } else if (document.title == "百度一下，你就知道") { //百度桌面端
            if (n >= 100) window.clearInterval(int);
            if (document.getElementById("s_content_2")) {
                document.getElementById("s_content_2").remove();
            }
            document.getElementById("s_menu_mine").click();
            if (document.getElementById("s_content_100")) {
                document.getElementById('s_menus_wrapper').innerHTML = '<span id="s_menu_mine" class="s-menu-item current" data-id="100"><span class="s-menu-item-underline"></span></span>';
                window.clearInterval(int);
            }
            n++;
        } else if (document.title == "搜索 - Microsoft 必应" || document.title == "Search - Microsoft Bing") { //必应
            if (n >= 100) window.clearInterval(int);

            document.getElementsByClassName("vs")[0].style.display = "none"; //隐藏新闻流
            document.getElementsByClassName("caro_div")[0].style.display = "none"; //隐藏布局按钮
            document.getElementsByClassName("scroll_cont show_partial")[0].style.top = "calc(100% - 3.25rem)"; //调整悬浮窗位置
            document.getElementById("sb_feedback").style.display = "none"; //隐藏反馈按钮

            var place = document.getElementsByClassName("sb_form_placeholder_query");
            if (place.length > 0) {
                place[0].style.display = "none"; //隐藏搜索框热词
                window.clearInterval(int);
            }
        } else {
            window.clearInterval(int);
        }
    }, 500);
})();
