/**************************************/
//      L E F T  W I D E  O U T       //
/**************************************/
var leftWideOut = function() {
  $('.LWO').css({
      position: 'absolute',
      left: 30 + 'px',
      top: gameOptions.height - 25 + 'px'
    }).data('collision', false);
  $('.LWO').on('collision_start', function() {
    !('.LWO').stop();
    $('.gameBoard').append('<div>caught</div>')
  })
}
leftWideOut()

// LWO Route
  var LWOroute = function(x, y) {
    $('.LWO').animate({
      left: x + 'px',
      top: y - 270 + 'px'
    }, {
      duration: 1200,
      step: function() {
        
        // handles only revealing the caught message once
        var hit_list = $(this).collision(".ball");
        var current_collision = hit_list.length != 0;

        var changed_collision = current_collision != $(this).data("collision");

        if (changed_collision) {
            $(this).data("collision", current_collision);
            $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
        }
      }
    })
    .animate({
      left: x + 100 + 'px',
      top: y - 460 + 'px'
    }, {
      duration: 1200,
      step: function() {
        // handles only revealing the caught message once
        var hit_list = $(this).collision(".ball");
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
      top: gameOptions.height - 25 + 'px'
    }).data('collision', false);
  $('.RWO').on('collision_start', function() {
    $('.gameBoard').append('<div>caught</div>')
  })
}
rightWideOut()

// RWO Route
  var RWOroute = function(x, y) {
    $('.RWO').animate({
      left: x + 'px',
      top: y - 200 + 'px'
    }, {
      duration: 1200,
      step: function() {
        // handles only revealing the caught message once
        var hit_list = $(this).collision(".ball");
        var current_collision = hit_list.length != 0;

        var changed_collision = current_collision != $(this).data("collision");

        if (changed_collision) {
            $(this).data("collision", current_collision);
            $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
        }
      }
    })
    .animate({
      left: x - 270 + 'px',
      top: y - 200 + 'px'
    }, {
      duration: 1200,
      step: function() {
        // handles only revealing the caught message once
        var hit_list = $(this).collision(".ball");
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
//         R I G H T  S L O T         //
/**************************************/
var rightSlot = function() {
  $('.RSLOT').css({
      position: 'absolute',
      left: gameOptions.width - 85 + 'px',
      top: gameOptions.height - 20 + 'px'
    }).data('collision', false);
  $('.RSLOT').on('collision_start', function() {
    $('.gameBoard').append('<div>caught</div>')
  })
}
rightSlot()

// RSLOT Route
var RSLOTroute = function(x, y) {
  $('.RSLOT').animate({
    left: x + 'px',
    top: y - 150 + 'px'
  }, {
    duration: 1200,
    step: function() {
      // handles only revealing the caught message once
      var hit_list = $(this).collision(".ball");
      var current_collision = hit_list.length != 0;

      var changed_collision = current_collision != $(this).data("collision");

      if (changed_collision) {
          $(this).data("collision", current_collision);
          $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
      }
    }
  })
  .animate({
    left: x - 70 + 'px',
    top: y - 250 + 'px'
  }, {
    duration: 1200,
    step: function() {
      // handles only revealing the caught message once
      var hit_list = $(this).collision(".ball");
      var current_collision = hit_list.length != 0;

      var changed_collision = current_collision != $(this).data("collision");

      if (changed_collision) {
          $(this).data("collision", current_collision);
          $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
      }
    }
  })
  .animate({
    left: x + 70 + 'px',
    top: y - 400 + 'px'
  }, {
    duration: 1200,
    step: function() {
      // handles only revealing the caught message once
      var hit_list = $(this).collision(".ball");
      var current_collision = hit_list.length != 0;

      var changed_collision = current_collision != $(this).data("collision");

      if (changed_collision) {
          $(this).data("collision", current_collision);
          $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
      }
    }
  })
}


// Start the game on click
$('.startGame').on('click', function(event) {
  $('.startGame').remove();
  var RSLOTx = $('.RSLOT').offset().left;
  var RSLOTy = $('.RSLOT').offset().top;
  var LWOx = $('.LWO').offset().left;
  var LWOy = $('.LWO').offset().top;
  var RWOx = $('.RWO').offset().left;
  var RWOy = $('.RWO').offset().top;
  RWOroute(RWOx, RWOy);
  LWOroute(LWOx, LWOy);
  RSLOTroute(RSLOTx, RSLOTy);
});


