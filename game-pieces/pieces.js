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

    var slope = (y-startY)/(x-startX);

    var zipball = function() {
      $('.ball').animate({
        left: x - 10 + 'px',
        top: y - 18 + 'px'
      }, 600)
    }
    zipball();
  });




  // Ball caught!
  var ballCaught = function() {
    // $('.gameBoard').append('<div class="caught">caught</div>');
    // $('.caught').css({position: 'absolute'}).offset().left = $(this).offset().left;
    // $('.caught').css({position: 'absolute'}).offset().top = $(this).offset().top;
    console.log('caught');
  }



  // LWO
  var leftWideOut = function() {
    $('.LWO').css({
        position: 'absolute',
        left: 30 + 'px',
        top: gameOptions.height - 25 + 'px'
      }).data('collision', false);
    $('.LWO').on('collision_start', function() {
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
        duration: 2000,
        step: function() {
          
          // handles only revealing the caught message once
          var hit_list = $(this).collision(".ball");
          var current_collision = hit_list.length != 0;

          var changed_collision = current_collision != $(this).data("collision");

          if (changed_collision) {
              $(this).data("collision", current_collision);
              $(this).trigger("collision_" + (current_collision ? "start" : "stop"));
          }

          // var hit = $('.LWO').collision('.ball');
          // if (hit.length !== 0) {
          //   // this should make the ball
          //   $(this).data('collision', true);
          //   if ($(this).data().collision) {
          //     console.log('hi')
          //   }

          //   // $('.ball').animate({
          //   //   left: 100 + 'px',
          //   //   top: -20 + 'px'
          //   // })

          //   // for (var i = 0; i < route.length; i++) {
          //   //   if (route[i] % 2 ===0) {
          //   //     $('.ball').offset().left = '100px'
          //   //   } else {
          //   //     $('.ball').offset().top = '1000px'
          //   //   }
          //   // }
          // }
        }
      })
      .animate({
        left: x + 100 + 'px',
        top: y - 460 + 'px'
      }, {
        duration: 2000,
        step: function(x, y) {
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
  $('.startGame').one('click', function(event) {
    var x = $('.LWO').offset().left;
    var y = $('.LWO').offset().top;
    LWOroute(x, y);
  });




  // RWO
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
        duration: 2000,
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
        duration: 2000,
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
  $('.startGame').one('click', function(event) {
    $('.startGame').remove();
    var x = $('.RWO').offset().left;
    var y = $('.RWO').offset().top;
    RWOroute(x, y);
  });




  // RSLOT
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
      duration: 2000,
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
      duration: 2000,
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
      duration: 2000,
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
  $('.startGame').one('click', function(event) {
    var x = $('.RSLOT').offset().left;
    var y = $('.RSLOT').offset().top;
    RSLOTroute(x, y);
  });



  // Show Route
  $('.showRoutes').on('click', function(event) {
    var RSLOTx = $('.RSLOT').offset().left;
    var RSLOTy = $('.RSLOT').offset().top;
    var RWOx = $('.RWO').offset().left;
    var RWOy = $('.RWO').offset().top;
    var LWOx = $('.LWO').offset().left;
    var LWOy = $('.LWO').offset().top;
    LWOroute(LWOx, LWOy);
    RWOroute(RWOx, RWOy);
    RSLOTroute(RSLOTx, RSLOTy);
    var reset = function(){
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
    setTimeout(reset, 6000);
  });


  // Start New Game
  $('.newGame').on('click', function() {
    location.reload();
  })
});