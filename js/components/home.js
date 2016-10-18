jQuery(function($) {



  var distance = $('header').offset().top,
    $window = $(window);

  $window.scroll(function() {
    if ( $window.scrollTop() > distance ) {
      $('header').addClass('fixed');
    } else {
      $('header').removeClass('fixed');
    }
  });

  $(document).on('click', '.who-start', function() {
    $('<script src="//fast.wistia.com/embed/medias/l1y8am3749.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_embed wistia_async_l1y8am3749 seo=false" style="height:360px;width:640px">&nbsp;</div>').insertAfter('.who-start');
    $(this).fadeOut();
    return false;
  });

  $(document).on('click', '.the313-open', function() {
    $('.the313-modal.modal-primary').addClass('visible');
    return false;
  });

  /*$(document).on('click', '.course-open', function() {
    $('.course-modal').addClass('visible');
    return false;
  });*/

  $(document).on('click', '.mediaroom-open', function() {
    $('.mediaroom-modal').addClass('visible');
    return false;
  });

  $(document).on('click', '.doneforyou-open', function() {
    $('.doneforyou-modal').addClass('visible');
    return false;
  });

  $(document).on('click', '.modal-close', function() {
    $('.modal-primary, .mediaroom-modal, .doneforyou-modal').removeClass('visible');
    $('.modal-exit').css('display', 'none');
    return false;
  });

  $(document).on('click', '.modal-button-pre', function() {
    $('.the313-modal#ouibounce-modal').addClass('alt');
    $('._x95872642 input').focus();
    return false;
  });

  $(document).on('click', '.step0 #quiz-advance-first', function() {
    $('.quiz-steps').removeClass('step0').addClass('step1');
    return false;
  });
  $(document).on('click', '.step1 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step1').addClass('step2');
    $('#quiz-advance').blur();
    return false;
  });
  $(document).on('click', '.step2 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step2').addClass('step3');
    $('#quiz-advance').blur();
    return false;
  });
  $(document).on('click', '.step3 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step3').addClass('step4');
    $('#quiz-advance').blur();
    return false;
  });
  $(document).on('click', '.step4 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step4').addClass('step5');
    $('#quiz-advance').blur();
    return false;
  });
  $(document).on('click', '.step5 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step5').addClass('step6');
    $('._x06894421 input').focus();
    return false;
  });


  var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
    aggressive: true,
    timer: 0
  });

});
