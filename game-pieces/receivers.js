/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/

// helper funciton for previewing routes
var CP = function(x, y) { // calculate x and y pixel coordinates based on %
  var xPercent = x/100;
  var yPercent = y/100;
  return [gameOptions.width * xPercent, gameOptions.height * yPercent];
};



// All code documentation for receivers will be in LEFT WIDE OUT since all receivers are virtually the same

var LWOroutes = {
  1: {firstX: 0, firstY: -40, secondX: 3, secondY: -30},                               // curl
  2: {firstX: 0, firstY: -40, secondX: 78, secondY: -85},                              // post
  3: {firstX: 0, firstY: -38, secondX: 78, secondY: -38},                              // cross
  4: {firstX: 0, firstY: -32, secondX: 40, secondY: -60, thirdX: 0, thirdY: -85},      // post corner
  5: {firstX: 75, firstY: -22, secondX: 78, secondY: -85}                             // slant then corner
}
var LWORouteNumber;

var leftWideOut = function() {
  // Define route number upon receiver placement so the random generator is not reset on previewing the route
  LWORouteNumber = Math.floor(Math.random() * 5) + 1;
  $('.LWO').css({
      position: 'absolute',
      left: 10 + '%',
      top: 93 + '%'
    }).data('collision', false);
  $('.LWO').on('collision_start', function(event) {
    $('.gameBoard').append('<div>caught</div>').offset({top: '400px'})
  })

  /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var LWOpreview = document.getElementById("preview");
  var LWOtx = LWOpreview.getContext("2d");
  var LWOstart = CP(10, 93);
  LWOtx.moveTo(LWOstart[0], LWOstart[1]);
  var LWOFirstMove = CP(LWOroutes[LWORouteNumber].firstX, LWOroutes[LWORouteNumber].firstY);
  LWOtx.lineTo(LWOFirstMove[0], LWOFirstMove[1]);
  // LWOtx.lineTo(200, 300);
  LWOtx.lineTo(undefined, undefined);
  LWOtx.globalAlpha = 0.4;
  LWOtx.strokeStyle = "white";
  LWOtx.lineWidth = 10;
  LWOtx.lineCap = "round";
  LWOtx.stroke();
  

};
leftWideOut()


// LWO Route
var LWOroute = function(x, y) {
  $('.LWO').animate({
    left: x + LWOroutes[LWORouteNumber].firstX + '%',
    top: y + LWOroutes[LWORouteNumber].firstY + '%'
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
    left: x + LWOroutes[LWORouteNumber].secondX + '%',
    top: y + LWOroutes[LWORouteNumber].secondY + '%'
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
    left: x + LWOroutes[LWORouteNumber].thirdX + '%',
    top: y + LWOroutes[LWORouteNumber].thirdY + '%'
  }, {
    duration: 1500,
  })
}



/**************************************/
//     R I G H T  W I D E  O U T      //
/**************************************/
var RWOroutes = {
  1: {firstX: 0, firstY: -40, secondX: -3, secondY: -30},                               // curl
  2: {firstX: 0, firstY: -40, secondX: -78, secondY: -85},                              // post
  3: {firstX: -75, firstY: -22, secondX: -78, secondY: -85},                            // slant then corner
  4: {firstX: 0, firstY: -32, secondX: -78, secondY: -32},                              // cross
  5: {firstX: 0, firstY: -32, secondX: -40, secondY: -60, thirdX: -0, thirdY: -85}      // post corner
}
var RWORouteNumber;

var rightWideOut = function() {
  RWORouteNumber = Math.floor(Math.random() * 5) + 1;
  $('.RWO').css({
      position: 'absolute',
      left: 85 + '%',
      top: 93 + '%'
    })
};
rightWideOut()

var RWOpreview = document.getElementById("preview");
var RWOtx = RWOpreview.getContext("2d");
RWOtx.moveTo(50, 50);
RWOtx.lineTo(50, 100);
RWOtx.lineTo(110, 200);
RWOtx.lineTo(undefined, undefined);
RWOtx.globalAlpha = .8;
RWOtx.strokeStyle = "white";
RWOtx.lineWidth = 10;
RWOtx.lineCap = "round";
RWOtx.stroke();


