/*-- Boostrap JS --*/

$(function(){

  $('img').addClass('img-responsive');
  $('iframe').parent().addClass('embed-responsive embed-responsive-16by9');
  $('iframe').addClass('embed-responsive-item');
  $('.carousel').carousel({
    interval: 6000,
    pause: "hover"
  });

  $('.carousel-inner').children('.item:first-child').addClass('active');

  $('.slide').each(function(i) {
    $(this).attr('id', 'id_' + i).appendTo(this);
    $('a.left.carousel-control').attr('href', '#id_' + i);
    $('a.right.carousel-control').attr('href', '#id_' + i);
  });

  $('.carousel-indicators > li').first().addClass('active');

  $('.carousel-inner').each(function() {
    if ($(this).children('.item').length === 1) {
      $('.carousel-control').remove();
    }
  });

});

/*-- custom JS --*/

$(function(){

  $('a.smooth').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  if( $('.submenu > li').hasClass('active') ){
    var $this = $(this);

    console.log('this');
    $('.submenu').addClass('test');
  }

});
