$(function(){

    $('body').removeClass('no-js');
    
    
// ---------------------------------------------------------
//
//    YOMEI
//
//---------------------------------------------------------
    
    $('.contents').each(function(){
        
    
//    変数準備
//----------------------------------------------------------
        
        
            //form用
        var $contents = $(this),
            $contentsBody = $contents.find('.contents-body'),
            $logoSvg = $contents.find('.logo-svg'),
            $logoSvgBody = $logoSvg.find('.logo-svg-body'),
            $yomeiTime = $contents.find('.yomei-time'),
            $form = $contents.find('.form-01'),
            $formBody = $form.find('.form-01-body'),
            $formSex = $form.find('[name=check]'),
            $formAge = $form.find('#age'),
            $go = $form.find('.go'),
            $fallItem = $contents.find('.fall-item'),
            $scale = $contents.find('.scale li'),
            $field = $contents.find('.field'),
            $twBtn = $contents.find('.tw'),
            $easing = 'easeOutExpo',

            windowHeight = $(window).height(),
            
            //form用
            formAgeVal,

            //countDown関数用
            clock = [],
            minutesLength,
            secondesLength,
            timer,

            //厚生労働省 平成25年 簡易生命表 男・女
            selectDate = [],
            lifeValueM = {
                1: 79.39,
                2: 78.41,
                3: 77.43,
                4: 76.44,
                5: 75.45,
                6: 74.46,
                7: 73.47,
                8: 72.47,
                9: 71.48,
                10: 70.49,
                11: 69.49,
                12: 68.50,
                13: 67.50,
                14: 66.51,
                15: 65.52,
                16: 64.53,
                17: 63.54,
                18: 62.56,
                19: 61.58,
                20: 60.61,
                21: 59.64,
                22: 58.67,
                23: 57.70,
                24: 56.74,
                25: 55.77,
                26: 54.80,
                27: 53.83,
                28: 52.86,
                29: 51.90,
                30: 50.93,
                31: 49.96,
                32: 48.99,
                33: 48.02,
                34: 47.06,
                35: 46.09,
                36: 45.12,
                37: 44.16,
                38: 43.20,
                39: 42.24,
                40: 41.29,
                41: 40.33,
                42: 39.38,
                43: 38.43,
                44: 37.49,
                45: 36.55,
                46: 35.61,
                47: 34.68,
                48: 33.76,
                49: 32.84,
                50: 31.92,
                51: 31.01,
                52: 30.11,
                53: 29.21,
                54: 28.32,
                55: 27.44,
                56: 26.57,
                57: 25.70,
                58: 24.84,
                59: 23.98,
                60: 23.14,
                61: 22.30,
                62: 21.48,
                63: 20.67,
                64: 19.87,
                65: 19.08,
                66: 18.30,
                67: 17.53,
                68: 16.77,
                69: 16.02,
                70: 15.28,
                71: 14.55,
                72: 13.83,
                73: 13.12,
                74: 12.42,
                75: 11.74,
                76: 11.07,
                77: 10.42,
                78: 9.79,
                79: 9.18,
                80: 8.61,
                81: 8.05,
                82: 7.53,
                83: 7.04,
                84: 6.56,
                85: 6.12,
                86: 5.69,
                87: 5.29,
                88: 4.92,
                89: 4.58,
                90: 4.26,
                91: 3.95,
                92: 3.67,
                93: 3.41,
                94: 3.17,
                95: 2.94,
                96: 2.73,
                97: 2.53,
                98: 2.35,
                99: 2.18
            },
            lifeValueW = {
                1: 85.78,
                2: 84.81,
                3: 83.82,
                4: 82.83,
                5: 81.84,
                6: 80.85,
                7: 79.85,
                8: 78.86,
                9: 77.86,
                10: 76.87,
                11: 75.87,
                12: 74.88,
                13: 73.88,
                14: 72.88,
                15: 71.89,
                16: 70.90,
                17: 69.91,
                18: 68.91,
                19: 67.92,
                20: 66.94,
                21: 65.95,
                22: 64.97,
                23: 63.98,
                24: 63.00,
                25: 62.01,
                26: 61.03,
                27: 60.04,
                28: 59.06,
                29: 58.07,
                30: 57.09,
                31: 56.11,
                32: 55.13,
                33: 54.15,
                34: 53.17,
                35: 52.19,
                36: 51.22,
                37: 50.24,
                38: 49.27,
                39: 48.29,
                40: 47.32,
                41: 46.35,
                42: 45.38,
                43: 44.42,
                44: 43.45,
                45: 42.49,
                46: 41.54,
                47: 40.58,
                48: 39.63,
                49: 38.69,
                50: 37.74,
                51: 36.80,
                52: 35.86,
                53: 34.93,
                54: 34.00,
                55: 33.07,
                56: 32.14,
                57: 31.22,
                58: 30.30,
                59: 29.38,
                60: 28.47,
                61: 27.56,
                62: 26.65,
                63: 25.75,
                64: 24.86,
                65: 23.97,
                66: 23.09,
                67: 22.21,
                68: 21.33,
                69: 20.46,
                70: 19.59,
                71: 18.74,
                72: 17.89,
                73: 17.05,
                74: 16.21,
                75: 15.39,
                76: 14.59,
                77: 13.80,
                78: 13.02,
                79: 12.26,
                80: 11.52,
                81: 10.81,
                82: 10.12,
                83: 9.45,
                84: 8.81,
                85: 8.19,
                86: 7.59,
                87: 7.03,
                88: 6.49,
                89: 5.99,
                90: 5.53,
                91: 5.10,
                92: 4.70,
                93: 4.33,
                94: 3.98,
                95: 3.66,
                96: 3.36,
                97: 3.08,
                98: 2.82,
                99: 2.58
            },
            
            icon = [
                'fa-heart',
                'fa-heart-o',
                'fa-heartbeat'
            ];


    //    イベントの登録
    //----------------------------------------------------------
        
        //初期位置の設定
        $contents.css({'height': windowHeight});

            for(var i = 0; i < 10; i++){
                $scale.eq(i).css({
                    'top': i + '0' + '%'
                });
            }
        
        
        //form reset
        $form.find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
        
        //form desabled
        $form.on('change', function(){
            
            formAgeVal = Number($formAge.val());
            var ageStr = String(formAgeVal);
            
            if(($formSex.filter(':checked').val() === 'male' || $formSex.filter(':checked').val() === 'female' )&& ageStr.match(/[1-9][1-9]?/)){
                $go.removeAttr('disabled');
            } else {
                $go.attr('disabled', 'disabled');
            }
        });
        
//        fall-item randam
        setInterval(function(){
            var i = icon.length,
                r = Math.floor(Math.random()*i);
            
            $fallItem.removeClass(function(index, className){
                return (className.match(/\bfa-\S+/g) || []).join();
            });
            $fallItem.addClass(icon[r]);
        },6000);

        //決定をクリックしたら実行
        $go.on('click', function(){

            selectDate[0] = $formSex.filter(':checked').val();
            selectDate[1] = formAgeVal;
            
            if(selectDate[0] === 'male'){
                selectDate[2] = lifeValueM[selectDate[1]];
            } else if(selectDate[0] === 'female'){
                selectDate[2] = lifeValueW[selectDate[1]];
            }

            //phase1 animate関数実行
            phase1();
        });
        

    //    関数の登録
    //----------------------------------------------------------
        
        function phase1(){
            
            $contentsBody.animate({
                'top': -windowHeight
            },1300, 'easeInOutBack').delay(1000).animate({
                'top': 0,
                'opacity': 0
            },0);
            
            $form.fadeOut(1000);
            
            phase2();
        }
        
        function phase2(){
        
            $field.css({
                'bottom': -selectDate[1] + '%',
                'height': selectDate[1] + '%'
            });
            
            setTimeout(function(){
                
                $contentsBody.css({
                    'width': '99%'
                });
                
                $logoSvg.addClass('logo-svg-phase2');

                $yomeiTime.addClass('yomei-time-phase2');

                phase3();
                
            },1500);
        }
        
        function phase3(){
            
            setTimeout(function(){
                $fallItem.fadeIn();
                
                $scale.delay(3600).animate({
                    'left': 0
                }, 500, $easing);
                
                $field.delay(4100).animate({
                    'bottom': 0
                }, 500, $easing);
                
                $contentsBody.delay(4800).animate({
                   'opacity': 1
                }, 600, $easing);
                
                $yomeiTime.delay(4800).animate({
                   'opacity': 1
                }, 600, $easing);
                
                $twBtn.css({'top': '10px'}).delay(5300).animate({
                    'opacity': 1
                }, 600, $easing);
                
                //countStart関数実行
                countStart();
                
            }, 600);
            
        }
    
        function countStart(){
            
            var yomeiTime = Math.round(selectDate[2] * (365 * 24)),
                minutes = 0,
                secondes = 0;

            //timerのリセットと実行
            tw();
            countDown();
            stopTimer();
            startTimer();
            
            function tw(){
                var twSrc = '<a href="https://twitter.com/share" class="twitter-share-button"data-url="http://ebiallergy.github.io/yomei/" data-text="あなたの余命は後' + yomeiTime + '時間です。" data-size="large" data-hashtags="yomei">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>';
                $twBtn.prepend(twSrc);
            }

            function countDown(){
                minutesLength = String(minutes).length;
                secondesLength = String(secondes).length;

                if(minutesLength === 1){
                    minutes = '0' + minutes;
                }
                if(secondesLength === 1){
                    secondes = '0' + secondes;
                }
                clock = [yomeiTime, minutes, secondes];
                $yomeiTime.text(clock[0] + ':' + clock[1] + ':' + clock[2]);
            }

            function startTimer(){
                timer = setInterval(function(){

                    if(minutes === '00'){
                        minutes = 60;
                        yomeiTime--;
                    }
                    if(secondes === '00'){
                        secondes = 60;
                        minutes--;
                    }

                    secondes--;
                    countDown();
                }, 1000);
            }

            function stopTimer(){
                clearInterval(timer);
            }
        }
    });
    
    //twitter js
//    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

});