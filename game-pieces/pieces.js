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
      top: gameOptions.height-10 + 'px'
    })
  }
  placeqb();

  // Ball
  var placeball = function() {
    $('.ball').css({
      position: 'absolute',
      left: gameOptions.width/2 + 'px',
      top: gameOptions.height-10 + 'px'
    })  
  }
  placeball();

  // throw ball to mouse on click
  $('.gameBoard').on('click', function(event) {
    var startX = gameOptions.width/2;
    var startY = gameOptions.height-10;
    var x = event.clientX;
    var y = event.clientY;

    var slope = (y-startY)/(x-startX);

    console.log(slope)

    var throwball = function() {
      $('.ball').animate({
        left: x + x * slope + 'px',
        top: y + y * slope + 'px'
      }, 900)
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
  $('.gameBoard').one('click', function(event) {
    var x = $('.LWO').position().left;
    var y = $('.LWO').position().top;

    console.log(x, y)

    var LWOroute = function() {
      $('.LWO').animate({
        left: x + 'px',
        top: y - 270 + 'px'
      }, 900)
      .animate({
        left: x + 100 + 'px',
        top: y - 480 + 'px'
      }, 900)
    }
    LWOroute();
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
  $('.gameBoard').one('click', function(event) {
    var x = $('.RWO').position().left;
    var y = $('.RWO').position().top;

    console.log(x, y)

    var RWOroute = function() {
      $('.RWO').animate({
        left: x + 'px',
        top: y - 300 + 'px'
      }, 1000)
      .animate({
        left: x - 270 + 'px',
        top: y - 300 + 'px'
      }, 900)
    }
    RWOroute();
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
  $('.gameBoard').one('click', function(event) {
    var x = $('.RSLOT').position().left;
    var y = $('.RSLOT').position().top;

    console.log(x, y)

    var RSLOTroute = function() {
      $('.RSLOT').animate({
        left: x + 'px',
        top: y - 250 + 'px'
      }, 1000)
      .animate({
        left: x + 70 + 'px',
        top: y - 250 + 'px'
      }, 900)
    }
    RSLOTroute();
  });

});