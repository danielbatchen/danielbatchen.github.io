  var canvas, canvasContext;
  var p1 = new carClass();
  var p2 = new carClass();

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadImages(); //in ImageLoading.js
  }
  function loadingDoneSoStartGame(){
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
      }, 1000/framesPerSecond);
      p2.carInit(car2Pic, "Green car");
      p1.carInit(carPic, "Blue car"); //in Car.js
      initInput(); //in Input.js
  }
  function moveEverything() {
    p1.carMove();
    p2.carMove();
  }
  function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    drawTracks(); //in Track.js
    p1.carDraw(carPic); //in Car.js
    p2.carDraw(car2Pic);
  }
