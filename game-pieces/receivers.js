/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/


// All code documentation for receivers will be in LEFT WIDE OUT since all receivers are virtually the same

var LWOroutes = {
  1: {firstX: 0, firstY: -40, firstDur: 1500, secondX: 3, secondY: -30, secondDur: 600},                                          // curl
  2: {firstX: 0, firstY: -40, firstDur: 1500, secondX: 78, secondY: -85, secondDur: 1900},                                         // post
  3: {firstX: 0, firstY: -38, firstDur: 1500, secondX: 78, secondY: -38, secondDur: 1700},                                         // cross
  4: {firstX: 0, firstY: -32, firstDur: 1500, secondX: 40, secondY: -60, secondDur: 1500, thirdX: 0, thirdY: -85, thirdDur: 1500}, // post corner
  5: {firstX: 75, firstY: -22, firstDur: 2000, secondX: 78, secondY: -85, secondDur: 1900}                                         // slant then corner
}
var LWORouteNumber;

var leftWideOut = function() {
  // Define route number upon receiver placement so the random generator is not reset on previewing the route
  LWORouteNumber = Math.floor(Math.random() * 5) + 1;
  var startX = 10, startY = 93
  $('.LWO').css({
      position: 'absolute',
      height: $('.gameBoard').height() * .04,
      width: $('.gameBoard').width() * .04,
      left: startX + '%',
      top: startY + '%'
    }).data('collision', false);
  $('.LWO').on('collision_start', function(event) {
    $('.gameBoard').append('<div>caught</div>').offset({top: '400px'})
  })
  

};
leftWideOut()


// LWO Route
var LWOroute = function(x, y) {
  $('.LWO').animate({
    left: x + LWOroutes[LWORouteNumber].firstX + '%',
    top: y + LWOroutes[LWORouteNumber].firstY + '%'
  }, {
    duration: LWOroutes[LWORouteNumber].firstDur,
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
    duration: LWOroutes[LWORouteNumber].secondDur,
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
    duration: LWOroutes[LWORouteNumber].thirdDur,
  })
}



/**************************************/
//     R I G H T  W I D E  O U T      //
/**************************************/
var RWOroutes = {
  1: {firstX: 0, firstY: -40, firstDur: 1500, secondX: -3, secondY: -30, secondDur: 600},                               // curl
  2: {firstX: 0, firstY: -40, firstDur: 1500, secondX: -78, secondY: -85, secondDur: 2000},                              // post
  3: {firstX: -75, firstY: -22, firstDur: 2000, secondX: -78, secondY: -85, secondDur: 1500},                            // slant then corner
  4: {firstX: 0, firstY: -32, firstDur: 1500, secondX: -78, secondY: -32, secondDur: 1700},                              // cross
  5: {firstX: 0, firstY: -32, firstDur: 1500, secondX: -40, secondY: -60, secondDur: 1500, thirdX: -0, thirdY: -85, thirdDur: 1500}      // post corner
}
var RWORouteNumber;

var rightWideOut = function() {
  RWORouteNumber = Math.floor(Math.random() * 5) + 1;
  var startX = 85, startY = 93;
  $('.RWO').css({
      position: 'absolute',
      height: $('.gameBoard').height() * .04,
      width: $('.gameBoard').width() * .04,
      left: 85 + '%',
      top: 93 + '%'
    })


};
rightWideOut()


// RWO Route
var RWOroute = function(x, y) {
  $('.RWO').animate({
    left: x + RWOroutes[RWORouteNumber].firstX + '%',
    top: y + RWOroutes[RWORouteNumber].firstY + '%'
  }, {
    duration: RWOroutes[RWORouteNumber].firstDur
  })
  .animate({
    left: x + RWOroutes[RWORouteNumber].secondX + '%',
    top: y + RWOroutes[RWORouteNumber].secondY + '%'
  }, {
    duration: RWOroutes[RWORouteNumber].secondDur
  })
  .animate({
    left: x + RWOroutes[RWORouteNumber].thirdX + '%',
    top: y + RWOroutes[RWORouteNumber].thirdY + '%'
  }, {
    duration: RWOroutes[RWORouteNumber].thirdDur
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
    1: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -35, secondY: -50, secondDur: 1500, thirdX: 21, thirdY: -70, thirdDur: 1500},  // post corner
    2: {firstX: -60, firstY: -25, firstDur: 1500, secondX: -61, secondY: -86, secondDur: 1500},                                         // slant to corner
    3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 20, secondY: -30, secondDur: 1500},                                            // out
    4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 20, secondY: -30, secondDur: 1000, thirdX: -60, thirdY: -30, thirdDur: 1900},  // out then in
  },
  1: {  // routes when slot is on the left
    1: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 35, secondY: -50, secondDur: 1500, thirdX: -21, thirdY: -70, thirdDur: 1500},  // post corner
    2: {firstX: 59, firstY: -25, firstDur: 1500, secondX: 60, secondY: -86, secondDur: 1500},                                           // slant to corner
    3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -20, secondY: -30, secondDur: 1500},                                           // out
    4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -20, secondY: -30, secondDur: 1000, thirdX: 60, thirdY: -30, thirdDur: 1900},  // out then in
  }
};
var SLOTRouteNumber;

var rightSlot = function() {
  position = Math.round(Math.random());
  var startX = SLOTposition[position], startY = 94;
  SLOTRouteNumber = Math.floor(Math.random() * 4) + 1;
  $('.SLOT').css({
      position: 'absolute',
      height: $('.gameBoard').height() * .04,
      width: $('.gameBoard').width() * .04,
      left: SLOTposition[position] + '%',
      top: 94 + '%'
    })

};
rightSlot()


// SLOT Route
var SLOTroute = function(x, y) {
  $('.SLOT').animate({
    left: x + SLOTroutes[position][SLOTRouteNumber].firstX + '%',
    top: y + SLOTroutes[position][SLOTRouteNumber].firstY + '%'
  }, {
    duration: SLOTroutes[position][SLOTRouteNumber].firstDur,
  })
  .animate({
    left: x + SLOTroutes[position][SLOTRouteNumber].secondX + '%',
    top: y + SLOTroutes[position][SLOTRouteNumber].secondY + '%'
  }, {
    duration: SLOTroutes[position][SLOTRouteNumber].secondDur
  })
  .animate({
    left: x + SLOTroutes[position][SLOTRouteNumber].thirdX + '%',
    top: y + SLOTroutes[position][SLOTRouteNumber].thirdY + '%'
  }, {
    duration: SLOTroutes[position][SLOTRouteNumber].thirdDur
  })
}


// Start the game on click
$('#SLOTpreview').on('click', function(event) {
  $('#SLOTpreview').remove();
  $('#RWOpreview').remove();
  $('#LWOpreview').remove();
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
