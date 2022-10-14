/*
jquery that updates the character count based on what is written in the text area
Additionally, color changes  to red when counter is negative
*/
$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const txt = $(`#${this.id}`);
    const length = txt.val().length;
    const counter = txt.parent('form').find('.counter').val(140 - length);
    counter.toggleClass('invalidCount', counter.val() < 0);
  });
});
