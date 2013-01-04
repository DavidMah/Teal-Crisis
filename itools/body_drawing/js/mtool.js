/* mtool.js
 * 
 * The body drawing tool is used to create bodies out of images
 * mtool is in charge of the user interface for this tool
 */

head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");

head.ready(function() {

  function drawCircle(container, x, y, x2, y2, color, fill) {
    var radius = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    var shape = new createjs.Shape();
    shape.x = start_x;
    shape.y = start_y;
    if (fill)
      shape.graphics.beginFill(color);
    else
      shape.graphics.beginStroke(color);
    shape.graphics.drawCircle(0, 0, radius);
    container.addChild(shape);
  }

  var stage      = new createjs.Stage("gameCanvas");
  // Circles that are part of the finished product
  var finished   = new createjs.Container();
  // Circles part of the temporary mouse held down drawing
  var incomplete = new createjs.Container();

  stage.addChild(finished);
  stage.addChild(incomplete);

  var start_x;
  var start_y;

  // Does the user current have the mouse pressed to draw?
  var drawing = false;

  stage.onMouseDown = function(event) {
    start_x = event.stageX;
    start_y = event.stageY;

    drawing = true;
  };

  // When the mouse is released, draw the circle permanently
  stage.onMouseUp = function(event) { 
    incomplete.removeAllChildren();

    drawCircle(finished, start_x, start_y, event.stageX, event.stageY, 'blue', true);
    drawing = false;
  };

  // When the mouse is dragged, draw temporary intermediate circles
  stage.onMouseMove = function(event) {
    incomplete.removeAllChildren();

    if (drawing) {
      drawCircle(incomplete, start_x, start_y, event.stageX, event.stageY, 'green', false);
    }
  };

  // Visual Frame updates should happen at this time
  setInterval(function() {
    stage.update();
  },30);
});
