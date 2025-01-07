window.onload = onLoaded;

// 页面枚举
const PageType =
{
    Main: "main",
    Links: "links",
    About: "about",
    Report: "report"
}

// 元素可见性枚举
const Visibility =
{
    visible: "visible",
    hidden: "hidden",
}

// 当此网页加载完成时执行
function onLoaded()
{
    setPage(PageType.Main); // 设置当前页面为首页

    // 设置bilibili网页
    document.getElementById("bilibili_iframe").src = "https://space.bilibili.com/363794407";
    // 设置网易云音乐外链空间
    document.getElementById("netease_player").src = "https://music.163.com/outchain/player?type=0&id=9388907169&auto=1&height=90";

    // 随机选择一个图片设置到背景
    background_img = document.getElementById("background_img");
    background_img.src = "asset/img/background" + (Math.floor(Math.random() * 4 ) + 1) + ".jpg";

    // 让加载页面消失的动画
    loading_container = document.getElementById("loading_container");
    loading_container_text = document.getElementById("loading_container_text");
    loading_container_text.innerHTML = "加载完成！"
    anime(
    {
        targets: loading_container,
        scale: 1.5,
        duration: 1000,
        easing: "easeOutExpo",
        complete: function()
        {
            anime({
                targets: loading_container,
                opacity: 0,
                duration: 500,
                easing: "easeOutExpo",
                complete: function()
                {
                    loading_container.style.display = "none";
                }
            });
            onPageChanged(PageType.Main);
        }
    });
}

// 设置元素可见性
function setElementVisibility(element, visibility)
{
    element.style.display = visibility == Visibility.visible ? "block" : "none";
}

// 设置页面
function setPage(pageType)
{
    // 获取所有需用到的元素
    var p = document.getElementById("header_titie");
    var mainPage = document.getElementById("body_main_container");
    var linksPage = document.getElementById("body_links_container");
    var aboutPage = document.getElementById("body_about_container");
    var reportPage = document.getElementById("body_report_container");

    // 将所有页面元素隐藏
    setElementVisibility(mainPage, Visibility.hidden);
    setElementVisibility(linksPage, Visibility.hidden);
    setElementVisibility(aboutPage, Visibility.hidden);
    setElementVisibility(reportPage, Visibility.hidden);

    // 判断设置的页面，并显示此页面
    switch (pageType)
    {
        case PageType.Main:
            p.innerHTML = "首页";
            setElementVisibility(mainPage, Visibility.visible);
            break;
        case PageType.Links:
            p.innerHTML = "链接"
            setElementVisibility(linksPage, Visibility.visible);
            break;
        case PageType.About:
            p.innerHTML = "关于"
            setElementVisibility(aboutPage, Visibility.visible);
            break;
        case PageType.Report:
            p.innerHTML = "反馈"
            setElementVisibility(reportPage, Visibility.visible);
            break;
    }
    onPageChanged(pageType);
}

// 当页面改变时加上动画
function onPageChanged(nowPage)
{
    var content = document.getElementById("body");
    // 页面位移动画
    anime(
    {
        targets: content,
        translateY: 100,
        duration: 0,
    });
    anime(
    {
        targets: content,
        translateY: 0,
        duration: 450,
        easing: "easeOutExpo"
    });

    // 为首页单独加动画
    if (nowPage === PageType.Main)
    {
        var card = document.getElementById("body_main_personalCard");
        anime({
            targets: card,
            scale: 1.5,
            opacity: 0,
            duration: 0
        });
        anime({
            targets: card,
            opacity: 1,
            duration: 1500
        })
        anime({
            targets: card,
            scale: 1,
            duration: 1000
        })

        rotateElement(document.getElementById("icon_container"));
    }
}

// 首页头像旋转动画
function rotateElement(element)
{
    anime({
        targets: element,
        rotate: 0,
        duration: 0,
    });
    anime({
        targets: element,
        rotate: 360,
        duration: 5000,
        
    });
}

// 播放器打开和收起函数
var isOpenPlayer = true;
function openOrClosePlayer()
{
    var player = document.getElementById("netease_player_container");
    var player_button_img = document.getElementById("player_button_img");
    
    // 检查播放器是否已打开
    if (isOpenPlayer)
    {
        // 启动收起播放器动画
        anime({
            targets: player,
            right: -326,
            duration: 500,
            easing: "easeOutExpo"
        });
        anime({
            targets: player_button_img,
            scaleX: -1,
            duration: 500,
            easing: "easeOutExpo"
        });
    }
    else
    {
        // 启动显示播放器动画
        anime({
            targets: player,
            right: 16,
            duration: 500,
            easing: "easeOutExpo"
        });
        anime({
            targets: player_button_img,
            scaleX: 1,
            duration: 500,
            easing: "easeOutExpo"
        });
    }

    isOpenPlayer = !isOpenPlayer;
}

// 在新标签页打开链接函数
function openurl(url)
{
    window.open(url);
}
