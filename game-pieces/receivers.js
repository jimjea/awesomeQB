/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/
var LWOroutes = {
  1: {firstX: 0, firstY: -230, secondX: 10, secondY: -150},                             // curl
  2: {firstX: 0, firstY: -220, secondX: 130, secondY: -430},                            // post
  3: {firstX: 0, firstY: -200, secondX: 250, secondY: -200},                            // cross
  4: {firstX: 0, firstY: -150, secondX: 100, secondY: -240, thirdX: 10, thirdY: -430},  // post corner
  5: {firstX: 150, firstY: -200, secondX: 250, secondY: -430}                           // slant then corner
}
var LWORouteNumber;

var leftWideOut = function() {
  // Define route number upon receiver placement so the random generator is not reset on previewing the route
  LWORouteNumber = Math.floor(Math.random() * 5) + 1;
  $('.LWO').css({
      position: 'absolute',
      left: 30 + 'px',
      top: gameOptions.height - 30 + 'px'
    }).data('collision', false);
  $('.LWO').on('collision_start', function(event) {
    $('.gameBoard').append('<div>caught</div>').offset({top: '400px'})
  })

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
  1: {firstX: 0, firstY: -240, secondX: -130, secondY: -430},                           // post
  2: {firstX: 0, firstY: -230, secondX: -10, secondY: -150},                            // curl
  3: {firstX: -150, firstY: -200, secondX: -240, secondY: -430},                        // slant then corner
  4: {firstX: 0, firstY: -220, secondX: -250, secondY: -220},                           // cross
  5: {firstX: 0, firstY: 150, secondX: -100, secondY: -240, thirdX: -10, thirdY: -430}  // post corner
}
var RWORouteNumber;

var rightWideOut = function() {
  RWORouteNumber = Math.floor(Math.random() * 4) + 1;
  $('.RWO').css({
      position: 'absolute',
      left: gameOptions.width - 30 + 'px',
      top: gameOptions.height - 30 + 'px'
    })
};
rightWideOut()

var c = document.getElementById("preview");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();

var d = document.getElementById("preview");
var dtx = d.getContext("2d");
dtx.moveTo(300, 20);
dtx.lineTo(150,100);
dtx.stroke();

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
var position;

var SLOTRoutes = {
  0: { // routes when slot is on the right
    1: {firstX: 0, firstY: -150, secondX: -70, secondY: -250, thirdX: 70, thirdY: -400},  // post corner
    2: {firstX: -120, firstY: -100, secondX: -190, secondY: -430},                        // slant to corner
    3: {firstX: 0, firstY: -150, secondX: 60, secondY: -150},                             // out
    4: {firstX: 0, firstY: -150, secondX: 60, secondY: -150, thirdX: -190, thirdY: -150}, // out then in
  },
  1: {  // routes when slot is on the left
    1: {firstX: 0, firstY: -150, secondX: 70, secondY: -250, thirdX: 10, thirdY: -400},   // post corner
    2: {firstX: 120, firstY: -100, secondX: 190, secondY: -430},                          // slant to corner
    3: {firstX: 0, firstY: -150, secondX: -60, secondY: -150},                            // out
    4: {firstX: 0, firstY: -150, secondX: -60, secondY: -150, thirdX: 190, thirdY: -150}, // out then in
  }
};
var SLOTRouteNumber;

var rightSlot = function() {
  position = Math.round(Math.random());
  SLOTRouteNumber = Math.floor(Math.random() * 4) + 1;
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
    left: x + SLOTRoutes[position][SLOTRouteNumber].firstX + 'px',
    top: y + SLOTRoutes[position][SLOTRouteNumber].firstY + 'px'
  }, {
    duration: 1500,
  })
  .animate({
    left: x + SLOTRoutes[position][SLOTRouteNumber].secondX + 'px',
    top: y + SLOTRoutes[position][SLOTRouteNumber].secondY + 'px'
  }, {
    duration: 1500
  })
  .animate({
    left: x + SLOTRoutes[position][SLOTRouteNumber].thirdX + 'px',
    top: y + SLOTRoutes[position][SLOTRouteNumber].thirdY + 'px'
  }, {
    duration: 1500
  })
}


// Start the game on click
$('#preview').on('click', function(event) {
  $('#preview').remove();
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
