// helper funciton for previewing routes
var CP = function(x, y) { // calculate x and y pixel coordinates based on %
  var xPercent = x/100;
  var yPercent = y/100;
  // console.log(gameOptions.width * .75)
  return [xPercent, yPercent];
};


  /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var LWOpreview = document.getElementById("preview");
  var LWOtx = LWOpreview.getContext("2d");
  var LWOstart = CP(10, 93);
  LWOtx.moveTo(LWOstart[0] + 9, LWOstart[1] + 10);
  var LWOFirstMove = CP(10 + LWOroutes[LWORouteNumber].firstX, 93 + LWOroutes[LWORouteNumber].firstY);
  LWOtx.lineTo(LWOFirstMove[0] + 9, LWOFirstMove[1] + 10);
  LWOtx.lineTo(LWOFirstMove[0] + 9, LWOFirstMove[1] + 10);
  var LWOSecondMove = CP(10 + LWOroutes[LWORouteNumber].secondX, 93 + LWOroutes[LWORouteNumber].secondY);
  LWOtx.lineTo(LWOSecondMove[0] + 9, LWOSecondMove[1] + 10);
  LWOtx.lineTo(LWOSecondMove[0] + 9, LWOSecondMove[1] + 10);
  var LWOThirdMove = CP(10 + LWOroutes[LWORouteNumber].thirdX, 93 + LWOroutes[LWORouteNumber].thirdY);
  LWOtx.lineTo(LWOThirdMove[0] + 9, LWOThirdMove[1] + 10);
  LWOtx.lineTo(LWOThirdMove[0] + 9, LWOThirdMove[1] + 10);
  LWOtx.globalAlpha = 0.2;
  LWOtx.strokeStyle = "blue";
  LWOtx.lineWidth = 10;
  LWOtx.lineCap = "round";
  LWOtx.stroke();



    /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var RWOpreview = document.getElementById("preview");
  var RWOtx = RWOpreview.getContext("2d");
  var RWOstart = CP(85, 93);
  RWOtx.moveTo(RWOstart[0] + 9, RWOstart[1] + 10);
  var RWOFirstMove = CP(85 + RWOroutes[RWORouteNumber].firstX, 93 + RWOroutes[RWORouteNumber].firstY);
  RWOtx.lineTo(RWOFirstMove[0] + 9, RWOFirstMove[1] + 10);
  var RWOSecondMove = CP(85 + RWOroutes[RWORouteNumber].secondX, 93 + RWOroutes[RWORouteNumber].secondY);
  RWOtx.lineTo(RWOSecondMove[0] + 9, RWOSecondMove[1] + 10);
  var RWOThirdMove = CP(85 + RWOroutes[RWORouteNumber].thirdX, 93 + RWOroutes[RWORouteNumber].thirdY);
  RWOtx.lineTo(RWOThirdMove[0] + 9, RWOThirdMove[1] + 10);
  RWOtx.globalAlpha = 0.2;
  RWOtx.strokeStyle = "red";
  RWOtx.lineWidth = 10;
  RWOtx.lineCap = "round";
  RWOtx.stroke();



  /***********************************/
  //     C A N V A S  L O G I C      //
  /***********************************/
  var SLOTpreview = document.getElementById("preview");
  var SLOTtx = SLOTpreview.getContext("2d");
  var SLOTstart = CP(startX, startY);
  SLOTtx.moveTo(SLOTstart[0] + 9, SLOTstart[1] + 10);
  var SLOTFirstMove = CP(startX + SLOTroutes[position][SLOTRouteNumber].firstX, startY + SLOTroutes[position][SLOTRouteNumber].firstY);
  SLOTtx.lineTo(SLOTFirstMove[0] + 9, SLOTFirstMove[1] + 10);
  var SLOTSecondMove = CP(startX + SLOTroutes[position][SLOTRouteNumber].secondX, startY + SLOTroutes[position][SLOTRouteNumber].secondY);
  SLOTtx.lineTo(SLOTSecondMove[0] + 9, SLOTSecondMove[1] + 10);
  var SLOTThirdMove = CP(startX + SLOTroutes[position][SLOTRouteNumber].thirdX, startY + SLOTroutes[position][SLOTRouteNumber].thirdY);
  SLOTtx.lineTo(SLOTThirdMove[0] + 9, SLOTThirdMove[1] + 10);
  SLOTtx.globalAlpha = 0.4;
  SLOTtx.strokeStyle = "white";
  SLOTtx.lineWidth = 10;
  SLOTtx.lineCap = "round";
  SLOTtx.stroke();