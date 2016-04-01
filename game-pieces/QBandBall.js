// DESIGN:
  // init will initiate things like height/width, placing the endzone, etc., and then instantiate gameboard with


// for purposes of responsiveness
// MOVE: init
var gameOptions = {
  width: $(window).width(),
  height: $(window).height()
};

// stores state for only throwing the ball once
// MOVE: BALL
var notThrown = true;

// accounts for percent change for moving background image in ball throwing logic
// MOVE: GAME BOARD
var percentChange = function(num1, num2) {
  var diff = num1 - num2;
  return (diff/gameOptions.height * 100);
};

/**************************************/
//           E N D Z O N E            //
/**************************************/
// MOVE: GAME BOARD
var placeEndzone = function(top) {
  $('.endzone').offset({
    top: top
  });
};
// MOVE: INIT
$(document).ready(function(){


  /**************************************/
  //                Q B                 //
  /**************************************/
  // MOVE: QB
  var placeqb = function(startX, startY) {
    $('.qb').animate({
      left: startX + '%',
      top: startY + '%'
    }, 400);
  };

  var hikeqb = function() {
    $('.qb').animate({
      top: ($('.qb').position().top/gameOptions.height) * 100 + 1.5 + '%'
    });
  };




  /**************************************/
  //               B A L L              //
  /**************************************/
  // MOVE: BALL
  var placeball = function(startX, startY) {
    $('.lobBall, .zipBall').css({
      left: startX + '%',
      top: startY + '%'
    });
  };

  var hikeball = function() {
    $('.lobBall, .zipBall').animate({
      left: ($('.lobBall').position().left/gameOptions.width) * 100 + 1.5 + '%',
      top: ($('.lobBall').position().top/gameOptions.height) * 100 + 3 + '%'
    });
  };

  // MOVE: GAME BOARD
  $('#SLOTpreview').on('click', function() {
    hikeball();
    hikeqb();
  });

  // throw ball to mouse on click
  // ball handles all collision logic
  // MOVE: GAME BOARD
  // DEPENDENCY INJECTION: INIT, QB, BALL, RECEIVER, ROUTES PREVIEW
  $('.gameBoard').on('touchstart', function(e) {
    e.preventDefault();

    var x = e.originalEvent.touches[0].clientX;
    var y = e.originalEvent.touches[0].clientY;
    var startX = gameOptions.width * .505;
    var startY = gameOptions.height * .955;

      // starting location of zipping the ball (creates a rectangular area for your thumb)
      if (x < gameOptions.width * .6 && x > gameOptions.width * .4 && y > gameOptions.height * .9 && y < gameOptions.height) {
        // add zipping-ball class to game board, then delete zipping-ball class once it is zipped
        $('.gameBoard').addClass('zipping-ball');
        var LWOtoggle = false;
        var RWOtoggle = false;
        var SLOTtoggle = false;
        $('.lobBall').hide();

        // stays within the gameboard 'touch start' event
        $('.gameBoard').on('touchend', function(ev){
          // this is where the branching of whether to zip or lob happens
          if ($(this).hasClass('zipping-ball')) {

            // I should really pass 'ev' into the Ball dependency and have the Ball handle anything related to the ball
          var duration = 1200;
          var rise = -(ev.originalEvent.changedTouches[0].clientY - y);
          var run = ev.originalEvent.changedTouches[0].clientX - x;
          var newX = $('.zipBall').position().left;
          var newY = $('.zipBall').position().top;
          var distanceToFling = gameOptions.height;

          if (rise/run === Infinity) {
            duration = 500;
          } else if (Math.abs(rise/run) > 5) {
            duration = 2200;
          }

          if (run == 0) {
            if (rise > 0) {
              newY -= distanceToFling;
            }
          } else {
            if (run > 0) {
              newX += distanceToFling;
              newY -= (rise/run) * distanceToFling;
            }
            else {
              newX -= distanceToFling;
              newY += (rise/run) * distanceToFling;
            }
          }


          var angle = Math.atan2(x - ev.originalEvent.changedTouches[0].clientX, y - ev.originalEvent.changedTouches[0].clientY);
          var degree = -angle * (180/Math.PI)
          $('.zipBall').css('-webkit-transform', 'rotate(' + degree + 'deg)')
          // See last comment, include all of this in Ball dependency

          // import { ZipBall } from ./ball.js
          var zipBall = function(/* add ev from the gameboard, called gameboardEvents*/) {
            $('.zipBall').animate({
               left: newX,
               top: newY
              }, {
                duration: duration,
                step: function() {
                  // wondering if this will be an issue with new dependecy structure
                  // TODO: IMPORTANT. Will I be able to simply inject receivers and ball into gameboard and have them access each other? I believe so. Since the ball scope will look up to find
                  var LWOhit = $(this).collision('.LWO');
                  var RWOhit = $(this).collision('.RWO');
                  var SLOThit = $(this).collision('.SLOT');

                  var gameboardHeight = gameOptions.height;

                  if (LWOhit.length > 0) {
                    var LWOposition = $('.LWO').position();
                    LWOtoggle = true;
                    $('.LWO').stop(true, false);
                    $('.zipBall').stop(false, false).animate({top: LWOposition.top, left: LWOposition.left}).css('-webkit-transform', 'rotate(0deg)');
                    $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: LWOposition.top - $('.caught').height()/4, left: LWOposition.left - $('.caught').width()/4}).show();
                    setTimeout(function(){$('.caught').hide()}, 400);
                  }

                  if (RWOhit.length > 0) {
                    var RWOposition = $('.RWO').position();
                    RWOtoggle = true;
                    $('.RWO').stop(true, false);
                    $('.zipBall').stop(false, false).animate({top: RWOposition.top, left: RWOposition.left}).css('-webkit-transform', 'rotate(0deg)');
                    $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: RWOposition.top - $('.caught').height()/4, left: RWOposition.left - $('.caught').width()/4}).show();
                    setTimeout(function(){$('.caught').hide()}, 400);
                  }

                  if (SLOThit.length > 0) {
                    var SLOTposition = $('.SLOT').position();
                    SLOTtoggle = true;
                    $('.SLOT').stop(true, false);
                    $('.zipBall').stop(false, false).animate({top: SLOTposition.top, left: SLOTposition.left}).css('-webkit-transform', 'rotate(0deg)');
                    $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: SLOTposition.top - $('.caught').height()/4, left: SLOTposition.left - $('.caught').width()/4}).show();
                    setTimeout(function(){$('.caught').hide()}, 400);

                  }
                },
                done: function(x) {
                  // TODO: refactor this out so we can reuse it when the zipped ball stops
                  // figure out what variables are being called from the parent scope
                    // y, ev,
                  $('.gameBoard').removeClass('zipping-ball');
                  var gameboardHeight = $('.gameBoard').height();  // for scaling the background image
                  var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
                  var diff = percentChange(y, ev.originalEvent.changedTouches[0].clientY);

                  newBackgroundPosition = currentYPercent - diff/2 < 13.5 ? 13.5 : currentYPercent - diff/1.5;

                  $('.LWO').stop(true, false);
                  $('.RWO').stop(true, false);
                  $('.SLOT').stop(true, false);

                  if (LWOtoggle || RWOtoggle || SLOTtoggle) {
                    setTimeout(function(){

                      LWOtoggle = false;
                      RWOtoggle = false;
                      SLOTtoggle = false;


                      $('.gameBoard').animate({
                        'background-position-x': '50%',
                        'background-position-y': newBackgroundPosition + '%'
                      }, 2000);

                      placeqb(48, 94);
                      placeball(49, 92);
                      leftWideOut(2000, 10, 92);
                      rightWideOut(2000, 85, 92);
                      generateSLOTposition();
                      slot(2000, SLOTposition[position], 93);

                    }, 1000);
                  } else {
                    LWOtoggle = false;
                    RWOtoggle = false;
                    SLOTtoggle = false;

                    $('.zipBall .lobBall').hide();

                    placeqb(48, 94);
                    placeball(49, 92);
                    leftWideOut(1000, 10, 92);
                    rightWideOut(1000, 85, 92);
                    generateSLOTposition();
                    slot(1000, SLOTposition[position], 93);
                  }

                }
            });
          }
            if (notThrown) {
              zipBall();
              notThrown = false;
            }
          }
        });

      } else {
          // again, put this all in Ball dependency

          // set ball timing based on distance thrown
          // broken up into thirds of the field
          var setBallDuration = function() {
            var start = 95;
            var ballTravel = y/gameOptions.height * 100;
            var distancePercent = start - ballTravel;
            if (distancePercent < 20) {
              return [135, 1000];
            } else if (distancePercent < 40 && distancePercent > 20) {
              return [150, 1200];
            } else if (distancePercent < 60 && distancePercent > 40) {
              return [190, 1400];
            } else if (distancePercent < 80 && distancePercent > 60) {
              return [210, 1600];
            } else {
              return [230, 1800];
            }
          };

          // turning the ball
          var angle = Math.atan2(startX-x,startY-y);
          var degree = -angle * (180/Math.PI);
          $('.lobBall').css('-webkit-transform', 'rotate(' + degree + 'deg)');

          // Use this code for resize ball animation
          var ballHeight = gameOptions.height * .04;
          var ballWidth = gameOptions.width * .03;
          var ballXrotation = 0;
          var count = setBallDuration()[0];
          var increment = count;


          // Lobbing the ball on click will only allow the receiver to catch it as the ball ends its animation
          var lobBall = function() {
            $('.zipBall').hide();
            $('.lobBall').animate({
              left: x - $('.lobBall').width()/2 + 'px',
              top: y - $('.lobBall').height()/2  + 'px'
            }, {
              duration: setBallDuration()[1],

              // adjusts the size of the ball as it travels)
              step: function(ev) {
                increment--;
                if (increment > count/2) { // mobile: 1.5, web: 2
                  ballHeight += .5;
                  ballWidth += .45;
                } else {
                  ballHeight -= .5;
                  ballWidth -= .45;
                }
                $('.lobBall').css({height: ballHeight, width: ballWidth});
              },
              done: function(event) {
                $('.lobBall').height(gameOptions.height * .04).width(gameOptions.width * .03).css('-webkit-transform', 'rotate(0deg)');
                var LWOHit = $(this).collision(".LWO").length;
                var RWOHit = $(this).collision(".RWO").length;
                var SLOTHit = $(this).collision(".SLOT").length;

                // logic for moving background image
                var gameboardHeight = $('.gameBoard').height();  // for scaling the background image
                var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
                var diff = percentChange(startY, event.elem.offsetTop);
                newBackgroundPosition = currentYPercent - diff/2  < 13.5 ? 13.5 : currentYPercent - diff/2;

                if (LWOHit) {
                  var currentLWOposition = $('.LWO').position();

                  // stops receiver and ball animation
                  $('.LWO').stop(true, false).animate({top: (event.tweens[1].end/gameboardHeight) * 100 - 3 + '%'}, 800);
                  $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);

                  // signifies a catch
                  $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentLWOposition.top - $('.caught').height()/4, left: currentLWOposition.left - $('.caught').width()/4}).show();
                  setTimeout(function(){$('.caught').hide();}, 400);


                  // touchdown logic
                    // find the earliest spot where the endzone appears
                      // make touchdown catch based on location
                    // increment up


                  // handles reseting play
                  var resetLWO = function() {

                    $('.gameBoard').animate({
                      'background-position-x': '50%',
                      'background-position-y': newBackgroundPosition + '%'
                    }, 2000);

                    $('.RWO').stop(true, false);
                    $('.SLOT').stop(true, false);


                    placeqb(48, 94);
                    placeball(49, 92);
                    leftWideOut(2000, 10, 92);
                    rightWideOut(2000, 85, 92);
                    generateSLOTposition();
                    slot(2000, SLOTposition[position], 93);




                  };

                  setTimeout(resetLWO, 1000);

                } else if (RWOHit) {
                  var currentRWOposition = $('.RWO').position();
                  $('.RWO').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
                  $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);

                  $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentRWOposition.top - $('.caught').height()/4, left: currentRWOposition.left - $('.caught').width()/4}).show();
                  setTimeout(function(){$('.caught').hide()}, 400);



                  setTimeout(function(){

                    $('.gameBoard').animate({
                      'background-position-x': '50%',
                      'background-position-y': newBackgroundPosition + '%'
                    }, 2000);

                    $('.LWO').stop(true, false);
                    $('.SLOT').stop(true, false);

                    placeqb(48, 94);
                    placeball(49, 92);
                    leftWideOut(2000, 10, 92);
                    rightWideOut(2000, 85, 92);
                    generateSLOTposition();
                    slot(2000, SLOTposition[position], 93);

                  }, 1000);

                } else if (SLOTHit) {
                  var currentSLOTposition = $('.SLOT').position();
                  $('.SLOT').stop(true, false).animate({top: event.tweens[1].end - 25 + 'px'}, 800);
                  $('.lobBall').animate({top: event.tweens[1].end - 25 + 'px'}, 800);

                  $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentSLOTposition.top - $('.caught').height()/4, left: currentSLOTposition.left - $('.caught').width()/4}).show();
                  setTimeout(function(){$('.caught').hide()}, 400);



                  setTimeout(function(){

                    $('.gameBoard').animate({
                      'background-position-x': '50%',
                      'background-position-y': newBackgroundPosition + '%'
                    }, 2000);

                    $('.RWO').stop(true, false);
                    $('.LWO').stop(true, false);

                    placeqb(48, 94);
                    placeball(49, 92);
                    leftWideOut(2000, 10, 92);
                    rightWideOut(2000, 85, 92);
                    generateSLOTposition();
                    slot(2000, SLOTposition[position], 93);

                  }, 1000);

                } else {
                  var currentBallPosition = $('.lobBall').position();
                  $('.incomplete').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: currentBallPosition.top - $('.lobBall').height() - 10, left: currentBallPosition.left - $('.lobBall').width() - 10}).show();
                  setTimeout(function(){$('.incomplete').hide()}, 400);
                  $('.lobBall').animate({top: event.tweens[1].end - 8 + 'px', left: event.tweens[0].end + 1 + 'px'}, 800);
                  $('.LWO').stop(true, false).animate({top: $('.LWO')[0].offsetTop - 10, left: $('.LWO')[0].offsetLeft + 15}, 800);
                  $('.RWO').stop(true, false).animate({top: $('.RWO')[0].offsetTop - 6, left: $('.RWO')[0].offsetLeft - 15}, 800);
                  $('.SLOT').stop(true, false).animate({top: $('.SLOT')[0].offsetTop - 7, left: $('.SLOT')[0].offsetLeft}, 800);

                  setTimeout(function(){

                    // if (newBackgroundPosition > 0) {

                      placeqb(48, 94);
                      placeball(49, 92);
                      leftWideOut(1000, 10, 92);
                      rightWideOut(1000, 85, 92);
                      generateSLOTposition();
                      slot(1000, SLOTposition[position], 93);

                    // } else {

                    //   placeqb(48, 94 - redzoneTop);
                    //   placeball(49, 92 - redzoneTop);
                    //   leftWideOut(2000, 10, 92 - redzoneTop);
                    //   rightWideOut(2000, 85, 92 - redzoneTop);
                    //   generateSLOTposition();
                    //   slot(2000, SLOTposition[position], 93 - redzoneTop);
                    // }

                  }, 1000);
                }

                // Signals touchdown
                // moves endzone as field scales
                var moveEndzone = Math.abs(52 - currentYPercent - 5);
                // touchdown logic
                var touchdown = $(this).collision(".endzone").length;
                if (RWOHit && touchdown || LWOHit && touchdown || SLOTHit && touchdown) {
                  console.log('touchdown')
                }

                // setTimeout(function(){location.reload()}, 1000);
              }
            })
          }
        if (notThrown) {
          lobBall();
          notThrown = false;
        }
      }

  });



  // zips ball in a straight on on flick
  // receiver can catch the ball anywhere in the line


  // ******************* FLICKING HAS ISSUES
  // ******************* ON RWO OR LWO CATCH, SLOT DOESN'T RESET
  // ******************* AFTER ONE INCOMPLETE, A LOB WILL TRIGGER INCOMPLETE FOR THE ZIPBALL TWICE



    // $('.gameBoard').on('touchstart', function (event) {
    //   event.preventDefault();
    //   startDownX = event.originalEvent.touches[0].clientX;
    //   startDownY = event.originalEvent.touches[0].clientY;


    //   if (startDownX < gameOptions.width * .6 && startDownX > gameOptions.width * .4 && startDownY > gameOptions.height * .9 && startDownY < gameOptions.height) {
    //   // add zipping-ball class to game board, then delete zipping-ball class once it is zipped
    //     $('.gameBoard').addClass('zipping-ball');
    //     var LWOtoggle = false;
    //     var RWOtoggle = false;
    //     var SLOTtoggle = false;
    //     $('.lobBall').hide();

    //     $('.gameBoard').on('touchend', function(ev){
    //       if ($(this).hasClass('zipping-ball')) {

    //       var duration = 1200;
    //       var rise = -(ev.originalEvent.changedTouches[0].clientY - startDownY);
    //       var run = ev.originalEvent.changedTouches[0].clientX - startDownX;
    //       var newX = $('.zipBall').position().left;
    //       var newY = $('.zipBall').position().top;
    //       var distanceToFling = gameOptions.height;

    //       if (rise/run === Infinity) {
    //         duration = 500;
    //       } else if (Math.abs(rise/run) > 5) {
    //         duration = 2200;
    //       }

    //       if (run == 0) {
    //         if (rise > 0) {
    //           newY -= distanceToFling;
    //         }
    //       } else {
    //         if (run > 0) {
    //           newX += distanceToFling;
    //           newY -= (rise/run) * distanceToFling;
    //         }
    //         else {
    //           newX -= distanceToFling;
    //           newY += (rise/run) * distanceToFling;
    //         }
    //       }


    //       var angle = Math.atan2(startDownX - ev.originalEvent.changedTouches[0].clientX, startDownY - ev.originalEvent.changedTouches[0].clientY)
    //       var degree = -angle * (180/Math.PI)
    //       $('.zipBall').css('-webkit-transform', 'rotate(' + degree + 'deg)')


    //       var zipBall = function() {
    //         $('.zipBall').animate({
    //            left: newX,
    //            top: newY
    //           }, {
    //             duration: duration,
    //             step: function() {
    //               var LWOhit = $(this).collision('.LWO');
    //               var RWOhit = $(this).collision('.RWO');
    //               var SLOThit = $(this).collision('.SLOT');

    //               var gameboardHeight = $('.gameBoard').height();

    //               if (LWOhit.length > 0) {
    //                 var LWOposition = $('.LWO').position();
    //                 LWOtoggle = true;
    //                 $('.LWO').stop(true, false);
    //                 $('.zipBall').stop(true, true).animate({top: LWOposition.top, left: LWOposition.left}).css('-webkit-transform', 'rotate(0deg)');
    //                 $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: LWOposition.top - $('.caught').height()/4, left: LWOposition.left - $('.caught').width()/4}).show();
    //                 setTimeout(function(){$('.caught').hide()}, 400);
    //               }

    //               if (RWOhit.length > 0) {
    //                 var RWOposition = $('.RWO').position();
    //                 RWOtoggle = true;
    //                 $('.RWO').stop(true, false);
    //                 $('.zipBall').stop(true, true).animate({top: RWOposition.top, left: RWOposition.left}).css('-webkit-transform', 'rotate(0deg)');
    //                 $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: RWOposition.top - $('.caught').height()/4, left: RWOposition.left - $('.caught').width()/4}).show();
    //                 setTimeout(function(){$('.caught').hide()}, 400);

    //               }

    //               if (SLOThit.length > 0) {
    //                 var SLOTposition = $('.SLOT').position();
    //                 SLOTtoggle = true;
    //                 $('.SLOT').stop(true, false);
    //                 $('.zipBall').stop(true, true).animate({top: SLOTposition.top, left: SLOTposition.left}).css('-webkit-transform', 'rotate(0deg)');
    //                 $('.caught').css({height: gameboardHeight * .11, width: gameboardHeight * .12, top: SLOTposition.top - $('.caught').height()/4, left: SLOTposition.left - $('.caught').width()/4}).show();
    //                 setTimeout(function(){$('.caught').hide()}, 400);

    //               }
    //             },
    //             done: function(x) {
    //               $('.gameBoard').removeClass('zipping-ball');
    //               var gameboardHeight = $('.gameBoard').height();  // for scaling the background image
    //               var currentYPercent = $('.gameBoard').css('backgroundPosition').split(' ')[1].slice(0,2);
    //               var diff = percentChange(startDownY, ev.originalEvent.changedTouches[0].clientY);

    //               newBackgroundPosition = currentYPercent - diff/2 < 13.5 ? 13.5 : currentYPercent - diff/1.5;

    //               $('.LWO').stop(true, false);
    //               $('.RWO').stop(true, false);
    //               $('.SLOT').stop(true, false);

    //               if (LWOtoggle || RWOtoggle || SLOTtoggle) {
    //                 setTimeout(function(){

    //                   LWOtoggle = false;
    //                   RWOtoggle = false;
    //                   SLOTtoggle = false;


    //                   $('.gameBoard').animate({
    //                     'background-position-x': '50%',
    //                     'background-position-y': newBackgroundPosition + '%'
    //                   }, 2000);

    //                   placeqb(48, 94);
    //                   placeball(49, 92);
    //                   leftWideOut(2000, 10, 92);
    //                   rightWideOut(2000, 85, 92);
    //                   generateSLOTposition();
    //                   slot(2000, SLOTposition[position], 93);

    //                 }, 1000);
    //               } else {
    //                 LWOtoggle = false;
    //                 RWOtoggle = false;
    //                 SLOTtoggle = false;

    //                 $('.zipBall .lobBall').hide();

    //                 placeqb(48, 94);
    //                 placeball(49, 92);
    //                 leftWideOut(1000, 10, 92);
    //                 rightWideOut(1000, 85, 92);
    //                 generateSLOTposition();
    //                 slot(1000, SLOTposition[position], 93);
    //               }

    //             }
    //         });
    //       }
    //       }
    //       if (notThrown) {
    //         if (!zipBall) {
    //           return;
    //         } else {
    //           zipBall();
    //           notThrown = false;
    //         }
    //       }
    //     });

    //   } else {
    //     console.log(' hi ')
    //   }
    // });



    // potential solution for allowing both throwing methods: place both zipball and lobball in the same click event



});
