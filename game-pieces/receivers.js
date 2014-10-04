/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/
var LWOroutes = {
  1: {firstX: 0, firstY: -270, secondX: 100, secondY: -460}, // post
  2: {firstX: 0, firstY: -270, secondX: 10, secondY: -150}   // curl
}

var leftWideOut = function() {
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
    var routeNumber = Math.floor(Math.random() * 2) + 1;
    $('.LWO').animate({
      left: x + LWOroutes[routeNumber].firstX + 'px',
      top: y + LWOroutes[routeNumber].firstY + 'px'
    }, {
      duration: 1200,
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
      left: x + LWOroutes[routeNumber].secondX + 'px',
      top: y + LWOroutes[routeNumber].secondY + 'px'
    }, {
      duration: 1200,
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
  }



/**************************************/
//     R I G H T  W I D E  O U T      //
/**************************************/
var rightWideOut = function() {
  $('.RWO').css({
      position: 'absolute',
      left: gameOptions.width - 30 + 'px',
      top: gameOptions.height - 30 + 'px'
    })
};
rightWideOut()

// RWO Route
  var RWOroute = function(x, y) {
    $('.RWO').animate({
      left: x + 'px',
      top: y - 200 + 'px'
    }, {
      duration: 1200
    })
    .animate({
      left: x - 270 + 'px',
      top: y - 200 + 'px'
    }, {
      duration: 1200,
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
    duration: 1200,
  })
  .animate({
    left: x - 70 + 'px',
    top: y - 250 + 'px'
  }, {
    duration: 1200
  })
  .animate({
    left: x + 70 + 'px',
    top: y - 400 + 'px'
  }, {
    duration: 1200
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
  setTimeout(reset, 3900);
});
