$(document).ready(function () {
  let fileList = [];
  var fileInput = $('#file-upload-image')
    // Function to display selected images in the .image-group
    function displaySelectedImages() {
      if(fileList.length > 3 ) {
         return;
       }
      var imageGroup = $('.new-image-group');
      imageGroup.empty(); // Clear any previous images

 
      Array.from(fileList).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var imageDiv = $('<div class="upload-image-box">');
                var img = $('<img width="114" height="114">').attr('src', e.target.result).attr('data-file-name', file.name);
                var btnContainer = $('<div class="btn-container">');
                var removeBtn = $('<button class="btn-remove"></button>');
                var zoomInBtn = $('<button class="btn-zoomIn"></button>');

                // Handle the remove button click
                removeBtn.on('click', function() {
                  // Remove image from the display
                  imageDiv.remove();

                  // Remove image from the file input
                  var fileInput = $('#file-upload-image')[0];
                  var dataTransfer = new DataTransfer();
                  Array.from(fileInput.files).forEach((f, i) => {
                      if (f.name !== file.name) {
                          dataTransfer.items.add(f);
                      }
                  });
                  fileInput.files = dataTransfer.files;
                  $('#file-upload-image').fileinput('refresh');
              });

                // Handle the zoom-in button click
                zoomInBtn.on('click', function() {
                  var frames = fileInput.fileinput('getFrames');
                  frames.each(function() {
                      if ($(this).find('img').attr('src') === e.target.result) {
                          fileInput.fileinput('zoom', $(this).attr('id'));
                      }
                  });
                });


                btnContainer.append(removeBtn).append(zoomInBtn);
                imageDiv.append(img).append(btnContainer);
                imageGroup.append(imageDiv);
            };
            reader.readAsDataURL(file);
        }
      });

    }

    $('#file-upload-image').on('fileremoved', function(event, id, key) {
      $('.new-image-group img').filter(function() {
            return $(this).attr('data-file-name') === `${key.split('_')[1]}_${key.split('_')[2]}`;
        }).remove();
    });

    // Handle file selection
    $('#file-upload-image').on('change', function () {
        var files = this.files;
        fileList = [...files, ...fileList]
        displaySelectedImages(files);
    });


    $("#file-upload-image").fileinput({
      theme: "explorer",
      uploadUrl: "/",
      language: "zh-TW",
      showRemove: false,
      overwriteInitial: false,
      initialPreviewAsData: true,
      initialPreview: [],
      initialPreviewConfig: [],
      dropZoneTitle: "將照片拖曳至此上傳",
      maxFileCount: 3, // Limit to 3 files
      maxFileSize: 6000, // Set file size limit to 6000 KB (6 MB)
      msgFilesTooMany:
        "您選擇的檔案數量 ({n}) 超過了上限 {m}。檔案上限為3個。",
      msgSizeTooLarge:
        '檔案 "{name}" (大小: {size} KB) 超過了允許的最大大小 {maxSize} KB。檔案請小於6000 KB。',
      msgUploadError: "上傳錯誤",
      msgProcessing: "處理中...",
    
    }).on('fileuploaded', function(event, previewId, index, fileId) {
      console.log('File Uploaded', 'ID: ' + fileId + ', Thumb ID: ' + previewId);
    }).on('fileuploaderror', function(event, data, msg) {
        console.log('File Upload Error', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
    }).on('filebatchuploadcomplete', function(event, preview, config, tags, extraData) {
        console.log('File Batch Uploaded', preview, config, tags, extraData);
    });

    $(".file-drop-zone").on("click", function (e) {
      // Check if the click target is not a file preview frame
      if (!$(e.target).closest(".file-preview-frame").length && !$(e.target).closest(".file-error-message").length ) {
        $("#file-upload-image").trigger("click");
      }
    });

    $("#upload-form").on("submit", function (e) {
      e.preventDefault(); // Prevent default form submission
      $("#file-upload-image").fileinput("upload"); // Trigger the fileinput plugin's upload method
    });

    $(document).on('show.bs.modal', '#kvFileinputModal', function () {
      var modalDialog = $(this).find('.modal-dialog');
      if (!modalDialog.hasClass('modal-dialog-centered')) {
          modalDialog.addClass('modal-dialog-centered');
      }
  });

});

  const previewData = {
    initialPreview: [
      "https://picsum.photos/id/101/1920/1080",
      "https://picsum.photos/id/102/1920/1080",
    ],
    initialPreviewConfig: [
      {
        caption: "picture-1.jpg",
        description: "<h5>Picture One</h5> 描述1",
        size: 329892,
        width: "120px",
        url: "/site/file-delete",
        key: 101
      },
      {
        caption: "picture-2.jpg",
        description: "<h5>Picture Two</h5> 描述2",
        size: 872378,
        width: "120px",
        url: "/site/file-delete",
        key: 102
      },
    ]
  };

  

