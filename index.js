// ==UserScript==
// @name                净化
// @version             1.0.2
// @description         用于剔除页面上的广告（百度百科，csdn等），删除 csdn 登录提示，自动展开等。
// @author              g0blin
// @match               *://baike.baidu.com/item/*
// @match               *://zhidao.baidu.com/*
// @match               *://jingyan.baidu.com/article/*
// @icon                https://ossweb-img.qq.com/images/lol/img/spell/SummonerBoost.png
// @grant               none
// @license             WTFPL
// ==/UserScript==

(function () {
    'use strict';

    const _VERSION_ = '1.0.2'

    /**
     * 老方法，获取待删除节点的父节点，然后用父节点删除目标节点 已废除
     * @param {待删除元素的class名称}
     */
    function removeElementByHimFather(className) {
        //获取待删除元素
        var removeEle = document.querySelector('.' + className);
        if (removeEle !== null) {
            // 获取目标节点的父节点
            var parent = removeEle.parentElement;
            // 用目标节点的父节点删除目标节点
            parent.removeChild(removeEle);
        }
    }

    /**
     * 进一步封装删除的方法
     * @param {待删除的广告元素class名称数组} classNameArray
     */
    function removeByLoopArray(classNameArray) {
        for (var className of classNameArray) {
            // 移除元素
            removeElementByHimFather(className);
        }
    }

    /**
     * 按周期来调用
     * @param {待处理的元素className数组} classNameArray
     * @param {回调函数} callbackFunc
     * @param {定时时间} time
     */
    var safeWaitFunc = function (classNameArray, callbackFunc, time) {
        time = time || 50;
        var id = setInterval(function () {
            clearInterval(id);
            callbackFunc(classNameArray);
        }, time)
    };

    function createBox() {
        var clearBox = document.createElement('div');
        var TEXT = document.createTextNode(`[净化]已启用 v${_VERSION_} by g0blin`);

        clearBox.style['background-color'] = '#dfe4ea';
        clearBox.style['color'] = '#747d8c';
        clearBox.style['font-size'] = '8px';
        clearBox.style['display'] = 'inline-block';
        clearBox.style['padding'] = '5px';
        clearBox.style['border-radius'] = '8px';
        clearBox.style['position'] = 'fixed';
        clearBox.style['bottom'] = '200px';
        clearBox.style['left'] = '0px';
        clearBox.style['user-select'] = 'none';
        clearBox.appendChild(TEXT);

        document.body.appendChild(clearBox);
    }

    /**
     * 打印脚本信息
     */
    function printInfo() {
        console.log(`%c[净化]已启用 v${_VERSION_} by g0blin`, "color:darkorange;background:#57606f;padding:5px;border-radius:8px;font-family:SimSun;font-size:8px");
        createBox();
    }

    //************************************************************************************* */
    var classNameArray = ['secondsknow-large-container', 'lemmaWgt-promotion-vbaike', 'lemmaWgt-promotion-slide', 'topA', 'appdownload', 'share-list', 'tashuo-right', 'tashuo-bottom', 'poster-middle', 'feeds-video-box', 'feeds-video-one-view', 'wgt-cms-banner', 'fresh-share-exp-e', 'J-secondsknow-large-container', 'unionAd', 'after-content', 'right-ad', 'task-panel', 'task-list-button', 'main-menu'];
    // timerToRemove(classNameArray);
    safeWaitFunc(classNameArray, removeByLoopArray, 500);

    //打印信息
    printInfo();

})();