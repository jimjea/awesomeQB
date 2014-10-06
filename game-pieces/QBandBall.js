  var gameOptions = {
    width: $(window).width(),
    height: $(window).height()
  };

$(document).ready(function(){

  // Start New Game
  $('.newGame').on('click', function() {
    location.reload();
  })


/**************************************/
//                Q B                 //
/**************************************/

  var placeqb = function() {
    $('.qb').css({
      position: 'absolute',
      left: 48 + '%',
      top: 94.7 + '%'
    });
    $('#preview').on('click', function() {
      $('.qb').animate({
        top: 96.5 + '%'
      }, 600);
    });
  };
  placeqb();



/**************************************/
//               B A L L              //
/**************************************/
  var placeball = function() {
    $('.lobBall, .zipBall').css({
      position: 'absolute',
      left: 49 + '%',
      top: 92 + '%'
    });
    $('#preview').on('click', function() {
      $('.lobBall, .zipBall').animate({
        left: 50.5 + '%',
        top: 95.5 + '%'
      }, 800)
    });    
  }
  placeball();

  // throw ball to mouse on click
  // ball handles all collision logic
  $('.gameBoard').one('click', function(event) {
    $('.zipBall').remove();
    var x = event.clientX;
    var y = event.clientY;

    // Lobbing the ball on click will only allow the receiver to catch it as the ball ends its animation
    var lobBall = function() {
      $('.lobBall').animate({
        left: x - 16 + 'px',
        top: y - 10 + 'px'
      }, {
        duration: 600,
        step: function() {
          // add size increasing as it progresses
        },
        done: function(event) {
          var LWOHit = $(this).collision(".LWO");
          var RWOHit = $(this).collision(".RWO");
          var SLOTHit = $(this).collision(".SLOT");
          if (LWOHit.length > 0) {
            $('.LWO').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.caught').offset({top: event.tweens[1].end - 15, left: event.tweens[0].end - 15}).show()
            setTimeout(function(){$('.caught').hide()}, 400);
          } else if (RWOHit.length > 0) {
            $('.RWO').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.caught').offset({top: event.tweens[1].end - 15, left: event.tweens[0].end - 15}).show()
            setTimeout(function(){$('.caught').hide()}, 400);
          } else if (SLOTHit.length > 0) {
            $('.SLOT').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.caught').offset({top: event.tweens[1].end - 15, left: event.tweens[0].end - 15}).show()
            setTimeout(function(){$('.caught').hide()}, 400);
          } else {
            $('.incomplete').offset({top: event.tweens[1].end - 25, left: event.tweens[0].end - 25}).show();
            setTimeout(function(){$('.incomplete').hide()}, 400);
            $('.lobBall').animate({top: event.tweens[1].end - 8 + 'px', left: event.tweens[0].end + 1 + 'px'}, 400);
            $('.LWO').stop(true, false).animate({top: $('.LWO')[0].offsetTop - 10, left: $('.LWO')[0].offsetLeft + 15}, 800);
            $('.RWO').stop(true, false).animate({top: $('.RWO')[0].offsetTop - 6, left: $('.RWO')[0].offsetLeft - 15}, 800);
            $('.SLOT').stop(true, false).animate({top: $('.SLOT')[0].offsetTop - 7, left: $('.SLOT')[0].offsetLeft}, 800);
          }

          setTimeout(function(){location.reload()}, 1000);
        }
      })
    }
    lobBall();
  });

  // zips ball in a straight on on flick
  // receiver can catch the ball anywhere in the line
    $('.zipBall').mousedown(function (event) {
        startDownX = event.pageX;
        startDownY = event.pageY;
    });
        
    /* Work out fling direction on end of fling */
    $('.gameBoard').on('dblclick', function(event){
       
        var rise = -(event.pageY - startDownY); /* Page Origin is different from graph */
        var run = event.pageX - startDownX;
        var newX = $('.zipBall').position().left;
        var newY = $('.zipBall').position().top;
        var distanceToFling = 100;

        if (run == 0 || Math.abs(rise/run) > 3) {
            if (rise > 0) {
              newY -= distanceToFling;
            } else if (rise < 0) {
              newY += distanceToFling;
            }
        }
        else {
            if (run > 0) {
                newX += distanceToFling;
                newY -= (rise/run) * distanceToFling;
            }
            else {
                newX -= distanceToFling;
                newY += (rise/run) * distanceToFling;
            }
        }
       
         $('.zipBall').animate({
             left: newX,
             top: newY
            }, 1000);
    });





});