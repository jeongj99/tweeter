$(document).ready(function() {
  $(this).scroll(function() {
    const navbar = $(this).find('.navbar-top');
    const scrollUp = $(this).find('#scroll-up');
    navbar.toggleClass('scrolled', $(this).scrollTop() > navbar.height());
    if ($(this).scrollTop() > 0) {
      scrollUp.removeClass('hidden');
    } else {
      scrollUp.addClass('hidden');
    }
  });

  $('#scroll-up').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });
});