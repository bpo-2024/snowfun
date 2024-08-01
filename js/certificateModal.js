$(function() {     
  $('a.thumbnail').click(function(e) {
    e.preventDefault();
    $('#certificate-modal .modal-body img').attr('src', $(this).find('img').attr('src'));
    $("#certificate-modal").modal('show');
  });
  $('#certificate-modal .modal-body img').on('click', function() {
    $("#certificate-modal").modal('hide')
  });
});
