var gameOptions = {
  width: $(window).width(),
  height: $(window).height()
};

$(document).ready(function(){

// percent change for background image moving
var percentChange = function(num1, num2) {
  var diff = num1 - num2;
  return (diff/$('.gameBoard').height()) * 100;
};

// makes sure you can only throw once
var notThrown = true;

/**************************************/           // TODO: apply after play logic to all receivers, make caught and incomplete signs scale with field, draw new routes, have slot start in position, zip ball, score touchdown
//                Q B                 //           
/**************************************/

  var placeqb = function() {
    $('.qb').css({
      position: 'absolute',
      height: $('.gameBoard').height() * .05,
      width: $('.gameBoard').width() * .06,
      left: 48 + '%',
      top: 94 + '%'
    });
    $('#SLOTpreview').on('click', function() {
      $('.qb').animate({
        top: 95.5 + '%'
      }, 400);
    });
  };
  placeqb();



/**************************************/
//               B A L L              //
/**************************************/
  var placeball = function() {
    $('.lobBall, .zipBall').css({
      position: 'absolute',
      height: $('.gameBoard').height() * .045,
      width: $('.gameBoard').width() * .03,
      left: 49 + '%',
      top: 92 + '%'
    });
    $('#SLOTpreview').on('click', function() {
      $('.lobBall, .zipBall').animate({
        left: 50.5 + '%',
        top: 95.5 + '%'
      }, 400)
    });    
  }
  placeball();



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

    }

    // Lobbing the ball on click will only allow the receiver to catch it as the ball ends its animation
    var ballSize = 0;
    var lobBall = function() {
      $('.lobBall').animate({
        left: x - $('.lobBall').width()/2 + 'px',
        top: y - $('.lobBall').height()/2  + 'px'
      }, {
        duration: 600,
        step: function() { // adjusts the size of the ball as it travels
          // if (ballSize < 40) {
          //   while (ballSize < 40)
          //     ballSize++;
          //     $('.lobBall').height(ballSize).width(ballSize);
          // } 
          // // else {
          // //   while (ballSize > 0) {
          // //     $('.lobBall').height(ballSize).width(ballSize);
          // //     ballSize--;
          // //   }
          // // }
        },
        done: function(event) {
          var LWOHit = $(this).collision(".LWO");
          var RWOHit = $(this).collision(".RWO");
          var SLOTHit = $(this).collision(".SLOT");
          // logic for moving background image
          var gameboardHeight = $('.gameBoard').height();
          var diff = percentChange(startY, event.elem.offsetTop);
          var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
          var newBackgroundPosition = currentYPercent - diff < 0 ? 0 : currentYPercent - diff;
          var test = event.elem.offsetTop;
          
          if (LWOHit.length > 0) {
            $('.LWO').stop(true, false).animate({top: (event.tweens[1].end/gameboardHeight) * 100 - 3 + '%'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            // if ($('.lobBall')[0].offsetTop < gameboardHeight * .359) {
            //   $('.touchdown').css({height: gameboardHeight * .3, width: $('.gameBoard').width() * .9}).offset({top: gameboardHeight * .2 - $('.touchdown').height()/2, left: $('.gameBoard').width() * .55 - $('.touchdown').width()/2}).show();
            // } else {
              $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12}).offset({top: event.elem.offsetTop - $('.caught').height()/2, left: event.elem.offsetLeft - $('.caught').width()/2}).show();
              setTimeout(function(){$('.caught').hide()}, 400);
            // }

            setTimeout(function(){
              notThrown = true;
              $('#LWOpreview').show();
              $('#RWOpreview').show();
              $('#SLOTpreview').show();

              $('.gameBoard').animate({
                'background-position-x': '50%', 
                'background-position-y': newBackgroundPosition + '%' 
              }, 3000);

              $('.RWO').stop(true, false);
              $('.SLOT').stop(true, false);

              leftWideOut();
              rightWideOut();
              slot();
            }, 1000);

          } else if (RWOHit.length > 0) {
            $('.RWO').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            // if ($('.lobBall')[0].offsetTop < gameboardHeight * .359) {
            //   $('.touchdown').css({height: gameboardHeight * .3, width: $('.gameBoard').width() * .9}).offset({top: gameboardHeight * .2 - $('.touchdown').height()/2, left: $('.gameBoard').width() * .55 - $('.touchdown').width()/2}).show();
            // } else {
              $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12}).offset({top: event.tweens[1].end - $('.caught').height()/2, left: event.tweens[0].end - $('.caught').width()/2}).show();

            // }
            $('.gameBoard').animate({'background-position-x': '50%', 'background-position-y': newBackgroundPosition + '%' }, 3000)
            setTimeout(function(){$('.caught').hide()}, 400);
          } else if (SLOTHit.length > 0) {
            $('.SLOT').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            // if ($('.lobBall')[0].offsetTop < gameboardHeight * .359) {
            //   $('.touchdown').css({height: gameboardHeight * .3, width: $('.gameBoard').width() * .9}).offset({top: gameboardHeight * .2 - $('.touchdown').height()/2, left: $('.gameBoard').width() * .55 - $('.touchdown').width()/2}).show();
            // } else {
              $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12}).offset({top: event.tweens[1].end - $('.caught').height()/2, left: event.tweens[0].end - $('.caught').width()/2}).show();
            // }
            $('.gameBoard').animate({'background-position-x': '50%', 'background-position-y': newBackgroundPosition + '%' }, 3000)
            setTimeout(function(){$('.caught').hide()}, 400);
          } else {
            $('.incomplete').css({height: gameboardHeight * .11, width: gameboardHeight * .12}).offset({top: event.tweens[1].end - $('.incomplete').height()/2, left: event.tweens[0].end - $('.incomplete').width()/2}).show();
            setTimeout(function(){$('.incomplete').hide()}, 400);
            $('.lobBall').animate({top: event.tweens[1].end - 8 + 'px', left: event.tweens[0].end + 1 + 'px'}, 400);
            $('.LWO').stop(true, false).animate({top: $('.LWO')[0].offsetTop - 10, left: $('.LWO')[0].offsetLeft + 15}, 800);
            $('.RWO').stop(true, false).animate({top: $('.RWO')[0].offsetTop - 6, left: $('.RWO')[0].offsetLeft - 15}, 800);
            $('.SLOT').stop(true, false).animate({top: $('.SLOT')[0].offsetTop - 7, left: $('.SLOT')[0].offsetLeft}, 800);
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