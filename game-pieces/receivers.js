/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/
var LWOroutes = {
  1: {firstX: 0, firstY: -270, secondX: 10, secondY: -150},     // curl
  2: {firstX: 0, firstY: -270, secondX: 100, secondY: -430},    // post
  3: {firstX: 0, firstY: -200, secondX: 250, secondY: -200},   // cross
  4: {firstX: 150, firstY: -200, secondX: 160, secondY: -430}   // slant then fade
}
var LWORouteNumber;

var leftWideOut = function() {
  $('.LWO').css({
      position: 'absolute',
      left: 30 + 'px',
      top: gameOptions.height - 30 + 'px'
    }).data('collision', false);
  $('.LWO').on('collision_start', function(event) {
    $('.gameBoard').append('<div>caught</div>').offset({top: '400px'})
  })
  // Define route number upon receiver placement so the random generator is not reset on previewing the route
  LWORouteNumber = Math.floor(Math.random() * 3) + 1;
};
leftWideOut()

// LWO Route
  var LWOroute = function(x, y) {
    $('.LWO').animate({
      left: x + LWOroutes[LWORouteNumber].firstX + 'px',
      top: y + LWOroutes[LWORouteNumber].firstY + 'px'
    }, {
      duration: 1500,
      // LEAVING ONE EXAMPLE TO USE LATER TO DISPLAY A SINGLE INSTANCE
      step: function() {
        
        // handles only revealing the caught message once
        var hit_list = $(this).collision(".zipBall");
        var current_collision = hit_list.length != 0;

        var changed_collision = current_collision != $(this).data("collision");

        if (changed_collision) {
            $(this).data("collision", current_collision);
            $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
        }
      }
    })
    .animate({
      left: x + LWOroutes[LWORouteNumber].secondX + 'px',
      top: y + LWOroutes[LWORouteNumber].secondY + 'px'
    }, {
      duration: 1500,
      step: function() {
        // handles only revealing the caught message once
        var hit_list = $(this).collision(".zipBall");
        var current_collision = hit_list.length != 0;

        var changed_collision = current_collision != $(this).data("collision");

        if (changed_collision) {
            $(this).data("collision", current_collision);
            $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
        }
      }
    })
    .animate({
      left: x + LWOroutes[LWORouteNumber].thirdX + 'px',
      top: y + LWOroutes[LWORouteNumber].thirdY + 'px'
    }, {
      duration: 1500,
    })
  }



/**************************************/
//     R I G H T  W I D E  O U T      //
/**************************************/
var RWOroutes = {
  1: {firstX: 0, firstY: -270, secondX: -120, secondY: -430},     // post
  2: {firstX: 0, firstY: -280, secondX: -10, secondY: -150},      // curl
  3: {firstX: -150, firstY: -200, secondX: -160, secondY: -430},  // slant then fade
  4: {firstX: 0, firstY: -220, secondX: -250, secondY: -220},     // cross
}
var RWORouteNumber;

var rightWideOut = function() {
  $('.RWO').css({
      position: 'absolute',
      left: gameOptions.width - 30 + 'px',
      top: gameOptions.height - 30 + 'px'
    })
  RWORouteNumber = Math.floor(Math.random() * 4) + 1;
};
rightWideOut()

// RWO Route
  var RWOroute = function(x, y) {
    $('.RWO').animate({
      left: x + RWOroutes[RWORouteNumber].firstX + 'px',
      top: y + RWOroutes[RWORouteNumber].firstY + 'px'
    }, {
      duration: 1500
    })
    .animate({
      left: x + RWOroutes[RWORouteNumber].secondX + 'px',
      top: y + RWOroutes[RWORouteNumber].secondY + 'px'
    }, {
      duration: 1500,
    })
    .animate({
      left: x + RWOroutes[RWORouteNumber].thirdX + 'px',
      top: y + RWOroutes[RWORouteNumber].thirdY + 'px'
    }, {
      duration: 1500,
    })
  }


/**************************************/
//             S L O T                //
/**************************************/
var SLOTposition = {
  0: gameOptions.width - 85 + 'px',
  1: 90 + 'px'
};

var rightSlot = function() {
  var position = Math.round(Math.random());
  $('.SLOT').css({
      position: 'absolute',
      left: SLOTposition[position],
      top: gameOptions.height - 25 + 'px'
    })
};
rightSlot()

// SLOT Route
var RSLOTroute = function(x, y) {
  $('.SLOT').animate({
    left: x + 'px',
    top: y - 150 + 'px'
  }, {
    duration: 1500,
  })
  .animate({
    left: x - 70 + 'px',
    top: y - 250 + 'px'
  }, {
    duration: 1500
  })
  .animate({
    left: x + 70 + 'px',
    top: y - 400 + 'px'
  }, {
    duration: 1500
  })
}


// Start the game on click
$('.startGame').on('click', function(event) {
  $('.startGame').remove();
  var SLOTx = $('.SLOT').offset().left;
  var SLOTy = $('.SLOT').offset().top;
  var LWOx = $('.LWO').offset().left;
  var LWOy = $('.LWO').offset().top;
  var RWOx = $('.RWO').offset().left;
  var RWOy = $('.RWO').offset().top;
  RWOroute(RWOx, RWOy);
  LWOroute(LWOx, LWOy);
  RSLOTroute(SLOTx, SLOTy);
});



/**************************************/
//     P R E V I E W  R O U T E S     //
/**************************************/
$('.showRoutes').on('click', function(event) {
  var RSLOTx = $('.SLOT').offset().left;
  var RSLOTy = $('.SLOT').offset().top;
  var RWOx = $('.RWO').offset().left;
  var RWOy = $('.RWO').offset().top;
  var LWOx = $('.LWO').offset().left;
  var LWOy = $('.LWO').offset().top;
  LWOroute(LWOx, LWOy);
  RWOroute(RWOx, RWOy);
  RSLOTroute(RSLOTx, RSLOTy);
  var reset = function(){
    $('.SLOT').css({
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
  setTimeout(reset, 4700);
});
