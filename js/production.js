function ouibounce(el, custom_config) {
  "use strict";

  var config     = custom_config || {},
    aggressive   = config.aggressive || false,
    sensitivity  = setDefault(config.sensitivity, 20),
    timer        = setDefault(config.timer, 1000),
    delay        = setDefault(config.delay, 0),
    callback     = config.callback || function() {},
    cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
    cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
    cookieName   = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
    sitewide     = config.sitewide === true ? ';path=/' : '',
    _delayTimer  = null,
    _html        = document.documentElement;

  function setDefault(_property, _default) {
    return typeof _property === 'undefined' ? _default : _property;
  }

  function setDefaultCookieExpire(days) {
    // transform days to milliseconds
    var ms = days*24*60*60*1000;

    var date = new Date();
    date.setTime(date.getTime() + ms);

    return "; expires=" + date.toUTCString();
  }

  setTimeout(attachOuiBounce, timer);
  function attachOuiBounce() {
    if (isDisabled()) { return; }

    _html.addEventListener('mouseleave', handleMouseleave);
    _html.addEventListener('mouseenter', handleMouseenter);
    _html.addEventListener('keydown', handleKeydown);
  }

  function handleMouseleave(e) {
    if (e.clientY > sensitivity) { return; }

    _delayTimer = setTimeout(fire, delay);
  }

  function handleMouseenter() {
    if (_delayTimer) {
      clearTimeout(_delayTimer);
      _delayTimer = null;
    }
  }

  var disableKeydown = false;
  function handleKeydown(e) {
    if (disableKeydown) { return; }
    else if(!e.metaKey || e.keyCode !== 76) { return; }

    disableKeydown = true;
    _delayTimer = setTimeout(fire, delay);
  }

  function checkCookieValue(cookieName, value) {
    return parseCookies()[cookieName] === value;
  }

  function parseCookies() {
    // cookies are separated by '; '
    var cookies = document.cookie.split('; ');

    var ret = {};
    for (var i = cookies.length - 1; i >= 0; i--) {
      var el = cookies[i].split('=');
      ret[el[0]] = el[1];
    }
    return ret;
  }

  function isDisabled() {
    return checkCookieValue(cookieName, 'true') && !aggressive;
  }

  // You can use ouibounce without passing an element
  // https://github.com/carlsednaoui/ouibounce/issues/30
  function fire() {
    if (isDisabled()) { return; }

    if (el) { el.style.display = 'block'; }

    callback();
    disable();
  }

  function disable(custom_options) {
    var options = custom_options || {};

    // you can pass a specific cookie expiration when using the OuiBounce API
    // ex: _ouiBounce.disable({ cookieExpire: 5 });
    if (typeof options.cookieExpire !== 'undefined') {
      cookieExpire = setDefaultCookieExpire(options.cookieExpire);
    }

    // you can pass use sitewide cookies too
    // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
    if (options.sitewide === true) {
      sitewide = ';path=/';
    }

    // you can pass a domain string when the cookie should be read subdomain-wise
    // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
    if (typeof options.cookieDomain !== 'undefined') {
      cookieDomain = ';domain=' + options.cookieDomain;
    }

    if (typeof options.cookieName !== 'undefined') {
      cookieName = options.cookieName;
    }

    document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

    // remove listeners
    _html.removeEventListener('mouseleave', handleMouseleave);
    _html.removeEventListener('mouseenter', handleMouseenter);
    _html.removeEventListener('keydown', handleKeydown);
  }

  return {
    fire: fire,
    disable: disable,
    isDisabled: isDisabled
  };
}

/*exported ouibounce */

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
    $('.who__video--teaser1, .who__video--teaser2, .who__video--teaser3').addClass('hide');
    $(this).fadeOut();
    $('.who__content').addClass('hide').fadeOut(500, function() {
      $('.who__video--teaser1, .who__video--teaser2, .who__video--teaser3').addClass('hidden');
      $('.who__video').addClass('playing').delay(500, function() {
        $('<script src="//fast.wistia.com/embed/medias/l1y8am3749.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_embed wistia_async_l1y8am3749 seo=false" style="height:360px;width:640px">&nbsp;</div>').insertAfter('.who-start');
      });
    });
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
    $('#quiz-advance').text('That was easy, next question!').blur();
    return false;
  });
  $(document).on('click', '.step1 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step1').addClass('step2');
    $('#quiz-advance').text('What’s next?').blur();
    return false;
  });
  $(document).on('click', '.step2 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step2').addClass('step3');
    $('#quiz-advance').text('You’re almost there!').blur();
    return false;
  });
  $(document).on('click', '.step3 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step3').addClass('step4');
    $('#quiz-advance').text('One more question!').blur();
    return false;
  });
  $(document).on('click', '.step4 #quiz-advance', function() {
    $('.quiz-steps').removeClass('step4').addClass('step5');
    $('#quiz-advance').text('You made it!').blur();
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


  window.videot1 = function () {
    $('.who__video--teaser2').fadeIn(function() {
      setTimeout(function() {window.videot2();}, 1500);
    });
  }
  window.videot2 = function () {
    $('.who__video--teaser3').fadeIn(function() {
      setTimeout(function() {window.videot3();}, 1500);
    });
  }
  window.videot3 = function () {
    $('.who__video--teaser1').fadeIn(function() {
      $('.who__video--teaser2, .who__video--teaser3').fadeOut(function() {
        setTimeout(function() {window.videot1();}, 1500);
      });
    });
  }
  setTimeout(function() {window.videot1();}, 1500)

});
