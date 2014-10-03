  var gameOptions = {
    width: 310,
    height: 500
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
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 20 + 'px'
    })
  }
  placeqb();



/**************************************/
//               B A L L              //
/**************************************/
  var placeball = function() {
    $('.lobBall').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 30 + 'px'
    });
    $('.zipBall').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 30 + 'px'
    })    
  }
  placeball();

  // throw ball to mouse on click
  // ball handles all collision logic
  $('.gameBoard').one('click', function(event) {
    $('.zipBall').remove();
    var startX = gameOptions.width/2;
    var startY = gameOptions.height-10;
    var x = event.clientX;
    var y = event.clientY;

    var slope = (y-startY)/(x-startX);

    // Lobbing the ball on click will only allow the receiver to catch it as the ball ends its animation
    var lobBall = function() {
      $('.lobBall').animate({
        left: x - 5 + 'px',
        top: y - 7 + 'px'
      }, {
        duration: 600,
        step: function() {

        },
        done: function(event) {
          var LWOHit = $(this).collision(".LWO");
          var RWOHit = $(this).collision(".RWO");
          var RSLOTHit = $(this).collision(".RSLOT");
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
          } else if (RSLOTHit.length > 0) {
            $('.RSLOT').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);
            $('.caught').offset({top: event.tweens[1].end - 15, left: event.tweens[0].end - 15}).show()
            setTimeout(function(){$('.caught').hide()}, 400);
          } else {
            $('.incomplete').offset({top: event.tweens[1].end - 25, left: event.tweens[0].end - 25}).show();
            setTimeout(function(){$('.incomplete').hide()}, 400);
            $('.lobBall').animate({top: event.tweens[1].end - 8 + 'px', left: event.tweens[0].end + 1 + 'px'}, 400);
            $('.LWO').stop(true, false).animate({top: $('.LWO')[0].offsetTop - 10, left: $('.LWO')[0].offsetLeft + 15}, 800);
            $('.RWO').stop(true, false).animate({top: $('.RWO')[0].offsetTop - 6, left: $('.RWO')[0].offsetLeft - 15}, 800);
            $('.RSLOT').stop(true, false).animate({top: $('.RSLOT')[0].offsetTop - 7, left: $('.RSLOT')[0].offsetLeft}, 800);
          }
        }
      })
    }
    lobBall();
  });

  // zips ball in a straight on on flick
  // receiver can catch the ball anywhere in the line
  $('.zipBall').on('flick', function(event) {
    console.log(event)
  })


  /**************************************/
  //     P R E V I E W  R O U T E S     //
  /**************************************/
  $('.showRoutes').on('click', function(event) {
    var RSLOTx = $('.RSLOT').offset().left;
    var RSLOTy = $('.RSLOT').offset().top;
    var RWOx = $('.RWO').offset().left;
    var RWOy = $('.RWO').offset().top;
    var LWOx = $('.LWO').offset().left;
    var LWOy = $('.LWO').offset().top;
    LWOroute(LWOx, LWOy);
    RWOroute(RWOx, RWOy);
    RSLOTroute(RSLOTx, RSLOTy);
    var reset = function(){
      $('.RSLOT').css({
        left: RSLOTx,
        top: RSLOTy
      })
      $('.RWO').css({
        left: RWOx,
        top: RWOy
      })
      $('.LWO').css({
        left: LWOx,
        top: LWOy
      })
    };
    setTimeout(reset, 3900);
  });

});