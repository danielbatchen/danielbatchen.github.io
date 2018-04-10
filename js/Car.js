const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;

function carClass(){
  this.carX = 75,
  this.carY = 75;
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.setupControls = function(forwardKey,backKey,leftKey,rightKey){
    this.controlKeyforGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
  }

  this.carMove = function(){
    if (this.keyHeld_Gas){
      this.carSpeed += DRIVE_POWER;
    }
    if (this.keyHeld_TurnLeft && Math.abs(this.carSpeed) > 0.5){
      this.carAng += -TURN_RATE*Math.PI;
    }
    if (this.keyHeld_TurnRight && Math.abs(this.carSpeed) > 0.5){
      this.carAng += TURN_RATE*Math.PI;
    }
    if (this.keyHeld_Reverse){
      this.carSpeed += -REVERSE_POWER;
    }
    var nextX= this.carX + Math.cos(this.carAng) * this.carSpeed;
    var nextY= this.carY + Math.sin(this.carAng) * this.carSpeed;
    var drivingIntoTileType = getTrackAtPixelCoord(nextX,nextY);
    if (drivingIntoTileType == TRACK_ROAD){ //in Track.js
      this.carX = nextX;
      this.carY = nextY;
    } else if(drivingIntoTileType == TRACK_GOAL){
      document.getElementById("debugText").innerHTML = this.myName + " won the race";
      p1.carReset();
      p2.carReset();
    } else {
      this.carSpeed *= -0.5;
    }
    this.carSpeed *= GROUNDSPEED_DECAY_MULT;
  }
  this.carReset = function() {
    this.carAng = 3*Math.PI/2;
    this.carSpeed = 0;
    if(this.homeX == undefined){
      for (var i=0; i < trackGrid.length; i++){
        if (trackGrid[i] == TRACK_PLAYER){
          var tileRow = Math.floor(i/TRACK_COLS);
          var tileCol = i%TRACK_COLS; //%remainder
          this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
          this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
          trackGrid[i] = TRACK_ROAD;
          break;
        }
      }
    }
    this.carX = this.homeX;
    this.carY = this.homeY
  }
  this.carDraw = function(car) {
    drawBitmapCenteredAtLocationWithRotation(car, this.carX, this.carY, this.carAng); // in GraphicsCommon.js
  }
  this.carInit = function(whichGraphic, whichName){
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.carReset();
  }
}
