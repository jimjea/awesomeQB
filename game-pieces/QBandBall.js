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
    $('.ball').css({
      position: 'absolute',
      left: gameOptions.width/2 - 6 + 'px',
      top: gameOptions.height - 24 + 'px'
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

    var zipball = function() {
      $('.ball').animate({
        left: x - 10 + 'px',
        top: y - 18 + 'px'
      }, 600)
    }
    zipball();
  });

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