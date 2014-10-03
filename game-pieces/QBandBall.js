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
    $('.ball').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 10 + 'px'
    })  
  }
  placeball();

  // throw ball to mouse on click
  $('.gameBoard').one('click', function(event) {
    var startX = gameOptions.width/2;
    var startY = gameOptions.height-10;
    var x = event.clientX;
    var y = event.clientY;

    var slope = (y-startY)/(x-startX);

    var lobBall = function() {
      $('.ball').animate({
        left: x - 5 + 'px',
        top: y - 7 + 'px'
      }, {
        duration: 600,
        done: function(event) {
          // var hit_list1 = $(this).collision(".LWO");
          // var hit_list2 = $(this).collision(".RWO");
          var hit_list3 = $(this).collision(".RSLOT");
          if ( hit_list3.length > 0) {
            console.log('hit')
          }
        }
      })
    }
    lobBall();
  });

  $('.ball').on('flick', function(event) {
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