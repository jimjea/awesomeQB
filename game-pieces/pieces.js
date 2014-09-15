$(document).ready(function(){

  var gameOptions = {
    width: 310,
    height: 500
  };



  // QB
  var placeqb = function() {
    $('.qb').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height - 20 + 'px'
    })
  }
  placeqb();




  // Ball
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
    console.log(x, y)

    var slope = (y-startY)/(x-startX);

    var throwball = function() {
      $('.ball').animate({
        left: x - 10 + 'px',
        top: y - 18 + 'px'
      }, 400)
    }
    throwball();
  });



  // LWO
  var leftWideOut = function() {
    $('.LWO').css({
        position: 'absolute',
        left: 30 + 'px',
        top: gameOptions.height - 25 + 'px'
      })
  }
  leftWideOut()

  // LWO Route
    var LWOroute = function(x, y) {
      $('.LWO').animate({
        left: x + 'px',
        top: y - 270 + 'px'
      }, 900)
      .animate({
        left: x + 100 + 'px',
        top: y - 460 + 'px'
      }, 900)
    }
  $('.startGame').one('click', function(event) {
    var x = $('.LWO').position().left;
    var y = $('.LWO').position().top;
    LWOroute(x, y);
  });




  // RWO
  var rightWideOut = function() {
    $('.RWO').css({
        position: 'absolute',
        left: gameOptions.width - 30 + 'px',
        top: gameOptions.height - 25 + 'px'
      })
  }
  rightWideOut()

  // RWO Route
    var RWOroute = function(x, y) {
      $('.RWO').animate({
        left: x + 'px',
        top: y - 200 + 'px'
      }, 1000)
      .animate({
        left: x - 270 + 'px',
        top: y - 200 + 'px'
      }, 900)
    }
  $('.startGame').one('click', function(event) {
    $('.startGame').remove();
    var x = $('.RWO').position().left;
    var y = $('.RWO').position().top;
    RWOroute(x, y);
  });




  // RSLOT
  var rightSlot = function() {
    $('.RSLOT').css({
        position: 'absolute',
        left: gameOptions.width - 85 + 'px',
        top: gameOptions.height - 20 + 'px'
      })
  }
  rightSlot()

  // RSLOT Route
  var RSLOTroute = function(x, y) {
    $('.RSLOT').animate({
      left: x + 'px',
      top: y - 150 + 'px'
    }, 1000)
    .animate({
      left: x - 70 + 'px',
      top: y - 250 + 'px'
    }, 900)
    .animate({
      left: x + 70 + 'px',
      top: y - 400 + 'px'
    }, 900)
  }
  $('.startGame').one('click', function(event) {
    var x = $('.RSLOT').position().left;
    var y = $('.RSLOT').position().top;
    RSLOTroute(x, y);
  });



  // Show route
  $('.showRoutes').on('click', function(event) {
    var RSLOTx = $('.RSLOT').position().left;
    var RSLOTy = $('.RSLOT').position().top;
    var RWOx = $('.RWO').position().left;
    var RWOy = $('.RWO').position().top;
    var LWOx = $('.LWO').position().left;
    var LWOy = $('.LWO').position().top;
    LWOroute(LWOx, LWOy);
    RWOroute(RWOx, RWOy);
    RSLOTroute(RSLOTx, RSLOTy);
    var reset = function(){
      console.log('got here')
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
    setInterval(reset,4500);
  });

});