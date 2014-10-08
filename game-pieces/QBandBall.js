var gameOptions = {
  width: $(window).width(),
  height: $(window).height()
};

var notThrown = true;

$(document).ready(function(){

  // percent change for background image moving
  var percentChange = function(num1, num2) {
    var diff = num1 - num2;
    return (diff/$('.gameBoard').height()) * 100;
  };

  // makes sure you can only throw once

/**************************************/           // TODO: zip ball, score touchdown
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
    $('.lobBall, .zipBall').css('-webkit-transform', 'rotateX(0deg)')
    .height('4.5%').width('3%')
    .animate({
      left: startX + '%',
      top: startY + '%'
    }, 400)
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
  $('.gameBoard').on('click', function(event) {
    $('.zipBall').hide();
    var x = event.clientX;
    var y = event.clientY;
    var startX = gameOptions.width * .505;
    var startY = gameOptions.height * .955;

    // var angle1 = Math.atan2(startX, startY - y)
    // var angle2 = Math.atan2(x - startX, y - startY)
    // var degree = (angle1 - angle2) *100;
    // console.log (x,y)
    // console.log (startX,startY)
    // console.log(startX, startY - y)
    // $('.lobBall').css('-webkit-transform', 'rotate(' + degree + 'deg)')

    // set ball timing based on distance thrown
    // broken up into thirds of the field
    var setBallDuration = function() {
      var start = 95;
      var ballTravel = y/gameOptions.height * 100;
      var distancePercent = start - ballTravel;
      if (distancePercent < 33) {
        return [105, 800];
      } else if (distancePercent < 66 && distancePercent > 33) {
        return [135, 1000];
      } else {
        return [160, 1200];
      }
    }

    // Use this code for resize ball animation
    var ballHeight = gameOptions.height * .045;
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
          increment--;
          if (increment > count/2) {
            ballXrotation += .5;
            ballHeight += .3;
            ballWidth += .2;
            $('.lobBall').css('-webkit-transform', 'rotateX(' + ballXrotation + 'deg)');
          } else {
            ballXrotation -= 1;
            ballHeight -= .3;
            ballWidth -= .2;
            $('.lobBall').css('-webkit-transform', 'rotateX(' + ballXrotation + 'deg)');
          }
          $('.lobBall').css({height: ballHeight, width: ballWidth});
        },
        done: function(event) {

          var LWOHit = $(this).collision(".LWO");
          var RWOHit = $(this).collision(".RWO");
          var SLOTHit = $(this).collision(".SLOT");
          // logic for moving background image
          var gameboardHeight = $('.gameBoard').height();
          var diff = percentChange(startY, event.elem.offsetTop);
          var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
          var newBackgroundPosition = currentYPercent - diff/2 < 0 ? 0 : currentYPercent - diff/2;


          if (LWOHit.length > 0) {
            var currentLWOposition = $('.LWO').position();

          // console.log('start: ',startY)
          // console.log('ball land: ', event.elem.offsetTop)
          // console.log('diff: ',diff)
          // console.log('currentYPercent: ', currentYPercent)
          // console.log('new position %: ', newBackgroundPosition)
            $('.LWO').stop(true, false).animate({top: (event.tweens[1].end/gameboardHeight) * 100 - 3 + '%'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            // if ($('.lobBall')[0].offsetTop < gameboardHeight * .359) {
            //   $('.touchdown').css({height: gameboardHeight * .3, width: $('.gameBoard').width() * .9}).offset({top: gameboardHeight * .2 - $('.touchdown').height()/2, left: $('.gameBoard').width() * .55 - $('.touchdown').width()/2}).show();
            // } else {
            // }
              
              $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentLWOposition.top - $('.caught').height()/4, left: currentLWOposition.left - $('.caught').width()/4}).show();
              setTimeout(function(){$('.caught').hide()}, 400);

            // handles reseting play
            setTimeout(function(){ 
              $('.gameBoard').animate({
                'background-position-x': '50%', 
                'background-position-y': newBackgroundPosition + '%' 
              }, 2000);

              $('.RWO').stop(true, false);
              $('.SLOT').stop(true, false);

              // handles placing receivers up until we reach the end of the field
              // then places them incrementally closer to the end zone
              // if (true) {
                placeqb(48, 94);
                placeball(49, 92);
                leftWideOut(2000, 10, 92);
                rightWideOut(2000, 85, 92);
                generateSLOTposition();
                slot(2000, SLOTposition[position], 93); 
              // } 
              // else { // RED ZONE LOGIC
                
              //   placeball(49, ($('.lobBall').position().left/gameOptions.width) * 100)
              // }

            }, 1000);

          } else if (RWOHit.length > 0) {
            var currentRWOposition = $('.RWO').position();
            $('.RWO').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            // if ($('.lobBall')[0].offsetTop < gameboardHeight * .359) {
            //   $('.touchdown').css({height: gameboardHeight * .3, width: $('.gameBoard').width() * .9}).offset({top: gameboardHeight * .2 - $('.touchdown').height()/2, left: $('.gameBoard').width() * .55 - $('.touchdown').width()/2}).show();
            // } else {
            // }
              $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentRWOposition.top - $('.caught').height()/4, left: currentRWOposition.left - $('.caught').width()/4}).show();
              setTimeout(function(){$('.caught').hide()}, 400);

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
            // if ($('.lobBall')[0].offsetTop < gameboardHeight * .359) {
            //   $('.touchdown').css({height: gameboardHeight * .3, width: $('.gameBoard').width() * .9}).offset({top: gameboardHeight * .2 - $('.touchdown').height()/2, left: $('.gameBoard').width() * .55 - $('.touchdown').width()/2}).show();
            // } else {
            // }
              $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentSLOTposition.top - $('.caught').height()/4, left: currentSLOTposition.left - $('.caught').width()/4}).show();
              setTimeout(function(){$('.caught').hide()}, 400);

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
            $('.lobBall').animate({top: event.tweens[1].end - 8 + 'px', left: event.tweens[0].end + 1 + 'px'}, 400);
            $('.LWO').stop(true, false).animate({top: $('.LWO')[0].offsetTop - 10, left: $('.LWO')[0].offsetLeft + 15}, 800);
            $('.RWO').stop(true, false).animate({top: $('.RWO')[0].offsetTop - 6, left: $('.RWO')[0].offsetLeft - 15}, 800);
            $('.SLOT').stop(true, false).animate({top: $('.SLOT')[0].offsetTop - 7, left: $('.SLOT')[0].offsetLeft}, 800);

            setTimeout(function(){

              placeqb(48, 94);
              placeball(49, 92);
              leftWideOut(2000, 10, 92);
              rightWideOut(2000, 85, 92);
              generateSLOTposition();
              slot(2000, SLOTposition[position], 93); 

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
    // $('.zipBall').mousedown(function (event) {
    //     startDownX = event.pageX;
    //     startDownY = event.pageY;
    // });
        
    // $('.gameBoard').on('mouseup', function(event){
       
    //     var rise = -(event.pageY - startDownY); /* Page Origin is different from graph */
    //     var run = event.pageX - startDownX;
    //     var newX = $('.zipBall').position().left;
    //     var newY = $('.zipBall').position().top;
    //     var distanceToFling = 100;

    //     if (run == 0 || Math.abs(rise/run) > 3) {
    //         if (rise > 0) {
    //           newY -= distanceToFling;
    //         } else if (rise < 0) {
    //           newY += distanceToFling;
    //         }
    //     }
    //     else {
    //         if (run > 0) {
    //             newX += distanceToFling;
    //             newY -= (rise/run) * distanceToFling;
    //         }
    //         else {
    //             newX -= distanceToFling;
    //             newY += (rise/run) * distanceToFling;
    //         }
    //     }
       
    //      $('.zipBall').animate({
    //          left: newX,
    //          top: newY
    //         }, 1000);
    // });





});