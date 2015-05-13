/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/


// All code documentation for receivers will be in LEFT WIDE OUT since all receivers are virtually the same
var percentFieldDiff;

var LWOroutes = {
  1: {firstX: 0, firstY: -45, firstDur: 1500, secondX: 3, secondY: -35, secondDur: 600},                                          // curl
  2: {firstX: 0, firstY: -35, firstDur: 1500, secondX: 78, secondY: -75, secondDur: 1900},                                         // post
  3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 78, secondY: -30, secondDur: 1700},                                         // cross
  4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 40, secondY: -60, secondDur: 1500, thirdX: 0, thirdY: -75, thirdDur: 1500}, // post corner
  5: {firstX: 75, firstY: -40, firstDur: 2000, secondX: 78, secondY: -75, secondDur: 1900}                                         // slant then corner
};
var LWORouteNumber;

var leftWideOut = function(dur, startX, startY) {
  dur = dur || undefined;
  // Define route number upon receiver placement so the random generator is not reset on previewing the route
  LWORouteNumber = Math.floor(Math.random() * 5) + 1;
  $('.LWO').animate({
      left: startX + '%',
      top: startY + '%'
    }, {
      duration: dur,
      done: function() { // only need this done logic once
        $('#LWOpreview').show();
        $('#RWOpreview').show();
        $('#SLOTpreview').show();

        $('.zipBall').show();
        $('.lobBall').show();


        // handles close to endzone and redzone
        var backgroundPosition = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
        var pixelDiffRedzone = (Math.abs(52 - backgroundPosition) / 100) * gameOptions.height;
        percentFieldDiff = Math.abs(52 - backgroundPosition);


        if (backgroundPosition <= 32) {
          previewRedzone();
        } else if (backgroundPosition < 52) {
          $('.gameBoard').removeClass('notredzone');
          previewClose(pixelDiffRedzone);
        } else {
          preview();
        }

        // handles unhiding endzone ********************* NEEDS TO SCALE THE ENDZONE PROPERLY TO THE ACTUAL ENDZONE. AS WE GET CLOSER TO 0%, THE ENDZONE DIV DOESN'T MOVE DOWN ENOUGH
        if (backgroundPosition <= 52) {
          placeEndzone(((percentFieldDiff + 5)/100) * gameOptions.height)
        }



        notThrown = true;
      }
    })
  // .data('collision', false);
  // $('.LWO').on('collision_start', function(event) {
  //   $('.gameBoard').append('<div>caught</div>').offset({top: '400px'})
  // })
  

};
leftWideOut(undefined, 10, 92);


// LWO Route
var LWOroute = function(x, y) {
  $('.LWO').animate({
    left: x + LWOroutes[LWORouteNumber].firstX + '%',
    top: y + LWOroutes[LWORouteNumber].firstY + '%'
  }, {
    duration: LWOroutes[LWORouteNumber].firstDur,
    // LEAVING ONE EXAMPLE TO USE LATER TO DISPLAY A SINGLE INSTANCE
    // step: function() {
      
    //   // handles only revealing the caught message once
    //   var hit_list = $(this).collision(".zipBall");
    //   var current_collision = hit_list.length != 0;

    //   var changed_collision = current_collision != $(this).data("collision");

    //   if (changed_collision) {
    //       $(this).data("collision", current_collision);
    //       $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
    //   }
    // }
  })
  .animate({
    left: x + LWOroutes[LWORouteNumber].secondX + '%',
    top: y + LWOroutes[LWORouteNumber].secondY + '%'
  }, {
    duration: LWOroutes[LWORouteNumber].secondDur,
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
  1: {firstX: 0, firstY: -45, firstDur: 1500, secondX: -3, secondY: -35, secondDur: 600},                               // curl
  2: {firstX: 0, firstY: -35, firstDur: 1500, secondX: -78, secondY: -75, secondDur: 2000},                              // post
  3: {firstX: -75, firstY: -40, firstDur: 2000, secondX: -78, secondY: -75, secondDur: 1500},                            // slant then corner
  4: {firstX: 0, firstY: -32, firstDur: 1500, secondX: -78, secondY: -32, secondDur: 1700},                              // cross
  5: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -40, secondY: -60, secondDur: 1500, thirdX: -0, thirdY: -75, thirdDur: 1500}      // post corner
}
var RWORouteNumber;

var rightWideOut = function(dur, startX, startY) {
  dur = dur || undefined;
  RWORouteNumber = Math.floor(Math.random() * 5) + 1;
  $('.RWO').animate({
      left: startX + '%',
      top: startY + '%'
    }, dur);


};
rightWideOut(undefined, 85, 92);


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
    2: {firstX: -60, firstY: -35, firstDur: 1500, secondX: -61, secondY: -80, secondDur: 1500},                                         // slant to corner
    3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 20, secondY: -30, secondDur: 800},                                             // out
    4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 20, secondY: -30, secondDur: 1000, thirdX: -60, thirdY: -30, thirdDur: 1900},  // out then in
  },
  1: {  // routes when slot is on the left
    1: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 35, secondY: -50, secondDur: 1500, thirdX: -21, thirdY: -70, thirdDur: 1500},  // post corner
    2: {firstX: 59, firstY: -35, firstDur: 1500, secondX: 60, secondY: -80, secondDur: 1500},                                           // slant to corner
    3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -20, secondY: -30, secondDur: 800},                                            // out
    4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -20, secondY: -30, secondDur: 1000, thirdX: 60, thirdY: -30, thirdDur: 1900},  // out then in
  }
};
var SLOTRouteNumber;
var generateSLOTposition = function() {
  position = Math.round(Math.random());
  SLOTRouteNumber = Math.floor(Math.random() * 4) + 1;
};

