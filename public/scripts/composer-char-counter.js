$(document).ready(function() {
  $('#tweet-text').on('input', (event) => {
    let charCount = 140 - $('#tweet-text').val().length;
    $('.counter').val(charCount);
    if (charCount < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });

});