// RWO Route
var RWOroute = function(x, y) {
  $('.RWO').animate({
    left: x + RWOroutes[RWORouteNumber].firstX + '%',
    top: y + RWOroutes[RWORouteNumber].firstY + '%'
  }, {
    duration: 1500
  })
  .animate({
    left: x + RWOroutes[RWORouteNumber].secondX + '%',
    top: y + RWOroutes[RWORouteNumber].secondY + '%'
  }, {
    duration: 1500,
  })
  .animate({
    left: x + RWOroutes[RWORouteNumber].thirdX + '%',
    top: y + RWOroutes[RWORouteNumber].thirdY + '%'
  }, {
    duration: 1500,
  })
}


/**************************************/
//             S L O T                //
/**************************************/
var SLOTposition = {
  0: 68,
  1: 28
};
var position;
// 68, 94 28, 94
var SLOTRoutes = {
  0: { // routes when slot is on the right
    1: {firstX: 0, firstY: -30, secondX: -35, secondY: -50, thirdX: 21, thirdY: -70}, // post corner
    2: {firstX: -60, firstY: -25, secondX: -61, secondY: -86},                        // slant to corner
    3: {firstX: 0, firstY: -30, secondX: 20, secondY: -30},                           // out
    4: {firstX: 0, firstY: -30, secondX: 20, secondY: -30, thirdX: -60, thirdY: -30}, // out then in
  },
  1: {  // routes when slot is on the left
    1: {firstX: 0, firstY: -30, secondX: 35, secondY: -50, thirdX: -21, thirdY: -70}, // post corner
    2: {firstX: 59, firstY: -25, secondX: 60, secondY: -86},                          // slant to corner
    3: {firstX: 0, firstY: -30, secondX: -20, secondY: -30},                          // out
    4: {firstX: 0, firstY: -30, secondX: -20, secondY: -30, thirdX: 60, thirdY: -30}, // out then in
  }
};
var SLOTRouteNumber;

var rightSlot = function() {
  position = Math.round(Math.random());
  SLOTRouteNumber = Math.floor(Math.random() * 4) + 1;
  $('.SLOT').css({
      position: 'absolute',
      left: SLOTposition[position] + '%',
      top: 94 + '%'
    })
};
rightSlot()

var RSLOTpreview = document.getElementById("preview");
var RSLOTtx = RSLOTpreview.getContext("2d");
RSLOTtx.moveTo(50, 50);
RSLOTtx.lineTo(50, 100);
RSLOTtx.lineTo(110, 200);
RSLOTtx.lineTo(undefined, undefined);
RSLOTtx.globalAlpha = .8;
RSLOTtx.strokeStyle = "white";
RSLOTtx.lineWidth = 10;
RSLOTtx.lineCap = "round";
RSLOTtx.stroke();

// SLOT Route
var RSLOTroute = function(x, y) {
  $('.SLOT').animate({
    left: x + SLOTRoutes[position][SLOTRouteNumber].firstX + '%',
    top: y + SLOTRoutes[position][SLOTRouteNumber].firstY + '%'
  }, {
    duration: 1500,
  })
  .animate({
    left: x + SLOTRoutes[position][SLOTRouteNumber].secondX + '%',
    top: y + SLOTRoutes[position][SLOTRouteNumber].secondY + '%'
  }, {
    duration: 1500
  })
  .animate({
    left: x + SLOTRoutes[position][SLOTRouteNumber].thirdX + '%',
    top: y + SLOTRoutes[position][SLOTRouteNumber].thirdY + '%'
  }, {
    duration: 1500
  })
}


// Start the game on click
$('#preview').on('click', function(event) {
  $('#preview').remove();
  console.log(SLOTposition[position])
  var SLOTx = SLOTposition[position];
  var SLOTy = 94;
  var LWOx = 10;
  var LWOy = 93;
  var RWOx = 85;
  var RWOy = 93;
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
  var LWOx = 10;
  var LWOy = 94;
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
      left: LWOx + '%',
      top: LWOy + '%'
    })
  };
  setTimeout(reset, 4700);
});
