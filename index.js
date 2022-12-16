// ==UserScript==
// @name                净化-开发版
// @version             1.2.0
// @description         页面增强工具。目前支持CSDN、百度、简书、掘金。
// @author              g0blin
// @namespace           https://github.com/ultrazg/tm-cleanup
// @match               *://baike.baidu.com/*
// @match               *://zhidao.baidu.com/*
// @match               *://jingyan.baidu.com/*
// @match               *://*.csdn.net/*
// @match               *://blog.csdn.net/*
// @match               *://*.jianshu.com/*
// @icon                https://ossweb-img.qq.com/images/lol/img/spell/SummonerBoost.png
// @require             https://www.unpkg.com/jquery@1.12.4/dist/jquery.min.js
// @require             https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery-cookie/1.4.1/jquery.cookie.min.js
// @license             WTFPL
// @grant               unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    const VERSION = '1.2.0';
    const BAIDU_URL_REG = RegExp('baidu.com');
    const BAIDU_BAIKE_URL_REG = RegExp('baike.baidu.com');
    const BAIDU_ZHIDAO_URL_REG = RegExp('zhidao.baidu.com/question');
    const BAIDU_JINGYAN_URL_REG = RegExp('jingyan.baidu.com');
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

    /** 百度 */
    if (BAIDU_URL_REG.test(CURRENT_URL)) {
        /** 百度百科 */
        if (BAIDU_BAIKE_URL_REG.test(CURRENT_URL)) {
            const classNameArr = ['header', 'navbar-wrapper', 'polysemant-list', 'btn-list', 'right-ad', 'after-content', 'related-video-container'];
            const idArr = ['J-second-wrapper', 'tashuo_right', 'side_box_unionAd', 'side-share', 'tashuo_bottom'];

            setInterval(() => {
                loopRemoveByClassName(classNameArr);
                loopRemoveById(idArr);
            }, 500);

            const wikiCommonHeadTabBarDom = `
                <a style="color: forestgreen;user-select: none;font-weight: normal;text-decoration: none">[净化]正在优化 百度百科 的浏览体验。</a>
                <a style="color: cornflowerblue;font-weight: normal;text-decoration: none" href="https://github.com/ultrazg/tm-cleanup/issues" target="_blank">[反馈]</a>
            `;

            $('.wiki-common-headTabBar').html(wikiCommonHeadTabBarDom);
        }

        /** 百度知道 */
        // if (BAIDU_ZHIDAO_URL_REG.test(CURRENT_URL)) {
        //     const classNameArr = ['grid', 'task-list-button', 'jump-goto-star', 'aria-div', 'question-number-text-chain', 'wgt-bottom-union'];
        //     const idArr = ['j-nav-menu-container', 'qb-side'];
        //
        //     setInterval(() => {
        //         loopRemoveByClassName(classNameArr);
        //         loopRemoveById(idArr);
        //     }, 500);
        // }
    }

    /** CSDN */
    if (CSDN_URL_REG.test(CURRENT_URL)) {
        // 待移除的元素类名
        const classNameArray = ['box-shadow', 'programmer1Box', 'programmer2Box', 'programmer3Box', 'programmer4Box', 'template-box', 'template-box', 'toolbar-advert'];
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
        const toolBarBoxDom = `
        <li style="color: forestgreen;user-select: none">[净化]正在优化 CSDN 的浏览体验。</li><li><a style="color: cornflowerblue" href="https://github.com/ultrazg/tm-cleanup/issues" target="_blank">[反馈]</a></li>
        `;

        $('.toolbar-container-right').remove();
        $('.toolbar-container-middle').remove();
        $('.toolbar-container-left .toolbar-menus').html(toolBarBoxDom);
        $('.toolbar-menus li').css('margin-right', '10px');
        $('.toolbar-menus li').hover(function () {
            $(this).css('background', '#fff');
        });

        // 优化底部点赞条
        $('#toolBarBox .left-toolbox').remove();

    }

    printInfo();

})();
