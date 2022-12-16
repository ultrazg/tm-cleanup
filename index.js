// ==UserScript==
// @name                净化
// @version             1.1.1
// @description         百度、CSDN页面增强工具
// @author              g0blin
// @match               *://baike.baidu.com/item/*
// @match               *://zhidao.baidu.com/*
// @match               *://jingyan.baidu.com/article/*
// @match               *://*.csdn.net/*
// @match               *://blog.csdn.net/*
// @icon                https://ossweb-img.qq.com/images/lol/img/spell/SummonerBoost.png
// @require             https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery-cookie/1.4.1/jquery.cookie.min.js
// @license             WTFPL
// ==/UserScript==

(function () {
    'use strict';

    const VERSION = '1.1.1';
    const BAIDU_URL_REG = RegExp('baidu.com');
    const CSDN_URL_REG = RegExp('csdn.net');
    const CURRENT_URL = window.location.href;

    /**
     * 循环删除
     * @param classNameArray 待删除的元素类名的数组
     */
    function loopRemoveByClassName(classNameArray) {
        for (const classNameArrayElement of classNameArray) {
            $('.' + classNameArrayElement).remove();
        }
    }

    function loopRemoveById(idArray) {
        for (const idArrayElement of idArray) {
            $('#' + idArrayElement).remove();
        }
    }

    /**
     * 控制台打印脚本信息
     */
    function printInfo() {
        console.log(`%c[净化]已开启 当前版本：${VERSION} by g0blin`, "color:darkorange;background:#57606f;padding:5px;border-radius:8px;font-family:SimSun;font-size:8px");
    }

    if (BAIDU_URL_REG.test(CURRENT_URL)) {
        // 待移除的元素类名
        const classNameArray = ['secondsknow-large-container', 'lemmaWgt-promotion-vbaike', 'lemmaWgt-promotion-slide', 'topA', 'appdownload', 'share-list', 'tashuo-right', 'tashuo-bottom', 'poster-middle', 'feeds-video-box', 'feeds-video-one-view', 'wgt-cms-banner', 'fresh-share-exp-e', 'J-secondsknow-large-container', 'unionAd', 'after-content', 'right-ad', 'task-panel', 'task-list-button', 'main-menu'];

        loopRemoveByClassName(classNameArray);
    }

    if (CSDN_URL_REG.test(CURRENT_URL)) {
        // 待移除的元素类名
        const classNameArray = ['box-shadow', 'programmer1Box', 'programmer2Box', 'programmer3Box', 'programmer4Box', 'template-box', 'template-box'];
        // 待移除的元素 id
        const idArray = ['recommendAdBox', 'asideNewNps', 'recommendNps'];

        loopRemoveByClassName(classNameArray);
        loopRemoveById(idArray);

        $("iframe").remove();

        // 禁止弹出登录窗口
        setInterval(() => {
            $('.passport-login-container').remove();
        }, 500);

        $.cookie('unlogin_scroll_step', 0, {
            domain: '.csdn.net',
            path: '/'
        });

        // 解除代码窗禁用选择
        $("code").css("user-select", "auto");
        $("#content_views").css("user-select", "auto");
        $("pre").css("user-select", "auto");

        // 免登录复制
        $(".hljs-button").removeClass("signin");
        $(".hljs-button").addClass("{2}");
        $(".hljs-button").attr("data-title", "[净化]已解除复制限制-点击复制");
        $(".hljs-button").attr("onclick", "hljs.copyCode(event)");
        $("code").attr("onclick", "mdcp.copyCode(event)");

        // 默认隐藏文章作者的更多信息
        $('.data-info,.aside-box-footer,.profile-intro-name-boxOpration,.item-rank').wrapAll('<div id="data-info-box" style="display: none"></div>');
        $('#asideProfile').append('<div id="data-info-mask" style="height: 40px;text-align: center;line-height: 47px;cursor: pointer;color:tomato" onclick="showInfo()">点击此处查看作者信息</div>');

        // 显示作者信息
        $('#data-info-mask').click(function () {
            $('#data-info-box').css('display', 'block');
            $('#data-info-mask').css('display', 'none');
        });

        // 解除关注博主后阅读全文
        if ($('.hide-article-box').length > 0) {
            $('.hide-article-box').remove();
            $('article #article_content').css('height', '');
        }

        // 代码自动展开
        $('.hide-preCode-bt').click();

        // 未登录移除顶部多余内容
        $('.toolbar-container-right').remove();
        $('.toolbar-container-middle').remove();
        $('.toolbar-container-left .toolbar-menus').html('<li style="color: forestgreen;user-select: none">[净化]正在优化 CSDN 的浏览体验。</li><li><a style="color: cornflowerblue" href="https://github.com/ultrazg/tm-cleanup/issues" target="_blank">[反馈]</a></li>');
        $('.toolbar-menus li').css('margin-right', '10px');
        $('.toolbar-menus li').hover(function () {
            $(this).css('background', '#fff');
        });

        // 优化底部点赞条
        $('#toolBarBox .left-toolbox').remove();

    }

    printInfo();

})();