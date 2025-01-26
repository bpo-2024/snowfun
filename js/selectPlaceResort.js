// select toggle close
document.addEventListener('click', function (event) {
const buttons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    buttons.forEach(button => {
        const targetSelector = button.getAttribute('data-bs-target');
        const collapseElement = document.querySelector(targetSelector);
        const targetElement = event.target; // Clicked element

        // Check if the clicked element is outside the collapse and the button
        if (!collapseElement.contains(targetElement) && !button.contains(targetElement)) {
            const collapseInstance = bootstrap.Collapse.getInstance(collapseElement); // Get collapse instance
            if (collapseInstance && collapseElement.classList.contains('show')) {
                collapseInstance.hide(); // Close collapse
            }
        }
    });
});

$(document).ready(function() {
  const data = {
    "hokkaido": [
        {
            "name": "Sahoro",
            "value": 48
        },
        {
            "name": "Moiwa",
            "value": 19
        },
        {
            "name": "Annupuri",
            "value": 43
        },
        {
            "name": "Grand HIRAFU",
            "value": 60
        },
        {
            "name": "夕張",
            "value": 20
        },
        {
            "name": "小樽天狗山",
            "value": 13
        },
        {
            "name": "手稻",
            "value": 17
        },
        {
            "name": "札幌國際",
            "value": 12
        },
        {
            "name": "盤溪",
            "value": 18
        },
        {
            "name": "藻岩山",
            "value": 16
        },
        {
            "name": "Tomamu",
            "value": 6
        },
        {
            "name": "留壽都",
            "value": 4
        },
        {
            "name": "富良野",
            "value": 7
        },
        {
            "name": "喜樂樂",
            "value": 5
    }
    ],
    "tohoku": [
        {
            "name": "雫石王子",
            "value": 59
        },
        {
            "name": "八甲田滑",
            "value": 15
        },
        {
            "name": "安比高原",
            "value": 1
        },
        {
            "name": "青森之泉",
            "value": 21
        },
        {
            "name": "猫魔",
            "value": 50
        },
        {
            "name": "ALTS",
            "value": 3
        },
        {
            "name": "夏油高原",
            "value": 14
        },
        {
            "name": "白石",
            "value": 58
        },
        {
            "name": "烏帽子",
            "value": 56
        },
        {
            "name": "澄川",
            "value": 57
        },
        {
            "name": "藏王溫泉",
            "value": 2
        }
    ],
    "niigata":[
        {
            "name": "RunRun",
            "value": 27
        },
        {
            "name": "Ski Park",
            "value": 26
        },
        {
            "name": "杉之原",
            "value": 22
        },
        {
            "name": "赤倉溫泉",
            "value": 24
        },
        {
            "name": "赤倉觀光",
            "value": 61
        },
        {
            "name": "關溫泉",
            "value": 25
        },
        {
            "name": "池之平",
            "value": 23
        },
        {
            "name": "邱比特",
            "value": 39
        },
        {
            "name": "苗場 / 神樂",
            "value": 10
        },
        {
            "name": "Gala",
            "value": 28
        },
        {
            "name": "NASPA",
            "value": 49
        },
        {
            "name": "上越國際",
            "value": 11
        },
        {
            "name": "石打丸山",
            "value": 53
        },
        {
            "name": "岩原",
            "value": 32
        },
        {
            "name": "神立高原",
            "value": 29
        },
        {
            "name": "湯澤中里",
            "value": 31
        },
        {
            "name": "舞子高原",
            "value": 30
        },
        {
            "name": "樂天",
            "value": 40
        }
    ],
    "nagano": [
        {
            "name": "栂池高原",
            "value": 36
        },
        {
            "name": "Cortina / 乘鞍",
            "value": 35
        },
        {
            "name": "八方尾根",
            "value": 33
        },
        {
            "name": "五龍 / 47",
            "value": 34
        },
        {
            "name": "岩岳",
            "value": 37
        },
        {
            "name": "鹿島槍",
            "value": 38
        },
        {
            "name": "白樺高原",
            "value": 62
        },
        {
            "name": "志賀高原",
            "value": 42
        },
        {
            "name": "奧志賀",
            "value": 52
        },
        {
            "name": "燒額山",
            "value": 51
        },
        {
            "name": "野澤溫泉",
            "value": 8
        },
        {
            "name": "斑尾高原 / 斑尾東急",
            "value": 41
        },
        {
            "name": "萬座",
            "value": 55
        },
        {
            "name": "輕井澤",
            "value": 9
        }
    ]    
  };
  
  // Function to generate HTML
  function generateHtml(data, keyId) {
      return data.map((item, index) => `
          <div class="collapseSelectPlace-item col-6 col-sm-4 col-md-3 col-lg-3">
              <input type="radio" class="btn-check" name="selectPlaceCollapse" id="${keyId}_${index + 1}" value="${item.value}" autocomplete="off">
              <label class="btn btn-radio btn-radio-lg" for="${keyId}_${index + 1}">${item.name}</label>
          </div>
      `).join('');
  }
  function modal_generateHtml(data, keyId) {
    return data.map((item, index) => `
        <div class="collapseSelectPlace-item col-6 col-sm-4">
            <input type="radio" class="btn-check" name="selectPlaceModal" id="modal_${keyId}_${index + 1}" value="${item.value}" autocomplete="off">
            <label class="btn btn-radio btn-radio-lg" for="modal_${keyId}_${index + 1}">${item.name}</label>
        </div>
    `).join('');
}
    
  const listKey = Object.keys(data);
    listKey.map((keyId) => {
        document.getElementById(keyId).innerHTML = generateHtml(data[keyId], keyId);
        document.getElementById(`modal_${keyId}`).innerHTML = modal_generateHtml(data[keyId], keyId);
    });
    
    // 確定選擇雪場
    $('#selectPlace_confirmButton').on('click', function() {
        const selectedRadio = $('input[name="selectPlaceCollapse"]:checked');
        $('input[name="selectPlaceModal"]:checked').prop('checked', false);
        $(`input[name="selectPlaceModal"][value="${selectedRadio[0].value}"]`).prop('checked', true);
        if (selectedRadio.length > 0) {
          const selectedText = $('label[for="' + selectedRadio.attr('id') + '"]').text();
          $('#selectPlaceButton').text(selectedText);
          $('#selectPlaceButton').addClass('text-black')
          $('#collapseSelectPlace').collapse('hide');
        } else {
        //   alert('請選擇一個選項');
        }
      });

      $('#modal_selectPlace_confirmButton').on('click', function() {
        const selectedRadio = $('input[name="selectPlaceModal"]:checked');
        $('input[name="selectPlaceCollapse"]:checked').prop('checked', false);
        $(`input[name="selectPlaceCollapse"][value="${selectedRadio[0].value}"]`).prop('checked', true);
        if (selectedRadio.length > 0) {
          const selectedText = $('label[for="' + selectedRadio.attr('id') + '"]').text();
          $('#selectPlaceButton').text(selectedText);
          $('#selectPlaceButton').addClass('text-black')
          $("#selectPlaceModal").modal("hide");
        } else {
        //   alert('請選擇一個選項');
        }
      });
});
  
