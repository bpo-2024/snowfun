$(document).ready(function () {
    $("#file-upload-image").fileinput({
      theme: "explorer",
      uploadUrl: "/",
      language: "zh-TW",
      showRemove: false,
      overwriteInitial: false,
      initialPreviewAsData: true,
      initialPreview: [],
      initialPreviewConfig: [],
      dropZoneTitle: "將照片拖曳至此上傳或點擊此處選擇照片",
      maxFileCount: 3, // Limit to 3 files
      maxFileSize: 6000, // Set file size limit to 6000 KB (6 MB)
      msgFilesTooMany:
        "您選擇的檔案數量 ({n}) 超過了上限 {m}。檔案上限為3個。",
      msgSizeTooLarge:
        '檔案 "{name}" (大小: {size} KB) 超過了允許的最大大小 {maxSize} KB。檔案請小於6000 KB。',
      msgUploadError: "上傳錯誤",
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
