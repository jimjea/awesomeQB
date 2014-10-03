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
  // placeqb();



/**************************************/
//               B A L L              //
/**************************************/
  var placeball = function() {
    $('.lobBall').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 10 + 'px'
    });
    $('.zipBall').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 10 + 'px'
    })    
  }
  placeball();

  // throw ball to mouse on click
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
        // done: function(event) {
        //   var LWOHit = $(this).collision(".LWO");
        //   var RWOHit = $(this).collision(".RWO");
        //   var RSLOTHit = $(this).collision(".RSLOT");
        //   if (LWOHit.length > 0) {
        //     console.log(event)
        //     $('.LWO').stop(true, false).animate({top: event.originalProperties.top + 25});
        //     // $('.ball').animate({top: event.delegateTarget.offsetTop - 25});
        //   } else if (RWOHit.length > 0) {
        //     $('.RWO').stop(true, false).animate({top: event.originalProperties.top + 25});
        //   } else if (RSLOTHit.length > 0) {
        //     $('.RSLOT').stop(true, false).animate({top: event.originalProperties.top + 25});
        //   } else {
        //     $('.LWO').stop(true, false).animate({top: event.originalProperties.top + 25});
        //     $('.RWO').stop(true, false).animate({top: event.originalProperties.top + 25});
        //     $('.RSLOT').stop(true, false).animate({top: event.originalProperties.top + 25});
        //     console.log('incomplete pass')
        //   }
        // }
      })
    }
    lobBall();
  });

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