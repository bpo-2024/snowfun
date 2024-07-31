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
