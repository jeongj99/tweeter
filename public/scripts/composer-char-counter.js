/*
jquery that updates the character count based on what written in the text area
Additionally, color changes  to red when counter is negative
*/
$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const txt = $(`#${this.id}`);
    const length = txt.val().length;
    const counter = txt.parent('form').find('.counter').val(140 - length);
    if (counter.val() < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '');
    }
  });
});
