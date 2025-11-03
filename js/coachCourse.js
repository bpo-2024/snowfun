$(function () {
  const today = new Date();
  let currentDate = new Date();
  let currentView = "month";
  let expandedDateStr = null;

  function buildCalendarCell(dateObj, items, dateStr, status) {
    const $cell = $('<div class="calendar-cell"></div>');
    if (expandedDateStr === dateStr) $cell.addClass("select");
    if (status) $cell.addClass("status-" + status);

    $cell.append(`<div class="date-number">${dateObj.getDate()}</div>`);

    const hasMorning = items.some((i) => i.session === "上半");
    const hasAfternoon = items.some((i) => i.session === "下半");
    const hasAllDay = items.some((i) => i.session === "全天");

    if (hasMorning || hasAfternoon || hasAllDay) {
      $cell.append(
        `<div class="session-text text-truncate ${status}">
                ${
                  hasMorning
                    ? `<span class="session-morning">(下半)</span>`
                    : ""
                }${
          hasAfternoon ? `<span class="session-afternoon">(下半)</span>` : ""
        }${hasAllDay ? `<span class="session-all">(全)</span>` : ""}
                </div>`
      );
    }

    const isMobile = window.innerWidth <= 767;
    const visibleCount = isMobile ? 1 : 2;

    const noEdit = $("#calendar-dates").hasClass("no-edit");

    items.forEach((item, index) => {
      if (index < visibleCount) {
        $cell.append(`<div class="item">${item.title}</div>`);
      } else if (index === visibleCount) {
        const $moreBtn = $('<div class="more-button">+more</div>');
        $moreBtn.on("click", function () {
          const $expandedRows = $(".expanded-row");
          if (expandedDateStr === dateStr) {
            $expandedRows.remove();
            expandedDateStr = null;
            $(".calendar-cell.select").removeClass("select");
            return;
          }

          $expandedRows.remove();
          $(".calendar-cell.select").removeClass("select");

          const $row = $(this).closest(".calendar-row");
          const $expandedRow = $(
            '<div class="calendar-row expanded-row"></div>'
          );
          const $expandedCell = $('<div class="expanded-cell"></div>');

          const $header = $(`
                    <div class="expanded-cell-header">
                    <div class="d-flex justify-content-end align-items-center expanded-cell-header-top ${
                      status === "started" ? "" : "opacity-0 pe-none"
                    }">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#editCoachCourse"></button>
                    </div>
                    <div>(上半)(下半)<span class="${status}">(全)</span></div>
                    </div>
                `);

          const $statusBox = $('<div class="status-box"></div>');
          items.forEach((i) => {
            const $box = $(
              `<div class="expanded-box"><span class="status-${status}">${i.title}</span></div>`
            );
            $statusBox.append($box);
          });
          // noEdit
          if (!noEdit) {
            $expandedCell.append($header);
          }

          $expandedCell.append($statusBox);
          $expandedRow.append($expandedCell);
          $row.after($expandedRow);

          $(this).closest(".calendar-cell").addClass("select");
          expandedDateStr = dateStr;
        });
        $cell.append($moreBtn);
      }
    });

    return $cell;
  }

  function renderCalendar() {
    const $dates = $("#calendar-dates").empty();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    $("#calendar-title").text(
      `${year}年${(month + 1).toString().padStart(2, "0")}月`
    );

    let week = [];

    if (currentView === "month") {
      const startDate = new Date(year, month, 1);
      const startDay = startDate.getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < startDay; i++) {
        week.push($('<div class="calendar-cell empty"></div>'));
      }

      for (let d = 1; d <= totalDays; d++) {
        const cellDate = new Date(year, month, d);
        const yyyy = cellDate.getFullYear();
        const mm = (cellDate.getMonth() + 1).toString().padStart(2, "0");
        const dd = cellDate.getDate().toString().padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;
        const dayData = calendarData[dateStr];
        const items = dayData?.course || [];
        const status = dayData?.status;

        week.push(buildCalendarCell(cellDate, items, dateStr, status));

        if (week.length === 7 || d === totalDays) {
          while (week.length < 7)
            week.push($('<div class="calendar-cell empty"></div>'));
          const $row = $('<div class="calendar-row"></div>');
          week.forEach((c) => $row.append(c));
          $dates.append($row);
          week = [];
        }
      }
    } else {
      let startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const $row = $('<div class="calendar-row"></div>');
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const yyyy = date.getFullYear();
        const mm = (date.getMonth() + 1).toString().padStart(2, "0");
        const dd = date.getDate().toString().padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;
        const items = calendarData[dateStr]?.course || [];
        const status = calendarData[dateStr]?.status;

        $row.append(buildCalendarCell(date, items, dateStr, status));
      }
      $dates.append($row);
    }
  }

  function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    expandedDateStr = null;
    renderCalendar();
  }

  function changeWeek(offset) {
    currentDate.setDate(currentDate.getDate() + offset * 7);
    expandedDateStr = null;
    renderCalendar();
  }

  $("#prev-btn").on("click", function () {
    currentView === "month" ? changeMonth(-1) : changeWeek(-1);
  });

  $("#next-btn").on("click", function () {
    currentView === "month" ? changeMonth(1) : changeWeek(1);
  });

  $("#today-btn").on("click", function () {
    currentDate = new Date(today);
    expandedDateStr = null;
    renderCalendar();
  });

  $("#month-view").on("click", function () {
    currentView = "month";
    $(this).addClass("active");
    $("#week-view").removeClass("active");
    expandedDateStr = null;
    renderCalendar();
  });

  $("#week-view").on("click", function () {
    currentView = "week";
    $(this).addClass("active");
    $("#month-view").removeClass("active");
    expandedDateStr = null;
    renderCalendar();
  });

  renderCalendar();
});

