  $(function () {
        const today = new Date();
        let currentDate = new Date();
        let currentView = "month";
        let expandedDateStr = null;

       const calendarData = {
            "2025-06-01": {
                status: "started",
                course: [
                    { title: "瑜伽課程", session: "上半" },
                    { title: "英文會話", session: "下半" },
                    { title: "程式設計", session: "上半" },
                    { title: "商業簡報", session: "下半" },
                    { title: "資料分析", session: "全天" }
                ]
            },
            "2025-06-03": {
                status: "booked",
                course: [
                    { title: "行銷策略", session: "全天" },
                ]
            },
            "2025-06-05": {
                status: "customized",
                course: [
                    { title: "籃球訓練", session: "下半" },
                    { title: "日語進階", session: "下半" },
                    { title: "資料分析", session: "全天" }
                ]
            },
            "2025-06-08": {
                status: "awaitingPayment",
                course: [
                    { title: "語言交換", session: "上半" },
                    { title: "創業分享", session: "下半" },
                    { title: "心靈成長", session: "下半" },
                    { title: "AI 簡報", session: "上半" },
                    { title: "行銷策略", session: "全天" },
                ]
            },
            "2025-06-10": {
                status: "started",
                course: [
                    { title: "行銷策略", session: "全天" },
                    { title: "團隊合作", session: "全天" }
                ]
            },
            "2025-06-12": {
                status: "booked",
                course: [
                    { title: "網站開發", session: "上半" },
                    { title: "語言交換", session: "上半" },
                    { title: "攝影實作", session: "下半" },
                    { title: "團隊合作", session: "全天" }
                ]
            },
            "2025-06-15": {
                status: "customized",
                course: [
                    { title: "資料分析", session: "全天" }
                ]
            },
            "2025-06-18": {
                status: "awaitingPayment",
                course: [
                { title: "音樂欣賞", session: "下半" },
                { title: "哲學討論", session: "下半" }
                ]
            },
            "2025-06-22": {
                status: "started",
                course: [
                    { title: "專案提案", session: "上半" },
                    { title: "溝通技巧", session: "上半" },
                    { title: "時間管理", session: "下半" }
                ]
            },
            "2025-06-25": {
                status: "booked",
                course: [
                    { title: "AI 訓練營", session: "全天" },
                ]
            }
            };


        function buildCalendarCell(dateObj, items, dateStr, status) {
          const $cell = $('<div class="calendar-cell"></div>');
          if (expandedDateStr === dateStr) $cell.addClass("select");
          if (status) $cell.addClass("status-" + status);

          $cell.append(`<div class="date-number">${dateObj.getDate()}</div>`);

          const hasMorning = items.some(i => i.session === "上半");
            const hasAfternoon = items.some(i => i.session === "下半");
            const hasAllDay = items.some(i => i.session === "全天");

            if (hasMorning || hasAfternoon || hasAllDay) {
            $cell.append(
                `<div class="session-text ${status}">
                ${hasMorning ? `<span class="session-morning">(下半)</span>`  : ""}${hasAfternoon ? `<span class="session-afternoon">(下半)</span>` : ""}${hasAllDay ? `<span class="session-all">(全)</span>` : ""}
                </div>`
            );
        }

          items.forEach((item, index) => {
            if (index < 2) {
              $cell.append(`<div class="item">${item.title}</div>`);
            } else if (index === 2) {
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
                    <div class="d-flex justify-content-end align-items-center expanded-cell-header-top ${status==="started"?"":"opacity-0 pe-none"}"><button type="button" data-bs-toggle="modal"
        data-bs-target="#editCoachCourse"></button></div>
                    <div>(上半)(下半)<span class="${status}">(全)</span></div>
                </div>
              `);
                
                 // 課程內容包在 status-box 裡
                const $statusBox = $('<div class="status-box"></div>');
                items.forEach(i => {
                    const $box = $(`<div class="expanded-box"><span class="status-${status}">${i.title}</span></div>`);
                    $statusBox.append($box);
                });

                $expandedCell.append($header).append($statusBox);
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
    