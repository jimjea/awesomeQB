/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/

// helper funciton for previewing routes
var CP = function(x, y) { // calculate x and y pixel coordinates based on %
  var xPercent = x/100;
  var yPercent = y/100;
  // console.log(gameOptions.width * .75)
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
  var startX = 10, startY = 93
  $('.LWO').css({
      position: 'absolute',
      left: startX + '%',
      top: startY + '%'
    }).data('collision', false);
  $('.LWO').on('collision_start', function(event) {
    $('.gameBoard').append('<div>caught</div>').offset({top: '400px'})
  })

  /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var LWOpreview = document.getElementById("preview");
  var LWOtx = LWOpreview.getContext("2d");
  var LWOstart = CP(startX, startY);
  LWOtx.moveTo(LWOstart[0] + 9, LWOstart[1] + 10);
  var LWOFirstMove = CP(startX + LWOroutes[LWORouteNumber].firstX, startY + LWOroutes[LWORouteNumber].firstY);
  LWOtx.lineTo(LWOFirstMove[0] + 9, LWOFirstMove[1] + 10);
  LWOtx.lineTo(LWOFirstMove[0] + 9, LWOFirstMove[1] + 10);
  var LWOSecondMove = CP(startX + LWOroutes[LWORouteNumber].secondX, startY + LWOroutes[LWORouteNumber].secondY);
  LWOtx.lineTo(LWOSecondMove[0] + 9, LWOSecondMove[1] + 10);
  LWOtx.lineTo(LWOSecondMove[0] + 9, LWOSecondMove[1] + 10);
  var LWOThirdMove = CP(startX + LWOroutes[LWORouteNumber].thirdX, startY + LWOroutes[LWORouteNumber].thirdY);
  LWOtx.lineTo(LWOThirdMove[0] + 9, LWOThirdMove[1] + 10);
  LWOtx.lineTo(LWOThirdMove[0] + 9, LWOThirdMove[1] + 10);
  LWOtx.globalAlpha = 0.2;
  LWOtx.strokeStyle = "blue";
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
  var startX = 85, startY = 93;
  $('.RWO').css({
      position: 'absolute',
      left: 85 + '%',
      top: 93 + '%'
    })

  /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var RWOpreview = document.getElementById("preview");
  var RWOtx = RWOpreview.getContext("2d");
  var RWOstart = CP(startX, startY);
  RWOtx.moveTo(RWOstart[0] + 9, RWOstart[1] + 10);
  var RWOFirstMove = CP(startX + RWOroutes[RWORouteNumber].firstX, startY + RWOroutes[RWORouteNumber].firstY);
  RWOtx.lineTo(RWOFirstMove[0] + 9, RWOFirstMove[1] + 10);
  var RWOSecondMove = CP(startX + RWOroutes[RWORouteNumber].secondX, startY + RWOroutes[RWORouteNumber].secondY);
  RWOtx.lineTo(RWOSecondMove[0] + 9, RWOSecondMove[1] + 10);
  var RWOThirdMove = CP(startX + RWOroutes[RWORouteNumber].thirdX, startY + RWOroutes[RWORouteNumber].thirdY);
  RWOtx.lineTo(RWOThirdMove[0] + 9, RWOThirdMove[1] + 10);
  RWOtx.globalAlpha = 0.2;
  RWOtx.strokeStyle = "red";
  RWOtx.lineWidth = 10;
  RWOtx.lineCap = "round";
  RWOtx.stroke();
};
rightWideOut()


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
var SLOTroutes = {
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
  var startX = SLOTposition[position], startY = 94;
  SLOTRouteNumber = Math.floor(Math.random() * 4) + 1;
  $('.SLOT').css({
      position: 'absolute',
      left: SLOTposition[position] + '%',
      top: 94 + '%'
    })

  /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var SLOTpreview = document.getElementById("preview");
  var SLOTtx = SLOTpreview.getContext("2d");
  var SLOTstart = CP(startX, startY);
  SLOTtx.moveTo(SLOTstart[0] + 9, SLOTstart[1] + 10);
  var SLOTFirstMove = CP(startX + SLOTroutes[position][SLOTRouteNumber].firstX, startY + SLOTroutes[position][SLOTRouteNumber].firstY);
  SLOTtx.lineTo(SLOTFirstMove[0] + 9, SLOTFirstMove[1] + 10);
  var SLOTSecondMove = CP(startX + SLOTroutes[position][SLOTRouteNumber].secondX, startY + SLOTroutes[position][SLOTRouteNumber].secondY);
  SLOTtx.lineTo(SLOTSecondMove[0] + 9, SLOTSecondMove[1] + 10);
  var SLOTThirdMove = CP(startX + SLOTroutes[position][SLOTRouteNumber].thirdX, startY + SLOTroutes[position][SLOTRouteNumber].thirdY);
  SLOTtx.lineTo(SLOTThirdMove[0] + 9, SLOTThirdMove[1] + 10);
  SLOTtx.globalAlpha = 0.4;
  SLOTtx.strokeStyle = "white";
  SLOTtx.lineWidth = 10;
  SLOTtx.lineCap = "round";
  SLOTtx.stroke();
};
rightSlot()


// SLOT Route
var SLOTroute = function(x, y) {
  $('.SLOT').animate({
    left: x + SLOTroutes[position][SLOTRouteNumber].firstX + '%',
    top: y + SLOTroutes[position][SLOTRouteNumber].firstY + '%'
  }, {
    duration: 1500,
  })
  .animate({
    left: x + SLOTroutes[position][SLOTRouteNumber].secondX + '%',
    top: y + SLOTroutes[position][SLOTRouteNumber].secondY + '%'
  }, {
    duration: 1500
  })
  .animate({
    left: x + SLOTroutes[position][SLOTRouteNumber].thirdX + '%',
    top: y + SLOTroutes[position][SLOTRouteNumber].thirdY + '%'
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
  SLOTroute(SLOTx, SLOTy);
});



/**************************************/
//     P R E V I E W  R O U T E S     //
/**************************************/
$('.showRoutes').on('click', function(event) {
  var RSLOTx = SLOTposition[position];
  var RSLOTy = 94;
  var RWOx = 85;
  var RWOy = 93;
  var LWOx = 10;
  var LWOy = 93;
  LWOroute(LWOx, LWOy);
  RWOroute(RWOx, RWOy);
  SLOTroute(RSLOTx, RSLOTy);
  var reset = function(){
    $('.SLOT').css({
      left: RSLOTx + '%',
      top: RSLOTy + '%'
    })
    $('.RWO').css({
      left: RWOx + '%',
      top: RWOy + '%'
    })
    $('.LWO').css({
      left: LWOx + '%',
      top: LWOy + '%'
    })
  };
  setTimeout(reset, 4700);
});