// collapseSelectType
$(document).ready(function() {
  // 確定選擇雪板類型
  $('#selectType_confirmButton').on('click', function() {
    const selectedRadio = $('input[name="selectTypeCollapse"]:checked');
    $('input[name="selectTypeModal"]:checked').prop('checked', false);
    $(`input[name="selectTypeModal"][value="${selectedRadio[0].value}"]`).prop('checked', true);
    if (selectedRadio.length > 0) {
      let selectedText = $('label[for="' + selectedRadio.attr('id') + '"]').text();
      const selectedTextList = selectedText.split(" ");
      if(selectedTextList.length > 1){
          selectedText= selectedTextList[0];
      }
      $('#selectTypeButton').text(selectedText);
      $('#selectTypeButton').addClass('text-black')
      $('#collapseSelectType').collapse('hide');
    } else {
      // alert('請選擇一個雪板類型');
    }
  });
  $('#modal_selectType_confirmButton').on('click', function() {
    const selectedRadio = $('input[name="selectTypeModal"]:checked');
    $('input[name="selectTypeCollapse"]:checked').prop('checked', false);
    $(`input[name="selectTypeCollapse"][value="${selectedRadio[0].value}"]`).prop('checked', true);
    if (selectedRadio.length > 0) {
      let selectedText = $('label[for="' + selectedRadio.attr('id') + '"]').text();
      const selectedTextList = selectedText.split(" ");
      if(selectedTextList.length > 1){
          selectedText= selectedTextList[0];
      }
      $('#selectTypeButton').text(selectedText);
      $('#selectTypeButton').addClass('text-black')
      $('#selectTypeModal').collapse('hide');
    } else {
      // alert('請選擇一個雪板類型');
    }
  });
});
  