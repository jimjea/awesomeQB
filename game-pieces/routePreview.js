// helper funciton for previewing routes
var CP = function(x, y) { // calculate x and y pixel coordinates based on %
  var xPercent = x/100;
  var yPercent = y/100;

  return [gameOptions.width * xPercent, gameOptions.height * yPercent];
};


/***********************************/
//       L W O  P R E V I E W      //
/***********************************/

function preview() {
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
    var lwoX = 10, lwoY = 93;
    context.moveTo(canvas.width * (lwoX/100) + 9, canvas.height * (lwoY/100) + 10);
    context.lineTo(canvas.width * ((lwoX + LWOroutes[LWORouteNumber].firstX)/100) + 9, canvas.height * ((lwoY + LWOroutes[LWORouteNumber].firstY)/100) + 10);
    context.lineTo(canvas.width * ((lwoX + LWOroutes[LWORouteNumber].secondX)/100) + 9, canvas.height * ((lwoY + LWOroutes[LWORouteNumber].secondY)/100) + 10);
    context.lineTo(canvas.width * ((lwoX + LWOroutes[LWORouteNumber].thirdX)/100) + 9, canvas.height * ((lwoY + LWOroutes[LWORouteNumber].thirdY)/100) + 10);
    context.globalAlpha = 0.2;
    context.strokeStyle = "blue";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();
    var rwoX = 85, rwoY = 93
    context.moveTo(canvas.width * (rwoX/100) + 9, canvas.height * (rwoY/100) + 10);
    context.lineTo(canvas.width * ((rwoX + RWOroutes[RWORouteNumber].firstX)/100) + 9, canvas.height * ((rwoY + RWOroutes[RWORouteNumber].firstY)/100) + 10);
    context.lineTo(canvas.width * ((rwoX + RWOroutes[RWORouteNumber].secondX)/100) + 9, canvas.height * ((rwoY + RWOroutes[RWORouteNumber].secondY)/100) + 10);
    context.lineTo(canvas.width * ((rwoX + RWOroutes[RWORouteNumber].thirdX)/100) + 9, canvas.height * ((rwoY + RWOroutes[RWORouteNumber].thirdY)/100) + 10);
    context.globalAlpha = 0.2;
    context.strokeStyle = "red";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();
    var slotX = SLOTposition[position], slotY = 94
    context.moveTo(canvas.width * (slotX/100) + 9, canvas.height * (slotY/100) + 10);
    context.lineTo(canvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].firstX)/100) + 9, canvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].firstY)/100) + 10);
    context.lineTo(canvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].secondX)/100) + 9, canvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].secondY)/100) + 10);
    context.lineTo(canvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].thirdX)/100) + 9, canvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].thirdY)/100) + 10);
    context.globalAlpha = 0.2;
    context.strokeStyle = "yellow";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.stroke();
  }
};

preview();