var slot = function(dur, startX, startY) {
  dur = dur || undefined;
  $('.SLOT')
  .animate({
      left: startX + '%',
      top: startY + '%'
    }, dur);

};
generateSLOTposition();
slot(undefined, SLOTposition[position], 93);


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
  });
};


/**************************************/
//          R E D  Z O N E            //
/**************************************/

// redefine these routes
// figure out a way to get more granular as we get closer, perhaps make it dynamic as we approach the end zone
  // subtract the percentage diff from the y axis as we move up
  // possibly subtract that percentage diff from the duration to speed up the shortened routes as well

var LWOredzoneRoutes = {
  1: {firstX: 0, firstY: -percentFieldDiff/2, firstDur: 1500, secondX: 3, secondY: -40, secondDur: 600},                                           // curl
  2: {firstX: 0, firstY: -percentFieldDiff/2, firstDur: 1500, secondX: 78, secondY: -percentFieldDiff, secondDur: 1900},                                         // post
  3: {firstX: 0, firstY: -percentFieldDiff/2, firstDur: 1500, secondX: 78, secondY: -percentFieldDiff/2, secondDur: 1700},                                         // cross
  4: {firstX: 0, firstY: -percentFieldDiff/6, firstDur: 1500, secondX: 40, secondY: -percentFieldDiff/3, secondDur: 1500, thirdX: 0, thirdY: -percentFieldDiff, thirdDur: 1500}, // post corner
  5: {firstX: 75, firstY: -percentFieldDiff/2, firstDur: 2000, secondX: 78, secondY: -percentFieldDiff, secondDur: 1900}                                         // slant then corner
};

var RWOredzoneRoutes = {
  1: {firstX: 0, firstY: -50, firstDur: 1500, secondX: -3, secondY: -40, secondDur: 600},                                // curl
  2: {firstX: 0, firstY: -50, firstDur: 1500, secondX: -78, secondY: -75, secondDur: 2000},                              // post
  3: {firstX: -75, firstY: -40, firstDur: 2000, secondX: -78, secondY: -75, secondDur: 1500},                            // slant then corner
  4: {firstX: 0, firstY: -50, firstDur: 1500, secondX: -78, secondY: -50, secondDur: 1700},                              // cross
  5: {firstX: 0, firstY: -40, firstDur: 1500, secondX: -40, secondY: -60, secondDur: 1500, thirdX: -0, thirdY: -75, thirdDur: 1500}      // post corner
};

var SLOTredzoneRoutes = {
  0: { // routes when slot is on the right
    1: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -35, secondY: -50, secondDur: 1500, thirdX: 21, thirdY: -70, thirdDur: 1500},  // post corner
    2: {firstX: -60, firstY: -35, firstDur: 1500, secondX: -61, secondY: -80, secondDur: 1500},                                         // slant to corner
    3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 20, secondY: -30, secondDur: 1500},                                            // out
    4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 20, secondY: -30, secondDur: 1000, thirdX: -60, thirdY: -30, thirdDur: 1900},  // out then in
  },
  1: {  // routes when slot is on the left
    1: {firstX: 0, firstY: -30, firstDur: 1500, secondX: 35, secondY: -50, secondDur: 1500, thirdX: -21, thirdY: -70, thirdDur: 1500},  // post corner
    2: {firstX: 59, firstY: -35, firstDur: 1500, secondX: 60, secondY: -80, secondDur: 1500},                                           // slant to corner
    3: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -20, secondY: -30, secondDur: 1500},                                           // out
    4: {firstX: 0, firstY: -30, firstDur: 1500, secondX: -20, secondY: -30, secondDur: 1000, thirdX: 60, thirdY: -30, thirdDur: 1900},  // out then in
  }
};