// select date
let viewMonth = new Date();
let startDate = null;
let endDate = null;

function renderTwoMonthCalendar(baseDate) {
  $("#calendarWrapper").empty();

  for (let m = 0; m < 2; m++) {
    const date = new Date(baseDate.getFullYear(), baseDate.getMonth() + m, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const firstDayWeek = new Date(year, month, 1).getDay(); // 星期幾（日=0）

    const $container = $('<div class="calendar-container">');

    // 月份標題
    $container.append(
      `<div class="calendar-title">${year}年${month + 1}月</div>`
    );

    // 加上星期列
    const $weekdays = $('<div class="calendar-weekdays">');
    const weekNames = ["日", "一", "二", "三", "四", "五", "六"];
    weekNames.forEach((d) => {
      $weekdays.append(`<div>${d}</div>`);
    });
    $container.append($weekdays);

    // 日期網格
    const $grid = $('<div class="calendar-grid">');

    // 補空白以對齊第一天
    for (let i = 0; i < firstDayWeek; i++) {
      $grid.append('<div class="calendar-date empty"></div>');
    }

    for (let i = 1; i <= lastDay; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;
      const $day = $('<div class="calendar-date">')
        .text(i)
        .attr("data-date", dateStr);

      if (startDate === dateStr) {
        $day.addClass("select").attr("data-type", "startDate");
      } else if (endDate === dateStr) {
        $day.addClass("select").attr("data-type", "endDate");
      } else if (
        startDate &&
        endDate &&
        dateStr > startDate &&
        dateStr < endDate
      ) {
        $day.addClass("range");
        // 檢查是否為區間內第一個或最後一個
        const nextDate = new Date(dateStr);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextStr = nextDate.toISOString().slice(0, 10);

        const prevDate = new Date(dateStr);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevStr = prevDate.toISOString().slice(0, 10);

        if (prevStr === startDate) $day.addClass("range-start");
        if (nextStr === endDate) $day.addClass("range-end");
      }

      $grid.append($day);
    }

    $container.append($grid);
    $("#calendarWrapper").append($container);
  }
}

$(function () {
  renderTwoMonthCalendar(viewMonth);

  $("#prevMonth").on("click", function () {
    viewMonth.setMonth(viewMonth.getMonth() - 1);
    renderTwoMonthCalendar(viewMonth);
  });

  $("#nextMonth").on("click", function () {
    viewMonth.setMonth(viewMonth.getMonth() + 1);
    renderTwoMonthCalendar(viewMonth);
  });

  $("#calendarWrapper").on("click", ".calendar-date", function () {
    const selectedDate = $(this).data("date");

    if (!startDate || (startDate && endDate)) {
      startDate = selectedDate;
      endDate = null;
    } else if (selectedDate < startDate) {
      startDate = selectedDate;
      endDate = null;
    } else {
      endDate = selectedDate;
      $("#dateDisplay").text(`${startDate} ~ ${endDate}`);
    }

    renderTwoMonthCalendar(viewMonth);
  });

  $("#datePickerCollapse").on("shown.bs.collapse", function () {
    viewMonth = new Date();
    renderTwoMonthCalendar(viewMonth);
  });
});

// 開放時段
$(function () {
  // 初次進入頁面，如果有預設選項，套上 select class
  $('input[name="selectRange"]').each(function () {
    if ($(this).is(":checked")) {
      $('label[for="' + this.id + '"]').addClass("select");
    }
  });

  // 切換選項時更新 select class
  $('input[name="selectRange"]').on("change", function () {
    $('input[name="selectRange"]').each(function () {
      $('label[for="' + this.id + '"]').removeClass("select");
    });

    const selectedId = $(this).attr("id");
    $('label[for="' + selectedId + '"]').addClass("select");
  });
});
