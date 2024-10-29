$(document).ready(function() {
    // 確保初始狀態下不顯示 collapseHeaderMenu
    if ($(window).width() >= 992) {
        $("#collapseHeaderMenu").removeClass("show");
    }

    $("#header-avatar").on("click", function(event) {
        if ($(window).width() < 992) {
            // 小於 992px 時，點擊導向 user-profile.html
            event.preventDefault(); // 停止預設的 collapse 行為
            window.location.href = "user-profile.html";
        }
    });

    $(window).on("resize", function() {
        // 當寬度變更為 >= 992px 時，確保 collapse 菜單隱藏
        if ($(window).width() >= 992) {
            $("#collapseHeaderMenu").removeClass("show");
        }
    });
});

$(document).ready(function() {
    function updateViewBasedOnStatusAndWidth() {
        const isSmallScreen = $(window).width() < 992;
        if(!isSmallScreen) {
            $('#left-side').removeClass('visually-hidden');
            $('#mb-profile-confirm').removeClass('visually-hidden');
            $('#right-side').addClass('show');
            
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const isStatusOne = urlParams.get('status') === '1';
        if (isStatusOne) {
            $('#right-side').addClass('show');
            $('#left-side').addClass('visually-hidden');
            $('#profile-confirm').removeClass('visually-hidden');
        } else {
            $('#right-side').removeClass('show');
            $('#mb-profile-confirm').addClass('visually-hidden');
            $('#left-side').removeClass('visually-hidden');
        }
    }

    // Initial check on page load
    updateViewBasedOnStatusAndWidth();

    // Check on window resize
    $(window).on('resize', function() {
        updateViewBasedOnStatusAndWidth();
    });
});

 // menu
 $(document).ready(function() {
    const $menuItems = $('.profile-menu li');

    // 根據當前頁面 URL 設置對應的 active 項目
    const currentPath = window.location.pathname + window.location.search;

    $menuItems.each(function() {
        const $menuItem = $(this);
        const targetUrl = $menuItem.data('url');

        // 檢查目標 URL 是否匹配當前頁面 URL，若匹配則設為 active
        if (targetUrl && currentPath === targetUrl) {
            $menuItems.removeClass('active'); // 先移除所有 active 類別
            $menuItem.addClass('active'); // 為當前項目加上 active 類別
        }

        // 點擊事件處理
        $menuItem.on('click', function() {
            $menuItems.removeClass('active');
            $menuItem.addClass('active');

            // 導向到指定的 URL
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });
});
