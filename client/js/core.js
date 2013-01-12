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
head.js("assets/preload_data.js")
head.js("assets/battle_data.js", "assets/cinematic_data.js", "assets/game_data.js");

head.ready(function() {

  // Constants

  // In seconds, how often a frame runs
  window.FRAME_INTERVAL = 0.05;
  window.DEBUG_MESSAGES_ENABLED = true

  window.CANVAS_WIDTH = 800;
  window.CANVAS_HEIGHT = 600;

  // Size of images used for background (Determines framing)
  window.BACKGROUND_WIDTH = 800;
  window.BACKGROUND_HEIGHT = 536;

  var CANVAS_ID  = "gameCanvas";
  var SAFETY_KEY = 32; // Spacebar

  var gameTime = 0;

  // TODO: Move all of this into a function
  // Establish the canvas as a global existence
  var canvas  = new createjs.Stage(CANVAS_ID);

  // Black visual behind entire game
  var backdrop = new createjs.Shape();
  backdrop.graphics.beginFill('black')
  backdrop.graphics.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.addChild(backdrop);

  var stage  = new createjs.Container();
  stage.setTransform(0, (CANVAS_HEIGHT - BACKGROUND_HEIGHT) / 2);
  canvas.addChild(stage);



  // Container addition must be in order of layers from back to front!
  var playerContainer = stage.addChild(new createjs.Container());
  var player = new Player(playerContainer);

  var zoneManagerContainer   = stage.addChildAt(new createjs.Container(), 0);
  var zoneManager = new ZoneManager(zoneManagerContainer, player, gameData);

  player.setZoneManager(zoneManager);
  stage.visible = false;


  function start() {
    debug_log("starting");
    stage.visible = true;
    loading.visible = false;
    zoneManager.currentZone.startZone();
  }

  var loadedCount = 0;
  function handleFileLoad() {
    loadedCount += 1;
    if (loadedCount == imageCount) {
      start();
    }

  }
  preload = new createjs.PreloadJS()
  preload.onFileLoad =  handleFileLoad;

  var loading = new createjs.Text("         Loading\n\nExpect about a minute", "35pt Arial", 'white');
  loading.setTransform(190, 250);
  canvas.addChild(loading);

  var imageCount = imageList.length;
  while (imageList.length > 0) {
    var item = imageList.shift();
    preload.loadFile(item);
    debug_log("wambo");
  }


  // When the mouse is pressed, defer to the player for shooting in the zone
  canvas.onMouseDown = function(event) {
    player.clickEvent(event);
  }

  // When the mouse is moved, defer to the player for how to visualize focus
  canvas.onMouseMove = function(event) {
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
    canvas.update();
    gameTime += FRAME_INTERVAL;
    jQuery(zoneManager).trigger("frame", {gameTime: gameTime});
    jQuery(player).trigger("frame", {gameTime: gameTime});
  },FRAME_INTERVAL * 1000);
});

})();
