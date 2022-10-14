$(document).ready(function() {
  $('.navbar-menu').hover(
    function() {
      const icon = $(this).find('i');
      icon.addClass('hovering');
    }, function() {
      const icon = $(this).find('i');
      icon.removeClass('hovering');
    }
  );

  $('.navbar-menu').click(function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('#tweet-text').focus();
  });
});