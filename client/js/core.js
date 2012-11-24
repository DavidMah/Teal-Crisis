/* core.js
 *
 * This file handles all of the basic infrastructure for the game.
 * - Canvas
 * - Mouse Events
 * - Maintaining the stage
 * - Game Timer Event Loop
 * - Requiring every other module and library
 *   Communication between objects of other modules
 */

// Libraries
head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");

// Modules
head.js("js/player.js");

head.ready(function() {
  var FRAME_INTERVAL = 10;
  var CANVAS_ID      = "gameCanvas"

  // Establish the canvas as a global existence
  var stage  = new createjs.Stage(CANVAS_ID);
  var circleContainer = stage.addChildAt(new createjs.Container(), 0);
  var playerContainer = stage.addChildAt(new createjs.Container(), 1);
  var player = new Player(playerContainer);

  // Draws a r=50 circle at the given x, y coordinates
  // TODO: Remove this. It is for demo purposes
  function drawCircle(x, y) {
    circleContainer.addChild(new createjs.Shape()).setTransform(0, 0).graphics.f("red").dc(x, y, 50);
  }

  // TODO: Remove this. It is for demo purposes
  jQuery(document).bind("gunShot", function(event) {
    drawCircle(event.stageX, event.stageY);
  });

  stage.onMouseDown = function(event) {
    player.clickEvent(event);
  }

  stage.onMouseMove = function(event) {
    player.setFocus(event.stageX, event.stageY);
  }

  // Visual Frame updates should happen at this time
  setInterval(function() {
    stage.update()
  },FRAME_INTERVAL);
});
