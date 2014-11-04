var gameOptions = {
  width: $(window).width(),
  height: $(window).height()
};

var notThrown = true;  // throw once


var percentChange = function(num1, num2) {
  var diff = num1 - num2;
  return (diff/$('.gameBoard').height()) * 100;
};

var zip = false;


$(document).ready(function(){


/**************************************/           // TODO: in the middle of the lob, the done method is being called
//                Q B                 //           
/**************************************/

  var placeqb = function(startX, startY) {
    $('.qb').animate({
      left: startX + '%',
      top: startY + '%'
    }, 400);
  };
  placeqb();

  var hikeqb = function(startX) {
    $('.qb').animate({
      top: startX + 1.5 + '%'
    })
  };



/**************************************/
//               B A L L              //
/**************************************/
  var placeball = function(startX, startY) {
    $('.lobBall, .zipBall').css({
      left: startX + '%',
      top: startY + '%'
    })
  }
  placeball(49, 92);

  var hikeball = function(startX, startY) {
    $('.lobBall, .zipBall').animate({
      left: startX + 1.5 + '%',
      top: startY + 3 + '%'
    })
  }


  $('#SLOTpreview').on('click', function() {
    hikeball(49, 92);
    hikeqb(94);
  })


  // throw ball to mouse on click
  // ball handles all collision logic
  $('.gameBoard').on('dblclick', function(event) {
    $('.zipBall').hide();
    var x = event.clientX;
    var y = event.clientY;
    var startX = gameOptions.width * .505;
    var startY = gameOptions.height * .955;

    var angle = Math.atan2(startX-x,startY-y)
    var degree = -angle * (180/Math.PI)
    $('.lobBall').css('-webkit-transform', 'rotate(' + degree + 'deg)')

    // set ball timing based on distance thrown
    // broken up into thirds of the field
    // ************************* BREAK THIS UP INTO SIXTHS *************************
    var setBallDuration = function() {
      var start = 95;
      var ballTravel = y/gameOptions.height * 100;
      var distancePercent = start - ballTravel;
      if (distancePercent < 20) {
        return [135, 1000];
      } else if (distancePercent < 40 && distancePercent > 20) {
        return [150, 1200];
      } else if (distancePercent < 60 && distancePercent > 40) {
        return [190, 1400];
      } else if (distancePercent < 80 && distancePercent > 60) {
        return [210, 1600];
      } else {
        return [230, 1800];
      }
    }

    // Use this code for resize ball animation
    var ballHeight = gameOptions.height * .04;
    var ballWidth = gameOptions.width * .03;
    var ballXrotation = 0;
    var count = setBallDuration()[0];
    var increment = count;


    // Lobbing the ball on click will only allow the receiver to catch it as the ball ends its animation
    var lobBall = function() {
      $('.lobBall').animate({
        left: x - $('.lobBall').width()/2 + 'px',
        top: y - $('.lobBall').height()/2  + 'px'
      }, {
        duration: setBallDuration()[1],

        // adjusts the size of the ball as it travels)
        step: function(ev) { 
          console.log('lobbed start')
          increment--;
          if (increment > count/2) { // mobile: 1.5, web: 2
            ballHeight += .5;
            ballWidth += .45;
          } else {
            ballHeight -= .5;
            ballWidth -= .45;
          }
          $('.lobBall').css({height: ballHeight, width: ballWidth});
        },
        done: function(event) {
          console.log('lobbed ball end')
          $('.lobBall').height(gameOptions.height * .04).width(gameOptions.width * .03).css('-webkit-transform', 'rotate(0deg)');
          var LWOHit = $(this).collision(".LWO");
          var RWOHit = $(this).collision(".RWO");
          var SLOTHit = $(this).collision(".SLOT");

          // logic for moving background image
          var gameboardHeight = $('.gameBoard').height();  // for scaling the background image
          var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
          var diff = percentChange(startY, event.elem.offsetTop);
          var newBackgroundPosition = currentYPercent - diff/2 < 0 ? 0 : currentYPercent - diff/2;


          if (LWOHit.length > 0) {
            var currentLWOposition = $('.LWO').position();

            // stops receiver and ball animation
            $('.LWO').stop(true, false).animate({top: (event.tweens[1].end/gameboardHeight) * 100 - 3 + '%'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            
            //signifies a catch
            $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentLWOposition.top - $('.caught').height()/4, left: currentLWOposition.left - $('.caught').width()/4}).show();
            setTimeout(function(){$('.caught').hide();}, 400);


            if ((currentYPercent.indexOf('.') > 0 || currentYPercent.length === 0) && currentLWOposition.top/gameboardHeight < .2) {
              $('.touchdown').show();
              setTimeout(function(){location.reload()}, 1500);
            } else if (currentYPercent.indexOf('%') > 0 && currentLWOposition.top/gameboardHeight < .25) {
              $('.touchdown').show();
              setTimeout(function(){location.reload()}, 1500);
            }


            // handles reseting play
            var resetLWO = function() { 
              $('.gameBoard').animate({
                'background-position-x': '50%', 
                'background-position-y': newBackgroundPosition + '%' 
              }, 2000);

              $('.RWO').stop(true, false);
              $('.SLOT').stop(true, false);


              placeqb(48, 94);
              placeball(49, 92);
              leftWideOut(2000, 10, 92);
              rightWideOut(2000, 85, 92);
              generateSLOTposition();
              slot(2000, SLOTposition[position], 93); 

            };

            setTimeout(resetLWO, 1000);

          } else if (RWOHit.length > 0) {
            var currentRWOposition = $('.RWO').position();
            $('.RWO').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);

            $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentRWOposition.top - $('.caught').height()/4, left: currentRWOposition.left - $('.caught').width()/4}).show();
            setTimeout(function(){$('.caught').hide()}, 400);

            if ((currentYPercent.indexOf('.') > 0 || currentYPercent.length === 0) && currentRWOposition.top/gameboardHeight < .2) {
              $('.touchdown').show();
              setTimeout(function(){location.reload()}, 1500);
            } else if (currentYPercent.indexOf('%') > 0 && currentRWOposition.top/gameboardHeight < .25) {
              $('.touchdown').show();
              setTimeout(function(){location.reload()}, 1500);
            }

            setTimeout(function(){

              $('.gameBoard').animate({
                'background-position-x': '50%', 
                'background-position-y': newBackgroundPosition + '%' 
              }, 2000);

              $('.LWO').stop(true, false);
              $('.SLOT').stop(true, false);

              placeqb(48, 94);
              placeball(49, 92);
              leftWideOut(2000, 10, 92);
              rightWideOut(2000, 85, 92);
              generateSLOTposition();
              slot(2000, SLOTposition[position], 93); 
            }, 1000);

          } else if (SLOTHit.length > 0) {
            var currentSLOTposition = $('.SLOT').position();
            $('.SLOT').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);

            $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentSLOTposition.top - $('.caught').height()/4, left: currentSLOTposition.left - $('.caught').width()/4}).show();
            setTimeout(function(){$('.caught').hide()}, 400);

            if ((currentYPercent.indexOf('.') > 0 || currentYPercent.length === 0) && currentSLOTposition.top/gameboardHeight < .2) {
              $('.touchdown').show();
              setTimeout(function(){location.reload()}, 1500);
            } else if (currentYPercent.indexOf('%') > 0 && currentSLOTposition.top/gameboardHeight < .25) {
              $('.touchdown').show();
              setTimeout(function(){location.reload()}, 1500);
            }

            setTimeout(function(){

              $('.gameBoard').animate({
                'background-position-x': '50%', 
                'background-position-y': newBackgroundPosition + '%' 
              }, 2000);

              $('.RWO').stop(true, false);
              $('.LWO').stop(true, false);

              placeqb(48, 94);
              placeball(49, 92);
              leftWideOut(2000, 10, 92);
              rightWideOut(2000, 85, 92);
              generateSLOTposition();
              slot(2000, SLOTposition[position], 93); 
            }, 1000);

          } else {
            var currentBallPosition = $('.lobBall').position();
            $('.incomplete').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentBallPosition.top - $('.lobBall').height() - 10, left: currentBallPosition.left - $('.lobBall').width() - 10}).show();
            setTimeout(function(){$('.incomplete').hide()}, 400);
            $('.lobBall').animate({top: event.tweens[1].end - 8 + 'px', left: event.tweens[0].end + 1 + 'px'}, 800);
            $('.LWO').stop(true, false).animate({top: $('.LWO')[0].offsetTop - 10, left: $('.LWO')[0].offsetLeft + 15}, 800);
            $('.RWO').stop(true, false).animate({top: $('.RWO')[0].offsetTop - 6, left: $('.RWO')[0].offsetLeft - 15}, 800);
            $('.SLOT').stop(true, false).animate({top: $('.SLOT')[0].offsetTop - 7, left: $('.SLOT')[0].offsetLeft}, 800);

            setTimeout(function(){

              placeqb(48, 94);
              placeball(49, 92);
              leftWideOut(800, 10, 92);
              rightWideOut(800, 85, 92);
              generateSLOTposition();
              slot(800, SLOTposition[position], 93); 

            }, 1000);
          }

          // Signals touchdown

          // setTimeout(function(){location.reload()}, 1000);
        }
      })
    }
    if (notThrown) {
      lobBall();
      notThrown = false;
    }
  });



  // zips ball in a straight on on flick
  // receiver can catch the ball anywhere in the line


  // ******************* FLICKING HAS ISSUES
  // ******************* ON RWO OR LWO CATCH, SLOT DOESN'T RESET
  // ******************* AFTER ONE INCOMPLETE, A LOB WILL TRIGGER INCOMPLETE FOR THE ZIPBALL TWICE




    $('.gameBoard').on('touchstart', function (event) {
      startDownX = event.originalEvent.touches[0].clientX;
      startDownY = event.originalEvent.touches[0].clientY;

      if (startDownX < gameOptions.width * .6 && startDownX > gameOptions.width * .4 && startDownY > gameOptions.height * .9 && startDownY < gameOptions.height) {
        var LWOtoggle = false;
        var RWOtoggle = false;
        var SLOTtoggle = false;
        $('.lobBall').hide();

        $('.gameBoard').on('touchend', function(ev){
          console.log(ev)
          var duration = 1200;
          var rise = -(ev.pageY - startDownY);
          var run = ev.pageX - startDownX;
          var newX = $('.zipBall').position().left;
          var newY = $('.zipBall').position().top;
          var distanceToFling = gameOptions.height;

          if (rise/run === Infinity) {
            duration = 500;
          } else if (Math.abs(rise/run) > 5) {
            duration = 2200;
          } 

          if (run == 0) {
            if (rise > 0) {
              newY -= distanceToFling;
            } 
          } else {
            if (run > 0) {
              newX += distanceToFling;
              newY -= (rise/run) * distanceToFling;
            }
            else {
              newX -= distanceToFling;
              newY += (rise/run) * distanceToFling;
            }
          }


          var angle = Math.atan2(startDownX - ev.offsetX, startDownY - ev.offsetY)
          var degree = -angle * (180/Math.PI)
          $('.zipBall').css('-webkit-transform', 'rotate(' + degree + 'deg)')
          

          var zipBall = function() {
          $('.zipBall').animate({
             left: newX,
             top: newY
            }, {
              duration: duration,
              step: function() {
                var LWOhit = $(this).collision('.LWO');
                var RWOhit = $(this).collision('.RWO');
                var SLOThit = $(this).collision('.SLOT');

                var gameboardHeight = $('.gameBoard').height(); 

                if (LWOhit.length > 0) {
                  var LWOposition = $('.LWO').position();
                  LWOtoggle = true;
                  $('.LWO').stop(true, false);
                  $('.zipBall').stop(true, true).animate({top: LWOposition.top, left: LWOposition.left}).css('-webkit-transform', 'rotate(0deg)');
                  $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: LWOposition.top - $('.caught').height()/4, left: LWOposition.left - $('.caught').width()/4}).show();
                  setTimeout(function(){$('.caught').hide()}, 400);
                }

                if (RWOhit.length > 0) {
                  var RWOposition = $('.RWO').position();
                  RWOtoggle = true;
                  $('.RWO').stop(true, false);
                  $('.zipBall').stop(true, true).animate({top: RWOposition.top, left: RWOposition.left}).css('-webkit-transform', 'rotate(0deg)');
                  $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: RWOposition.top - $('.caught').height()/4, left: RWOposition.left - $('.caught').width()/4}).show();
                  setTimeout(function(){$('.caught').hide()}, 400);

                }

                if (SLOThit.length > 0) {
                  var SLOTposition = $('.SLOT').position();
                  SLOTtoggle = true;
                  $('.SLOT').stop(true, false);
                  $('.zipBall').stop(true, true).animate({top: SLOTposition.top, left: SLOTposition.left}).css('-webkit-transform', 'rotate(0deg)');
                  $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: SLOTposition.top - $('.caught').height()/4, left: SLOTposition.left - $('.caught').width()/4}).show();
                  setTimeout(function(){$('.caught').hide()}, 400);

                }
              },
              done: function(x) {

                var gameboardHeight = $('.gameBoard').height();  // for scaling the background image
                var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
                var diff = percentChange(startDownY, ev.offsetY);
                
                var newBackgroundPosition = currentYPercent - diff/2 < 0 ? 0 : currentYPercent - diff/2;

                $('.LWO').stop(true, false);
                $('.RWO').stop(true, false);
                $('.SLOT').stop(true, false);

                if (LWOtoggle || RWOtoggle || SLOTtoggle) {
                  setTimeout(function(){ 

                    LWOtoggle = false;
                    RWOtoggle = false;
                    SLOTtoggle = false;

                    $('.gameBoard').animate({
                      'background-position-x': '50%', 
                      'background-position-y': newBackgroundPosition + '%' 
                    }, 2000);

                    placeqb(48, 94);
                    placeball(49, 92);
                    leftWideOut(2000, 10, 92);
                    rightWideOut(2000, 85, 92);
                    generateSLOTposition();
                    slot(2000, SLOTposition[position], 93); 

                  }, 1000);
                } else {
                  console.log('incomplete')
                }
                  
                }
            });
          }
          if (notThrown) {
            zipBall();
            notThrown = false;
          }
        });
        
      }
    });




        


});