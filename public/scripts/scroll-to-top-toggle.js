/* 
jQuery script for the navbar background color (if display is less than 1024 px)
jQuery script that shows a button when you scroll down and when clicked, it scroll to the top
*/
$(document).ready(function() {
  $(this).scroll(function() {
    const navbar = $(this).find('.navbar-top');
    const scrollUp = $(this).find('#scroll-up');
    navbar.toggleClass('scrolled', $(this).scrollTop() > navbar.height()); // Adds class scrolled depending on the condition
    if ($(this).scrollTop() > 0) {
      scrollUp.removeClass('hidden'); // Removing the class hidden causes the button to show
    } else {
      scrollUp.addClass('hidden'); // Adding the class hidden causes the button to disappear
    }
  });

  // On click, the page scrolls to the top in animated manner
  $('#scroll-up').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });
});