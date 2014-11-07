// helper funciton for previewing routes
var CP = function(x, y) { // calculate x and y pixel coordinates based on %
  var xPercent = x/100;
  var yPercent = y/100;

  return [gameOptions.width * xPercent, gameOptions.height * yPercent];
};



/***********************************/
//    R O U T E  P R E V I E W     //
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
    var width = $('.gameBoard').width() * .022;
    LWOcontext.moveTo(LWOcanvas.width * (lwoX/100) + width, LWOcanvas.height * (lwoY/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].firstX)/100) + width, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].firstY)/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].secondX)/100) + width, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].secondY)/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].thirdX)/100) + width, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].thirdY)/100) + 10);
    LWOcontext.globalAlpha = 0.43;
    LWOcontext.strokeStyle = "blue";
    LWOcontext.lineWidth = width;
    LWOcontext.lineCap = "round";
    LWOcontext.stroke();
    var rwoX = 85, rwoY = 93
    RWOcontext.moveTo(RWOcanvas.width * (rwoX/100) + width, RWOcanvas.height * (rwoY/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].firstX)/100) + width, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].firstY)/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].secondX)/100) + width, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].secondY)/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].thirdX)/100) + width, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].thirdY)/100) + 10);
    RWOcontext.globalAlpha = 0.43;
    RWOcontext.strokeStyle = "red";
    RWOcontext.lineWidth = width;
    RWOcontext.lineCap = "round";
    RWOcontext.stroke();
    var slotX = SLOTposition[position], slotY = 94
    SLOTcontext.moveTo(SLOTcanvas.width * (slotX/100) + width, SLOTcanvas.height * (slotY/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].firstX)/100) + width, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].firstY)/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].secondX)/100) + width, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].secondY)/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].thirdX)/100) + width, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].thirdY)/100) + 10);
    SLOTcontext.globalAlpha = 0.43;
    SLOTcontext.strokeStyle = "yellow";
    SLOTcontext.lineWidth = width;
    SLOTcontext.lineCap = "round";
    SLOTcontext.stroke();
  }
};
preview();


function previewClose(diffPercent) {
  console.log('close preview')
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
    var width = $('.gameBoard').width() * .022;
    LWOcontext.moveTo(LWOcanvas.width * (lwoX/100) + width, LWOcanvas.height * (lwoY/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].firstX)/100) + width, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].firstY)/100) + 10 + diffPercent);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].secondX)/100) + width, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].secondY)/100) + 10 + diffPercent);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOroutes[LWORouteNumber].thirdX)/100) + width, LWOcanvas.height * ((lwoY + LWOroutes[LWORouteNumber].thirdY)/100) + 10 + diffPercent);
    LWOcontext.globalAlpha = 0.43;
    LWOcontext.strokeStyle = "blue";
    LWOcontext.lineWidth = width;
    LWOcontext.lineCap = "round";
    LWOcontext.stroke();
    var rwoX = 85, rwoY = 93
    RWOcontext.moveTo(RWOcanvas.width * (rwoX/100) + width, RWOcanvas.height * (rwoY/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].firstX)/100) + width, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].firstY)/100) + 10 + diffPercent);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].secondX)/100) + width, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].secondY)/100) + 10 + diffPercent);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOroutes[RWORouteNumber].thirdX)/100) + width, RWOcanvas.height * ((rwoY + RWOroutes[RWORouteNumber].thirdY)/100) + 10 + diffPercent);
    RWOcontext.globalAlpha = 0.43;
    RWOcontext.strokeStyle = "red";
    RWOcontext.lineWidth = width;
    RWOcontext.lineCap = "round";
    RWOcontext.stroke();
    var slotX = SLOTposition[position], slotY = 94
    SLOTcontext.moveTo(SLOTcanvas.width * (slotX/100) + width, SLOTcanvas.height * (slotY/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].firstX)/100) + width, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].firstY)/100) + 10 + diffPercent);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].secondX)/100) + width, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].secondY)/100) + 10 + diffPercent);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTroutes[position][SLOTRouteNumber].thirdX)/100) + width, SLOTcanvas.height * ((slotY + SLOTroutes[position][SLOTRouteNumber].thirdY)/100) + 10 + diffPercent);
    SLOTcontext.globalAlpha = 0.43;
    SLOTcontext.strokeStyle = "yellow";
    SLOTcontext.lineWidth = width;
    SLOTcontext.lineCap = "round";
    SLOTcontext.stroke();
  }
};


