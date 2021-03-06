const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_A = 65;
const KEY_LETTER_W = 87;
const KEY_LETTER_D = 68;
const KEY_LETTER_S = 83;


function setKeyHoldState (thisKey, thisCar, setTo){
  if (thisKey == thisCar.controlKeyforGas){
    thisCar.keyHeld_Gas = setTo;
  }
  if (thisKey == thisCar.controlKeyForTurnLeft){
    thisCar.keyHeld_TurnLeft = setTo;
  }if (thisKey == thisCar.controlKeyForTurnRight){
    thisCar.keyHeld_TurnRight = setTo;
  }if (thisKey == thisCar.controlKeyForReverse){
    thisCar.keyHeld_Reverse = setTo;
  }
}
function keyPressed(evt){
  //document.getElementById("debugText").innerHTML = "KeyCOde Pushed: " + evt.keyCode;
  setKeyHoldState(evt.keyCode, p1, true);
  setKeyHoldState(evt.keyCode, p2, true);
  evt.preventDefault();
}
function keyReleased(evt){
  //document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;
  setKeyHoldState(evt.keyCode, p1, false);
  setKeyHoldState(evt.keyCode, p2, false);
  //document.getElementById("debugText").innerHTML = "keyCode Released " + evt.keyCode;
}
function initInput(){
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
  p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D);
}