// 上傳照片
$(document).ready(function() {
  $("#input-image").fileinput({
    theme: "explorer",
    uploadUrl: "/",
    language: "zh-TW",
    showRemove: false,
    overwriteInitial: false,
    initialPreviewAsData: true,
    initialPreview: previewData.initialPreview,
    initialPreviewConfig: previewData.initialPreviewConfig,
    dropZoneTitle: "<div class='text-blue lh-sm fw-medium fs-6'>可拖曳或直接點擊複選檔案<br>支援JPG與PNG圖檔, 檔案大小6MB以下</div>",
    // maxFileCount: 3, // Limit to 3 files
    maxFileSize: 6000, // Set file size limit to 6000 KB (6 MB)
    msgFilesTooMany:
      "您選擇的檔案數量 ({n}) 超過了上限 {m}。檔案上限為n個。",
    msgSizeTooLarge:
      '檔案 "{name}" (大小: {size} KB) 超過了允許的最大大小 {maxSize} KB。檔案請小於6000 KB。',
    msgUploadError: "上傳錯誤",
    msgProcessing: "處理中....<span>1234</span>",
  }).on('fileuploaded pic', function(event, previewId, index, fileId) {
      console.log('File Uploaded pic', 'ID: ' + fileId + ', Thumb ID: ' + previewId);
    }).on('fileuploaderror', function(event, data, msg) {
        console.log('File Upload Error pic', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
    }).on('filebatchuploadcomplete pic', function(event, preview, config, tags, extraData) {
        console.log('File Batch Uploaded', preview, config, tags, extraData);
    });;
  
  $('#addPicBtn, .image-upload .upload-area, .image-upload .file-preview').on('click', function (e) {
  // 如果點到的是影片預覽區，就不要觸發
  if (
    $(e.target).closest('.kv-file-content, .kv-file-remove, .kv-file-upload, .kv-file-zoom, .fileinput-remove, .file-error-message').length > 0
  ) return;
    $('#input-image').trigger('click');
  });

  // 封面
  let coverSet = false;

  $(document).on('click', '.upload-with-tag .file-preview-frame', function (e) {
    // 如果點擊來自內部的按鈕（例如刪除、下載、其他操作），則跳過
    if (
      $(e.target).closest('.kv-file-remove, .kv-file-download, .fileinput-upload').length
    ) {
      return;
    }

    // 移除其他 active 樣式與 cover 標籤
    $('.file-preview-frame').removeClass('active').find('.cover-tag').remove();

    // 加上 active 樣式
    $(this).addClass('active');

    // 插入 cover 標籤
    const label = coverSet ? '封面' : '設為封面';
    $(this).append(`<div class="cover-tag d-flex align-items-center"><img src="./images/icon_check.svg">${label}</div>`);

    // 切換封面狀態
    coverSet = !coverSet;
  });

});

// 上傳影片
$(document).ready(function() {
  $("#input-video").fileinput({
    theme: "explorer",
    uploadUrl: "/",
    language: "zh-TW",
    showRemove: false,
    overwriteInitial: false,
    initialPreviewAsData: true,
    initialPreview: [],
    initialPreviewConfig:[],
    dropZoneTitle: "<div class='text-blue lh-sm fw-medium fs-6'>可拖曳或直接點擊複選檔案<br>單一影片檔案上限為500mb，為避免檔案傳輸過程中發生錯誤，建議影片大小為200mb以下，或是先將影片壓縮轉檔後上傳</div>",
    maxFileCount: 2, // Limit to 2 files
    maxFileSize: 6000, // Set file size limit to 6000 KB (6 MB)
    msgFilesTooMany:
      "！超過限制數量，最多只能上傳兩段影，若要更改影片請先刪除不要的影片",
    msgSizeTooLarge:
      '檔案 "{name}" (大小: {size} KB) 超過了允許的最大大小 {maxSize} KB。檔案請小於6000 KB。',
    msgUploadError: "上傳錯誤",
    msgProcessing: "處理中...",
  }).on('fileuploaded', function(event, previewId, index, fileId) {
        console.log('File Uploaded', 'ID: ' + fileId + ', Thumb ID: ' + previewId);
    }).on('fileuploaderror', function(event, previewId, index, fileId) {
        console.log('File Upload Error', 'ID: ' + fileId + ', Thumb ID: ' + previewId);
    }).on('filebatchuploadcomplete', function(event, preview, config, tags, extraData) {
        console.log('File Batch Uploaded', preview, config, tags, extraData);
    });
  
  $('#addVideoBtn, .video-upload .upload-area, .video-upload .file-preview').on('click', function (e) {
  // 如果點到的是影片預覽區，就不要觸發
  if (
    $(e.target).closest('.kv-file-content, .kv-file-remove, .kv-file-upload, .kv-file-zoom, .fileinput-remove, .file-error-message').length > 0
  ) return;
  // 其他地方可以觸發開啟檔案選擇
  $('#input-video').trigger('click');
});

  // upload-area show / hidden
  function updateUploadAreaVisibility() {
      $(".upload-area").each(function () {
        const $uploadArea = $(this);
        // 找尋它後方的 .file-input-ajax-new（或用 parent/sibling 依結構調整）
        const hasInput = $uploadArea.nextAll(".file-input-ajax-new").length > 0;
        $uploadArea.toggle(!hasInput);
      });
    }

    // 初始執行
    updateUploadAreaVisibility();

    // 用 MutationObserver 偵測 DOM 變動
    const observer = new MutationObserver(updateUploadAreaVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

});