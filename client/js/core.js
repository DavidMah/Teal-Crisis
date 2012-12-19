/* core.js
 *
 * This file handles all of the basic infrastructure for the game.
 * - Canvas
 * - Mouse Events
 *   Keyboard Events
 * - Maintaining the stage
 * - Game Timer Event Loop
 * - Requiring every other module and library
 *   Communication between objects of other modules
 */


// Anonymous function wrapper to avoid polluting the global namespace
(function() {

// Libraries
head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");
head.js("js/lib/state-machine.min.js");

// Modules
head.js("js/player.js");
head.js("js/zone.js");

head.ready(function() {

  // In seconds, how often a frame runs
  window.FRAME_INTERVAL = 0.05;
  var CANVAS_ID      = "gameCanvas";

  var gameTime = 0;

  // TODO: Move all of this into a function
  // Establish the canvas as a global existence
  var stage  = new createjs.Stage(CANVAS_ID);

  // Container addition must be in order of layers from back to front!
  var zoneContainer   = stage.addChild(new createjs.Container());
  var zone = new Zone(zoneContainer);

  var playerContainer = stage.addChild(new createjs.Container());
  var player = new Player(playerContainer);
  player.setZone(zone);

  // When the mouse is pressed, defer to the player for shooting in the zone
  stage.onMouseDown = function(event) {
    player.clickEvent(event);
  }

  // When the mouse is moved, defer to the player for how to visualize focus
  stage.onMouseMove = function(event) {
    player.setFocus(event.stageX, event.stageY);
  }

  jQuery(window).keyup(function(event) {
    if (event.keyCode == 32) {
      player.enterSafety();
    }
  });

  jQuery(window).keydown(function(event) {
    if (event.keyCode == 32) {
      player.leaveSafety();
    }
  });

  // Visual Frame updates should happen at this time
  // The frame event gets sent out throughout the application
  // which includes the current game time(time since page open)
  setInterval(function() {
    stage.update()
    gameTime += FRAME_INTERVAL;
    jQuery(zone).trigger("frame", {gameTime: gameTime});
    jQuery(player).trigger("frame", {gameTime: gameTime});
  },FRAME_INTERVAL * 1000);
});

})();
