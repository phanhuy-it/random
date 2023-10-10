$(document).ready(function() {
    "use strict";
    $('#render-screen').click(function() {
        var thisType = $(this).attr('data-type');
        localStorage.setItem('random-type', thisType);

        if(thisType == 'number') {
            var fromNumber = $('#from-number').val();
            var toNumber = $('#to-number').val();
            localStorage.setItem('random-from', fromNumber);
            localStorage.setItem('random-to', toNumber);
        }
        if(thisType == 'name') {
            var listName = $('#list-name').val().split('\n');
            localStorage.setItem('list-name', listName);
        }
        

        var youtubeURL = $('#videoURL').val();
        var textColor = $('#textColor').val();
        var textStroke = $('#textStroke').val();
        localStorage.setItem('video-url', youtubeURL);
        localStorage.setItem('text-color', textColor);
        localStorage.setItem('text-stroke', textStroke);

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var widthRatio = localStorage.getItem('imageData-width');
        var heightRatio = localStorage.getItem('imageData-height');
        var tabWidth = windowWidth * 80 / 100;
        var tabHeight = tabWidth / parseInt(widthRatio) * parseInt(heightRatio);
        if(youtubeURL) {
            tabHeight = tabWidth * 720 / 1280;
        }
        var posLeft = (windowWidth - tabWidth) / 2;
        var posTop = (windowHeight - tabHeight) / 2;
        var tabOptions = 'location=yes, height=' + tabHeight + ', width=' + tabWidth + ', scrollbars=no, status=no, left=' + posLeft + ', top=' + posTop;
        if(thisType == 'number') {
            var urlLocation = './result_number.html';
        }
        if(thisType == 'name') {
            var urlLocation = './result_name.html';
        }
        window.open(urlLocation, '_blank', tabOptions);
    });






    //RANDOM NUMBER
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    if ($('#number-result').length) {
        var lengthNumber = 0;
        lengthNumber = localStorage.getItem('random-to').length;
        for (var i = 1; i <= lengthNumber; i++) {
            $('#number-result').append("<span>0</span>");
        }
        var countResult = 0;
        var flag = false;
        var intervalCount;
        var getFrom = parseInt(localStorage.getItem('random-from'));
        var getTo = parseInt(localStorage.getItem('random-to'));
        var result;
        var arrResult;
        document.onkeypress = function (e) {
            e = e || window.event;
            if(e.keyCode == 32 && $('#draw-screen #main').length) {
                if(flag == false) {
                    $('#number-result span:not(.rolling)').each(function(index, e) {
                       $(this).addClass('rolling');
                    });

                    intervalCount = setInterval(function() {
                        $('#number-result span.rolling').each(function(index, e) {
                            $(this).text(getRndInteger(0, 9));
                        });
                    }, 70);
                    result = getRndInteger(getFrom, getTo);
                    arrResult = result.toString().split("");
                    if(arrResult.length < getTo.toString().length) {
                        arrResult.unshift('0');
                    }
                    flag = true;
                } else {
                    countResult++;
                    if(countResult <= lengthNumber) {
                        $('#number-result span.rolling:nth-child('+countResult+')').removeClass('rolling').text(arrResult[countResult-1]);
                    } else {
                        flag = false;
                        countResult = 0;
                        clearInterval(intervalCount);
                        $('#number-result span:not(.rolling)').text(0);
                    }
                }
            }
        };
    }
    

    //RANDOM NAME
    if ($('#name-result').length) {
        var getListName = localStorage.getItem('list-name').split(',');
        var getLengthArray = getListName.length;
        var flag = 0;
        var intervalCount;
        
        document.onkeypress = function (e) {
            e = e || window.event;
            if(e.keyCode == 32 && $('#draw-screen #main').length) {
                if(flag == 0) {
                    intervalCount = setInterval(function() {
                        var getIndex = getRndInteger(0, getLengthArray);
                        var getName = getListName[getIndex];
                        var getArrName = getName.split('_');
                        $('#name-result .satulation').text(getArrName[0]);
                        $('#name-result .name').text(getArrName[1]);
                        $('#name-result .position').text(getArrName[2]);
                    }, 70);
                    flag += 1;
                } else {
                    if(flag == 1) {
                        clearInterval(intervalCount);
                        flag += 1;
                    } else {
                        $('#name-result .satulation').text('');
                        $('#name-result .name').text('');
                        $('#name-result .position').text('');
                        flag = 0;
                    }
                }
            }
        }
    }



    //SET STYLES
    function readURL(input, id) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#image-preview img').attr('src', e.target.result);
                $('#image-preview img').show(function() {
                    var imgWidth = $('#image-preview img').width();
                    var imgHeight = $('#image-preview img').height();
                    localStorage.setItem('imageData', e.target.result);
                    localStorage.setItem('imageData-width', imgWidth);
                    localStorage.setItem('imageData-height', imgHeight);
                });
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#input-image').on('change', function() {
        var id = $(this).attr('file-id');
        readURL(this, id);
    });
    if($('#image-preview').length && localStorage.getItem('imageData')) {
        $('#image-preview').find('img').show().attr('src', localStorage.getItem('imageData'));
    }
    if($('#videoURL').length && localStorage.getItem('video-url')) {
        $('#videoURL').val(localStorage.getItem('video-url'));
    }
    if($('#textColor').length && localStorage.getItem('text-color')) {
        $('#textColor').val(localStorage.getItem('text-color'));
    }
    if($('#textStroke').length && localStorage.getItem('text-stroke')) {
        $('#textStroke').val(localStorage.getItem('text-stroke'));
    }
    if($('#from-number').length && localStorage.getItem('random-from')) {
        $('#from-number').val(localStorage.getItem('random-from'));
    }
    if($('#to-number').length && localStorage.getItem('random-to')) {
        $('#to-number').val(localStorage.getItem('random-to'));
    }
    if($('#list-name').length && localStorage.getItem('list-name')) {
        $('#list-name').val(localStorage.getItem('list-name').replace(/,/g, "\n"));
    }
    if ($('#draw-screen #main').length) {
        var background = localStorage.getItem('imageData');
        if(!localStorage.getItem('video-url')) {
            $('#draw-screen #main').css('background-image', 'url("' + background + '")');
        }
        if(localStorage.getItem('text-stroke') && localStorage.getItem('text-color')) {
            var strokeColor = localStorage.getItem('text-stroke');
            var textColor = localStorage.getItem('text-color');
            if(localStorage.getItem('random-type') == 'number') {
                $('#number-result').css({
                    'text-shadow' : '0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor,
                    'color' : '#'+textColor
                });
            }
            if(localStorage.getItem('random-type') == 'name') {
                $('#name-result').css({
                    'text-shadow' : '0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor+', 0px 0px 1px #'+strokeColor,
                    'color' : '#'+textColor
                });
            }
        }
    }
});