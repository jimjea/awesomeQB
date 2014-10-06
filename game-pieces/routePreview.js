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
  var LWOcanvas = document.getElementById('LWOpreview'),
  LWOcontext = LWOcanvas.getContext('2d');
  var RWOcanvas = document.getElementById('RWOpreview'),
  RWOcontext = RWOcanvas.getContext('2d');
  var SLOTcanvas = document.getElementById('SLOTpreview'),
  SLOTcontext = SLOTcanvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    LWOcanvas.width = window.innerWidth;
    LWOcanvas.height = window.innerHeight;
    RWOcanvas.width = window.innerWidth;
    RWOcanvas.height = window.innerHeight;
    SLOTcanvas.width = window.innerWidth;
    SLOTcanvas.height = window.innerHeight;

    drawStuff(); 
  }
  resizeCanvas();

  function drawStuff() {
    var lwoX = 10, lwoY = 93;
    LWOcontext.moveTo(LWOcanvas.width * (lwoX/100) + 9, LWOcanvas.height * (lwoY/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].firstX)/100) + 9, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].firstY)/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].secondX)/100) + 9, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].secondY)/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].thirdX)/100) + 9, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].thirdY)/100) + 10);
    LWOcontext.globalAlpha = 0.2;
    LWOcontext.strokeStyle = "blue";
    LWOcontext.lineWidth = 10;
    LWOcontext.lineCap = "round";
    LWOcontext.stroke();
    var rwoX = 85, rwoY = 93
    RWOcontext.moveTo(RWOcanvas.width * (rwoX/100) + 9, RWOcanvas.height * (rwoY/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].firstX)/100) + 9, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].firstY)/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].secondX)/100) + 9, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].secondY)/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].thirdX)/100) + 9, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].thirdY)/100) + 10);
    RWOcontext.globalAlpha = 0.2;
    RWOcontext.strokeStyle = "red";
    RWOcontext.lineWidth = 10;
    RWOcontext.lineCap = "round";
    RWOcontext.stroke();
    var slotX = SLOTposition[position], slotY = 94
    SLOTcontext.moveTo(SLOTcanvas.width * (slotX/100) + 9, SLOTcanvas.height * (slotY/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].firstX)/100) + 9, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].firstY)/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].secondX)/100) + 9, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].secondY)/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].thirdX)/100) + 9, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].thirdY)/100) + 10);
    SLOTcontext.globalAlpha = 0.2;
    SLOTcontext.strokeStyle = "yellow";
    SLOTcontext.lineWidth = 10;
    SLOTcontext.lineCap = "round";
    SLOTcontext.stroke();
  }
};

preview();