var LWOredzone = function(x, y) {
  $('.LWO').animate({
    left: x + LWOredzoneRoutes[LWORouteNumber].firstX + '%',
    top: y + LWOredzoneRoutes[LWORouteNumber].firstY + '%'
  }, {
    duration: LWOredzoneRoutes[LWORouteNumber].firstDur,
  })
  .animate({
    left: x + LWOredzoneRoutes[LWORouteNumber].secondX + '%',
    top: y + LWOredzoneRoutes[LWORouteNumber].secondY + '%'
  }, {
    duration: LWOredzoneRoutes[LWORouteNumber].secondDur,
  })
  .animate({
    left: x + LWOredzoneRoutes[LWORouteNumber].thirdX + '%',
    top: y + LWOredzoneRoutes[LWORouteNumber].thirdY + '%'
  }, {
    duration: LWOredzoneRoutes[LWORouteNumber].thirdDur,
  })
};

var RWOredzone = function(x, y) {
  $('.RWO').animate({
    left: x + RWOredzoneRoutes[RWORouteNumber].firstX + '%',
    top: y + RWOredzoneRoutes[RWORouteNumber].firstY + '%'
  }, {
    duration: RWOredzoneRoutes[RWORouteNumber].firstDur
  })
  .animate({
    left: x + RWOredzoneRoutes[RWORouteNumber].secondX + '%',
    top: y + RWOredzoneRoutes[RWORouteNumber].secondY + '%'
  }, {
    duration: RWOredzoneRoutes[RWORouteNumber].secondDur
  })
  .animate({
    left: x + RWOredzoneRoutes[RWORouteNumber].thirdX + '%',
    top: y + RWOredzoneRoutes[RWORouteNumber].thirdY + '%'
  }, {
    duration: RWOredzoneRoutes[RWORouteNumber].thirdDur
  })
};

var SLOTredzone = function(x, y) {
  $('.SLOT').animate({
    left: x + SLOTredzoneRoutes[position][SLOTRouteNumber].firstX + '%',
    top: y + SLOTredzoneRoutes[position][SLOTRouteNumber].firstY + '%'
  }, {
    duration: SLOTredzoneRoutes[position][SLOTRouteNumber].firstDur,
  })
  .animate({
    left: x + SLOTredzoneRoutes[position][SLOTRouteNumber].secondX + '%',
    top: y + SLOTredzoneRoutes[position][SLOTRouteNumber].secondY + '%'
  }, {
    duration: SLOTredzoneRoutes[position][SLOTRouteNumber].secondDur
  })
  .animate({
    left: x + SLOTredzoneRoutes[position][SLOTRouteNumber].thirdX + '%',
    top: y + SLOTredzoneRoutes[position][SLOTRouteNumber].thirdY + '%'
  }, {
    duration: SLOTredzoneRoutes[position][SLOTRouteNumber].thirdDur
  })
};







// Start the game on click
  $('#SLOTpreview').on('click', function(event) {
    var percentDiff = Math.abs(52 - $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2));
    if ($('.gameBoard').hasClass('notredzone')) {
      $('.start').hide();
      $('#SLOTpreview').hide();
      $('#RWOpreview').hide();
      $('#LWOpreview').hide();
      var SLOTx = SLOTposition[position];
      var SLOTy = ($('.SLOT').offset().top/gameOptions.height) * 100;
      var LWOx = 10;
      var LWOy = ($('.LWO').offset().top/gameOptions.height) * 100;
      var RWOx = 85;
      var RWOy = ($('.RWO').offset().top/gameOptions.height) * 100;
      RWOroute(RWOx, RWOy);
      LWOroute(LWOx, LWOy);
      SLOTroute(SLOTx, SLOTy);
    } else {
      if ($('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2) <= 32) {
        $('.start').hide();
        $('#SLOTpreview').hide();
        $('#RWOpreview').hide();
        $('#LWOpreview').hide();
        var SLOTx = SLOTposition[position];
        var SLOTy = ($('.SLOT').offset().top/gameOptions.height) * 100;
        var LWOx = 10;
        var LWOy = ($('.LWO').offset().top/gameOptions.height) * 100;
        var RWOx = 85;
        var RWOy = ($('.RWO').offset().top/gameOptions.height) * 100;
        RWOredzone(RWOx, RWOy);
        LWOredzone(LWOx, LWOy);
        SLOTredzone(SLOTx, SLOTy);
      } else {
        $('.start').hide();
        $('#SLOTpreview').hide();
        $('#RWOpreview').hide();
        $('#LWOpreview').hide();
        var SLOTx = SLOTposition[position];
        var SLOTy = ($('.SLOT').offset().top/gameOptions.height) * 100;
        var LWOx = 10;
        var LWOy = ($('.LWO').offset().top/gameOptions.height) * 100;
        var RWOx = 85;
        var RWOy = ($('.RWO').offset().top/gameOptions.height) * 100;
        RWOroute(RWOx, RWOy + percentDiff);
        LWOroute(LWOx, LWOy + percentDiff);
        SLOTroute(SLOTx, SLOTy + percentDiff);
      }
    }
  });