function previewRedzone() {
  console.log('redzone preview')
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
    var width = $('.gameBoard').width() * .022;
    LWOcontext.moveTo(LWOcanvas.width * (lwoX/100) + width, LWOcanvas.height * (lwoY/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOredzoneRoutes[LWORouteNumber].firstX)/100) + width, LWOcanvas.height * ((lwoY + LWOredzoneRoutes[LWORouteNumber].firstY)/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOredzoneRoutes[LWORouteNumber].secondX)/100) + width, LWOcanvas.height * ((lwoY + LWOredzoneRoutes[LWORouteNumber].secondY)/100) + 10);
    LWOcontext.lineTo(LWOcanvas.width * ((lwoX + LWOredzoneRoutes[LWORouteNumber].thirdX)/100) + width, LWOcanvas.height * ((lwoY + LWOredzoneRoutes[LWORouteNumber].thirdY)/100) + 10);
    LWOcontext.globalAlpha = 0.43;
    LWOcontext.strokeStyle = "blue";
    LWOcontext.lineWidth = width;
    LWOcontext.lineCap = "round";
    LWOcontext.stroke();
    var rwoX = 85, rwoY = 93
    RWOcontext.moveTo(RWOcanvas.width * (rwoX/100) + width, RWOcanvas.height * (rwoY/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOredzoneRoutes[RWORouteNumber].firstX)/100) + width, RWOcanvas.height * ((rwoY + RWOredzoneRoutes[RWORouteNumber].firstY)/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOredzoneRoutes[RWORouteNumber].secondX)/100) + width, RWOcanvas.height * ((rwoY + RWOredzoneRoutes[RWORouteNumber].secondY)/100) + 10);
    RWOcontext.lineTo(RWOcanvas.width * ((rwoX + RWOredzoneRoutes[RWORouteNumber].thirdX)/100) + width, RWOcanvas.height * ((rwoY + RWOredzoneRoutes[RWORouteNumber].thirdY)/100) + 10);
    RWOcontext.globalAlpha = 0.43;
    RWOcontext.strokeStyle = "red";
    RWOcontext.lineWidth = width;
    RWOcontext.lineCap = "round";
    RWOcontext.stroke();
    var slotX = SLOTposition[position], slotY = 94
    SLOTcontext.moveTo(SLOTcanvas.width * (slotX/100) + width, SLOTcanvas.height * (slotY/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTredzoneRoutes[position][SLOTRouteNumber].firstX)/100) + width, SLOTcanvas.height * ((slotY + SLOTredzoneRoutes[position][SLOTRouteNumber].firstY)/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTredzoneRoutes[position][SLOTRouteNumber].secondX)/100) + width, SLOTcanvas.height * ((slotY + SLOTredzoneRoutes[position][SLOTRouteNumber].secondY)/100) + 10);
    SLOTcontext.lineTo(SLOTcanvas.width * ((slotX + SLOTredzoneRoutes[position][SLOTRouteNumber].thirdX)/100) + width, SLOTcanvas.height * ((slotY + SLOTredzoneRoutes[position][SLOTRouteNumber].thirdY)/100) + 10);
    SLOTcontext.globalAlpha = 0.43;
    SLOTcontext.strokeStyle = "yellow";
    SLOTcontext.lineWidth = width;
    SLOTcontext.lineCap = "round";
    SLOTcontext.stroke();
  }
};