// helper funciton for previewing routes
var CP = function(x, y) { // calculate x and y pixel coordinates based on %
  var xPercent = x/100;
  var yPercent = y/100;

  return [gameOptions.width * xPercent, gameOptions.height * yPercent];
};


/***********************************/
//       L W O  P R E V I E W      //
/***********************************/

function LWOpreview() {
  var canvas = document.getElementById('preview'),
  context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawStuff(); 
  }
  resizeCanvas();

  function drawStuff() {
    context.moveTo(canvas.width -100, canvas.height - 400);
    context.lineTo(200, 200);
    context.globalAlpha = 0.2;
    context.strokeStyle = "blue";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();
  }
};

/***********************************/
//       R W O  P R E V I E W      //
/***********************************/

function RWOpreview() {
  var canvas = document.getElementById('preview'),
  context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawStuff(); 
  }
  resizeCanvas();

  function drawStuff() {
    context.moveTo(canvas.width -100, canvas.height - 400);
    context.lineTo(200, 200);
    context.globalAlpha = 0.2;
    context.strokeStyle = "blue";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();
  }
};

/***********************************/
//     S L O T  P R E V I E W      //
/***********************************/

function SLOTpreview() {
  var canvas = document.getElementById('preview'),
  context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawStuff(); 
  }
  resizeCanvas();

  function drawStuff() {
    context.moveTo(canvas.width -100, canvas.height - 400);
    context.lineTo(200, 200);
    context.globalAlpha = 0.2;
    context.strokeStyle = "blue";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();
  }
};

// var LWOpreview = document.getElementById("preview");
// var LWOtx = LWOpreview.getContext("2d");
// var LWOstart = CP(10, 93);
// LWOtx.moveTo(LWOstart[0] + 9, LWOstart[1] + 10);
// var LWOFirstMove = CP(10 + LWOroutes[LWORouteNumber].firstX, 93 + LWOroutes[LWORouteNumber].firstY);
// LWOtx.lineTo(LWOFirstMove[0] + 9, LWOFirstMove[1] + 10);
// LWOtx.lineTo(LWOFirstMove[0] + 9, LWOFirstMove[1] + 10);
// var LWOSecondMove = CP(10 + LWOroutes[LWORouteNumber].secondX, 93 + LWOroutes[LWORouteNumber].secondY);
// LWOtx.lineTo(LWOSecondMove[0] + 9, LWOSecondMove[1] + 10);
// LWOtx.lineTo(LWOSecondMove[0] + 9, LWOSecondMove[1] + 10);
// var LWOThirdMove = CP(10 + LWOroutes[LWORouteNumber].thirdX, 93 + LWOroutes[LWORouteNumber].thirdY);
// LWOtx.lineTo(LWOThirdMove[0] + 9, LWOThirdMove[1] + 10);
// LWOtx.lineTo(LWOThirdMove[0] + 9, LWOThirdMove[1] + 10);
// LWOtx.globalAlpha = 0.2;
// LWOtx.strokeStyle = "blue";
// LWOtx.lineWidth = 10;
// LWOtx.lineCap = "round";
// LWOtx.stroke();




// var RWOpreview = document.getElementById("preview");
// var RWOtx = RWOpreview.getContext("2d");
// var RWOstart = CP(85, 93);
// RWOtx.moveTo(RWOstart[0] + 9, RWOstart[1] + 10);
// var RWOFirstMove = CP(85 + RWOroutes[RWORouteNumber].firstX, 93 + RWOroutes[RWORouteNumber].firstY);
// RWOtx.lineTo(RWOFirstMove[0] + 9, RWOFirstMove[1] + 10);
// var RWOSecondMove = CP(85 + RWOroutes[RWORouteNumber].secondX, 93 + RWOroutes[RWORouteNumber].secondY);
// RWOtx.lineTo(RWOSecondMove[0] + 9, RWOSecondMove[1] + 10);
// var RWOThirdMove = CP(85 + RWOroutes[RWORouteNumber].thirdX, 93 + RWOroutes[RWORouteNumber].thirdY);
// RWOtx.lineTo(RWOThirdMove[0] + 9, RWOThirdMove[1] + 10);
// RWOtx.globalAlpha = 0.2;
// RWOtx.strokeStyle = "red";
// RWOtx.lineWidth = 10;
// RWOtx.lineCap = "round";
// RWOtx.stroke();




// var SLOTpreview = document.getElementById("preview");
// var SLOTtx = SLOTpreview.getContext("2d");
// var SLOTstart = CP(SLOTposition[position], 94);
// SLOTtx.moveTo(SLOTstart[0] + 9, SLOTstart[1] + 10);
// var SLOTFirstMove = CP(SLOTposition[position] + SLOTroutes[position][SLOTRouteNumber].firstX, 94 + SLOTroutes[position][SLOTRouteNumber].firstY);
// SLOTtx.lineTo(SLOTFirstMove[0] + 9, SLOTFirstMove[1] + 10);
// var SLOTSecondMove = CP(SLOTposition[position] + SLOTroutes[position][SLOTRouteNumber].secondX, 94 + SLOTroutes[position][SLOTRouteNumber].secondY);
// SLOTtx.lineTo(SLOTSecondMove[0] + 9, SLOTSecondMove[1] + 10);
// var SLOTThirdMove = CP(SLOTposition[position] + SLOTroutes[position][SLOTRouteNumber].thirdX, 94 + SLOTroutes[position][SLOTRouteNumber].thirdY);
// SLOTtx.lineTo(SLOTThirdMove[0] + 9, SLOTThirdMove[1] + 10);
// SLOTtx.globalAlpha = 0.4;
// SLOTtx.strokeStyle = "white";
// SLOTtx.lineWidth = 10;
// SLOTtx.lineCap = "round";
// SLOTtx.stroke();