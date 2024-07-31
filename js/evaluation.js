$(document).ready(function () {
    var jsonData = [
      {
        id: 1,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！",
        rate: 5,
        images:['../images/default_image.png'],
        date: "2024/02/09",
        answer: {
          date: "2024/02/10",
          rate: 4.5,
          coachName: "JACK ROWE",
          content: "下次再一起征服",
        },
      },
      {
        id: 2,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪",
        rate: 3.5,
        date: "2024/03/10",
        images: [],
        answer: {
          date: "2024/03/11",
          rate: 4.0,
          coachName: "JACK ROWE",
          content: "下次再一起征服",
        },
      },
      {
        id: 3,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！",
        rate: 4.0,
        date: "2024/04/12",
        images: [],
      },
      {
        id: 4,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，",
        rate: 5,
        date: "2024/05/14",
        images: [],
        answer: {
          date: "2024/05/15",
          rate: 5.0,
          coachName: "JACK ROWE",
          content: "下次再一起征服",
        },
      },
      {
        id: 5,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！",
        rate: 2.0,
        date: "2024/06/16",
        images: [],
      },
      {
        id: 6,
        username: "Jamo",
        content: "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心",
        rate: 4.5,
        date: "2024/07/18",
        images: [],
        answer: {
          date: "2024/07/19",
          rate: 4.0,
          coachName: "JACK ROWE",
          content: "thanks",
        },
      },
      {
        id: 7,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！",
        rate: 3.0,
        date: "2024/08/20",
        images: [],
      },
      {
        id: 8,
        username: "Jamo",
        content: "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心",
        rate: 4.0,
        date: "2024/09/22",
        images: [],
        answer: {
          date: "2024/09/23",
          rate: 4.5,
          coachName: "JACK ROWE",
          content: "下次再一起征服",
        },
      },
      {
        id: 9,
        username: "Jamo",
        content:
          "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心，樂於分享滑雪與北海道的一切，還帶我們去雪場漂亮的秘境跟體驗鬆軟粉雪，時間上好上滿，真的很開心選擇他！",
        rate: 2.5,
        date: "2024/10/24",
        images: [],
      },
      {
        id: 10,
        username: "Jamo",
        content: "超讚的教練，可以馬上看出學生的問題並加已改正，而且溫柔有耐心",
        rate: 3.5,
        date: "2024/11/26",
        answer: {
          date: "2024/11/27",
          rate: 3.5,
          coachName: "JACK ROWE",
          content: "下次再一起征服",
        },
        images: [],
      },
      // Add more data as needed
    ];

    var perPage = 3;
    var currentPage = 1;
    var totalPages = Math.ceil(jsonData.length / perPage);

    function renderList(page) {
      $("#itemList").empty();
      var start = (page - 1) * perPage;
      var end = start + perPage;
      var pageItems = jsonData.slice(start, end);

      pageItems.forEach(function (item) {
        var listItem = `
        <li class="list-group-item">
            <div class="d-flex gap-3">
                <div class="avatar"></div>
                <div class="d-flex justify-content-between flex-fill">
                    <div class="d-flex flex-column justify-content-center gap-1">
                        <div class="username">${
                          item.username
                        }</div>
                        <div class="rate start-rate d-flex align-items-center">${renderStars(
                          item.rate
                        )}</div>
                    </div>
                    <div class="date">${item.date}</div>
                </div>
            </div>
            <div class="content evaluation-content">${item.content}</div>
            <div class="img-group">${renderContent(item.images)}</div>
    `;

        if (item.answer) {
          listItem += `
            <ul class="list-group coach-list">
                <li class="list-group-item">
                    <div class="d-flex gap-3">
                        <div class="avatar"></div>
                        <div class="d-flex flex-column justify-content-center gap-1">
                            <div class="username">${item.answer.coachName}</div>
                            <div class="date"> ${item.answer.date}</div>
                        </div>
                    </div>
                    <div class="content evaluation-content">${item.answer.content}</div>
                </li>
            </ul>
          `;
        }

        listItem += "</li>";

        $("#itemList").append(listItem);
      });
    }

    function renderStars(rate) {
      var stars = "";
      for (var i = 1; i <= 5; i++) {
        stars +=
          '<div data-score="' +
          i +
          '" class="star ' +
          (i <= rate ? "gold" : "gray") +
          '"></div>';
      }
      return stars;
    }

    function renderContent(content) {
        if(content.length && content[0].match(/\.(jpeg|jpg|gif|png)$/) != null){
            return content.map(item=>`<div><img src="${item}" alt="Image content"></div>`)
        }
        return ''
    }

    function renderPagination() {
      $("#pagination").empty();
      $("#pagination").append(
        '<li class="page-item ' +
          (currentPage === 1 ? "disabled" : "") +
          '"><a class="page-link page-prev" href="#" data-page="prev"></a></li>'
      );

      for (var i = 1; i <= totalPages; i++) {
        $("#pagination").append(
          '<li class="page-item ' +
            (currentPage === i ? "active" : "") +
            '"><a class="page-link" href="#" data-page="' +
            i +
            '">' +
            i +
            "</a></li>"
        );
      }

      $("#pagination").append(
        '<li class="page-item ' +
          (currentPage === totalPages ? "disabled" : "") +
          '"><a class="page-link page-next" href="#" data-page="next"></a></li>'
      );
    }

    function goToPage(page) {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderList(currentPage);
        renderPagination();
      }
    }

    $("#pagination").on("click", ".page-link", function (e) {
      e.preventDefault();
      var page = $(this).data("page");

      if (page === "prev") {
        goToPage(currentPage - 1);
      } else if (page === "next") {
        goToPage(currentPage + 1);
      } else {
        goToPage(parseInt(page));
      }
    });

    // Initial rendering
    renderList(currentPage);
    renderPagination();



    // more
    $('.evaluation-content').each(function() {
      var fullText = $(this).text();
      var maxLength = 144;

      if (fullText.length > maxLength) {
        var visibleText = fullText.substring(0, maxLength);
        var hiddenText = fullText.substring(maxLength);

        $(this).html(
          '<span class="visible-content">' + visibleText + '</span>' +
          '<span class="ellipsis">...</span>' +
          '<span class="hidden-content">' + hiddenText + '</span>' +
          ' <button class="btn btn-text evaluation-more toggle-content">看更多</button>'
        );
      }
    });

    $(document).on('click', '.toggle-content', function() {
      var $parent = $(this).parent();
      var $hiddenContent = $parent.find('.hidden-content');
      var $ellipsis = $parent.find('.ellipsis');

      // Show the hidden content and hide the ellipsis
      $hiddenContent.show();
      $ellipsis.hide();

      // Hide the "看更多" button
      $(this).hide();
  });
 
  });
