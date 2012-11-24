head.js("js/lib/easeljs-0.5.0.min.js");

head.ready(function() {
  function initializeCanvas() {
    // Prepare stage
    var stage  = new createjs.Stage("gameCanvas");

    // Draw a circle
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
  }
  initializeCanvas();
});
