$(document).ready(function() {
	let currentDate = new Date();
	const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
	const coachDates = ["2024-08-16", "2024-08-17", "2024-08-18", "2024-08-19"];

	function renderCalendar(calendarId, year, month) {
		let date = new Date(year, month, 1);
		let daysInMonth = new Date(year, month + 1, 0).getDate();
		let firstDayOfWeek = new Date(year, month, 1).getDay();

		let html = `<table class="table calendar-table"><thead><tr><th colspan="7">${year}年 ${date.toLocaleString(
			"default",
			{ month: "long" }
		)}</th></tr><tr>`;
		weekDays.forEach((day) => {
			html += `<th>${day}</th>`;
		});
		html += `</tr></thead><tbody><tr>`;

		for (let i = 0; i < firstDayOfWeek; i++) {
			html += "<td></td>";
		}

		for (let day = 1; day <= daysInMonth; day++) {
			let fullDate = new Date(year, month, day);
			let dateString = `${fullDate.getFullYear()}-${(
				"0" +
				(fullDate.getMonth() + 1)
			).slice(-2)}-${("0" + fullDate.getDate()).slice(-2)}`;
			let isCoachDate = coachDates.includes(dateString) ? " coach-date" : "";
			if ((day + firstDayOfWeek - 1) % 7 === 0 && day > 1) {
				html += "</tr><tr>";
			}
			html += `<td class="calendar-day${isCoachDate}" data-date="${dateString}">${day}</td>`;
		}

		for (let i = (firstDayOfWeek + daysInMonth - 1) % 7; i < 6; i++) {
			html += "<td></td>";
		}
		html += "</tr></tbody></table>";
		$("#" + calendarId).html(html);

		// 添加點擊事件至每個日期
		$(".calendar-day").click(function() {
			let selectedDate = $(this).data("date"); // 從data-date屬性獲取日期
			selectedDate = selectedDate.replace(/-/g, "/"); // 將日期格式由"年-月-日"改為"年/月/日"
			$("#inputDate").val(selectedDate); // 將選擇的日期填充到輸入框中
			$("#selectDateModal").modal("hide");
		});
	}

	function updateCalendar() {
		renderCalendar(
			"calendar-left",
			currentDate.getFullYear(),
			currentDate.getMonth()
		);
	}

	updateCalendar();

	$("#prev-month").click(function() {
		currentDate.setMonth(currentDate.getMonth() - 1);
		updateCalendar();
	});

	$("#next-month").click(function() {
		currentDate.setMonth(currentDate.getMonth() + 1);
		updateCalendar();
	});

	$("#prev-year").click(function() {
		currentDate.setFullYear(currentDate.getFullYear() - 1);
		updateCalendar();
	});

	$("#next-year").click(function() {
		currentDate.setFullYear(currentDate.getFullYear() + 1);
		updateCalendar();
	});
});
