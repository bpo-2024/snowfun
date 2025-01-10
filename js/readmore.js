$(document).ready(function () {
  const cardHeight = 160; // 設置展開/收起的高度

  function initializeDescription($container) {
    $container.find(".description").each(function () {
      const $description = $(this).find(".description-content");
      const $readMore = $(this).find(".description-button");

      if ($description.length) {
        // 設置初始高度
        $description.css({
          overflow: "hidden",
          maxHeight: `${cardHeight}px`,
        });

        // 判斷是否需要顯示"顯示更多"按鈕
        if ($description[0].scrollHeight <= cardHeight) {
          $readMore.hide();
        } else {
          $readMore.show();
        }
      }

      // 綁定按鈕點擊事件
      $readMore.off("click").on("click", function () {
        const isCollapsed = $description.css("maxHeight") === `${cardHeight}px`;

        if (isCollapsed) {
          $description.css("maxHeight", `${$description[0].scrollHeight}px`);
          $readMore.html("顯示較少內容<i class='fa-solid fa-angle-up'></i>");
        } else {
          $description.css("maxHeight", `${cardHeight}px`);
          $readMore.html("顯示更多內容<i class='fa-solid fa-angle-down'></i>");
        }
      });
    });
  }

  // 初始化當前的活動 tab-pane
  initializeDescription($("#tabContent .tab-pane.active"));

  // 每次切換 pill 時重新初始化
  $('button[data-bs-toggle="pill"]').on("shown.bs.tab", function (e) {
    const target = $(e.target).data("bs-target"); // 取得目標 tab-pane 的 ID
    initializeDescription($(target));
  });
});
