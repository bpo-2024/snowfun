$(document).ready(function () {
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    const currentDateStr = today.toISOString().split("T")[0];

    const events = [
      { date: "2024-07-30", 
        place: 
          [
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
            {
              "title": "越後湯澤 岩原滑雪場",
              "skiResort": 32,
              "order": 3,
              "bgColor": "#fcf1e1",
              "textColor": "#836942",
              "url": "#"
            }
          ]
      },
      { date: "2024-07-31", 
        place: 
          [
            {
              title:'札幌手稻滑雪場滑雪場',
              "skiResort": 9,
              "order": 4,
              "bgColor": "#eeecfd",
              "textColor": "#5b4fa7",
              "url": "#"
            },
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
            {
              "title": "越後湯澤 岩原滑雪場",
              "skiResort": 32,
              "order": 3,
              "bgColor": "#fcf1e1",
              "textColor": "#836942",
              "url": "#"
            }
          ]
      },
      { date: "2024-08-01", 
        place: 
          [
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
          ]
      },
      { date: "2024-08-02", 
        place: 
          [
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
            {
              "title": "札幌手稻滑雪場",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#ebf1f5",
              "textColor": "#1ba4ed",
              "url": "#"
            },
          ]
      },
      { date: "2024-08-03", 
        place: 
          [
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
          ]
      },
      { date: "2024-08-07", 
        place: 
          [
            {
              "title": "札幌手稻滑雪場",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#ebf1f5",
              "textColor": "#1ba4ed",
              "url": "#"
            },
          ]
      },
      { date: "2024-08-10", 
        place: 
          [
            {
              "title": "札幌手稻滑雪場",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#ebf1f5",
              "textColor": "#1ba4ed",
              "url": "#"
            },
          ]
      },
      { date: "2024-08-11", 
        place: 
          [
            {
              "title": "藏王溫泉滑雪場",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#eeecfd",
              "textColor": "#5b4fa7",
              "url": "#"
            },
            {
              "title": "越後湯澤 岩原滑雪場",
              "skiResort": 32,
              "order": 3,
              "bgColor": "#fcf1e1",
              "textColor": "#836942",
              "url": "#"
            },
            {
              "title": "札幌手稻滑雪場",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#ebf1f5",
              "textColor": "#1ba4ed",
              "url": "#"
            },
          ]
      },
      { date: "2024-08-20", 
        place: 
          [
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
            {
              "title": "越後湯澤 岩原滑雪場",
              "skiResort": 32,
              "order": 3,
              "bgColor": "#fcf1e1",
              "textColor": "#836942",
              "url": "#"
            },
            {
              "title": "越後湯澤 石打丸山滑雪場",
              "skiResort": 32,
              "order": 3,
              "bgColor": "#fcf1e1",
              "textColor": "#836942",
              "url": "#"
            }
          ]
      },
      { date: "2024-08-25", 
        place: 
          [
            {
              "title": "越後湯澤 岩原滑雪場",
              "skiResort": 32,
              "order": 3,
              "bgColor": "#fcf1e1",
              "textColor": "#836942",
              "url": "#"
            },
            {
              "title": "輕井澤",
              "skiResort": 9,
              "order": 4,
              "bgColor": "#e5f2f0",
              "textColor": "#109084",
              "url": "#"
            },
            {
              title:'札幌手稻滑雪場滑雪場',
              "skiResort": 9,
              "order": 4,
              "bgColor": "#eeecfd",
              "textColor": "#5b4fa7",
              "url": "#"
            },
          ]
      },
    ];

    function generateCalendar(year, month) {
      const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
      const daysInMonth = new Date(year, month, 0).getDate(); // 获取该月的天数
      const firstDay = new Date(year, month - 1, 1).getDay(); // 获取该月第一天是星期几

      let calendarHtml = `<table class="table"><thead><tr><th class="calendar-title" colspan="7">${year}年${monthNames[month - 1]}</th></tr><tr>`;
      const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
      for (let day of dayNames) {
          calendarHtml += `<th>${day}</th>`;
      }
      calendarHtml += `</tr></thead><tbody>`;

      for (let i = 0; i < firstDay; i++) {
          calendarHtml += `<td></td>`;
      }

      for (let day = 1; day <= daysInMonth; day++) {
          if ((day + firstDay - 1) % 7 === 0 && day > 1) {
              calendarHtml += `</tr><tr>`;
          }
          const dateId = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          let additionalClass = dateId < currentDateStr ? 'before-day' : '';
          calendarHtml += `<td id="${dateId}" class="${additionalClass}"><div class="calendar-date">${day}</div></td>`;
      }
      calendarHtml += `</tr></tbody></table>`;

      $('#calendar').html(calendarHtml);
      
      // 标记日期
      markDates(events);
    }

    
    function markDates(events) {
        events.forEach(event => {
            const date = event.date;
            const places = event.place;
            const dateElement = $(`#${date}`);
            if (dateElement.length) {
                // 显示第一个地点
                const firstPlace = places[0];
                dateElement.append(`<span class="tag" style="background-color:${firstPlace.bgColor}; color:${firstPlace.textColor};">${firstPlace.title}</span>`);
                if (places.length > 1) {
                    dateElement.append(`<button class="more-btn btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapse-${date}">+more</button>`);
                }

                // 初始化时插入 MoreInfo 行
                let moreInfoHtml = `<tr class="more-info"><td colspan="7"><div class="collapse text-start" id="collapse-${date}"><div class="more-info-content">`;
                moreInfoHtml += places.map(place => `<span class="tag" style="background-color:${place.bgColor}; color:${place.textColor};">${place.title}</span>`).join(" ");
                moreInfoHtml += `</div></div></td></tr>`;
                // 找到当前日期所在的行
                const currentRow = dateElement.closest('tr');
                // 在当前行的下方插入详细信息行
                currentRow.after(moreInfoHtml);
            }
        });
    }
    function changeMonth(offset) {
      currentMonth += offset;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      } else if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
      }
      generateCalendar(currentYear, currentMonth);
    }

    $("#prev-month").click(function () {
      changeMonth(-1);
    });

    $("#next-month").click(function () {
      changeMonth(1);
    });

    let currentExpanded = null;
    $(document).on("click", ".more-btn", function () {
      const target = $(this).data("bs-target");
      if (currentExpanded && currentExpanded !== target) {
        $(currentExpanded).collapse("hide");
      }

      $(target).collapse("toggle");

      $(".active-day").removeClass("active-day");
      const parentTd = $(this).closest("td");
      parentTd.addClass("active-day");
      if (currentExpanded === target) {
        $(".active-day").removeClass("active-day");
        currentExpanded = null;
      } else {
        currentExpanded = target;
      }
    });

    generateCalendar(currentYear, currentMonth); // init
  });
