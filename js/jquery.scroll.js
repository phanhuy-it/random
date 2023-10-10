// ANCHOR IN PAGE
$(window).bind('load', function() {
    "use strict";
    $(function() {
        $('a[href^="#"]').click(function() {
            if ($($(this).attr('href')).length) {
                var p = $($(this).attr('href')).offset();
                if ($(window).width() > 640) {
                    $('html,body').animate({ scrollTop: p.top - 0 }, 400);
                } else {
                    $('html,body').animate({ scrollTop: p.top - 60 }, 400);
                }
            }
            if($('#menu_icon').hasClass('open')) {
                $('#menu_icon').trigger('click');
            }
            return false;
        });
    });
});

// ANCHOR FROM OTHER PAGE
$(window).bind('load', function() {
    "use strict";
    var hash = location.hash;
    if (hash && $(hash).length > 0) {
        var p1 = $(hash).offset();
        if ($(window).width() > 640) {
            $('html,body').animate({ scrollTop: p1.top - 0 }, 400);
        } else {
            $('html,body').animate({ scrollTop: p1.top - 60 }, 400);
        }
    }
});

//BACK TO TOP
$(document).ready(function() {
    "use strict";
    $('#back_to_top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });
});
$(window).bind('load scroll', function() {
    "use strict";
    if($(this).scrollTop() >= 1000) {
        $('#back_to_top').addClass('show');
    } else {
        $('#back_to_top').removeClass('show');
    }
});