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
head.js("js/lib/md5.min.js");
head.js("js/lib/soundjs-0.3.0.min.js");
head.js("js/lib/preloadjs-0.2.0.min.js");

// Modules
head.js("js/player.js");
head.js("js/utility.js");
head.js("js/zone_manager.js");

// Data
head.js("assets/game_data.js");

head.ready(function() {

  // Constants

  // In seconds, how often a frame runs
  window.FRAME_INTERVAL = 0.05;
  window.DEBUG_MESSAGES_ENABLED = true

  var CANVAS_ID  = "gameCanvas";
  var SAFETY_KEY = 32; // Spacebar

  var gameTime = 0;

  // TODO: Move all of this into a function
  // Establish the canvas as a global existence
  var stage  = new createjs.Stage(CANVAS_ID);

  // Container addition must be in order of layers from back to front!
  var playerContainer = stage.addChild(new createjs.Container());
  var player = new Player(playerContainer);

  var zoneManagerContainer   = stage.addChildAt(new createjs.Container(), 0);
  var zoneManager = new ZoneManager(zoneManagerContainer, player, gameData);

  player.setZoneManager(zoneManager);

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
      player.leaveSafety();
    }
  });

  jQuery(window).keydown(function(event) {
    if (event.keyCode == 32) {
      player.enterSafety();
    }
  });

  // Visual Frame updates should happen at this time
  // The frame event gets sent out throughout the application
  // which includes the current game time(time since page open)
  setInterval(function() {
    stage.update();
    gameTime += FRAME_INTERVAL;
    jQuery(zoneManager).trigger("frame", {gameTime: gameTime});
    jQuery(player).trigger("frame", {gameTime: gameTime});
  },FRAME_INTERVAL * 1000);
});

})();
