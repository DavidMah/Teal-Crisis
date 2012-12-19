/* player.js
 *
 * This file handles all of information regarding one player
 * - Crosshairs
 * - Personal Gameplay Variables(health, bullets, etc)
 * - Player input handling
 */

var CROSSHAIR_RADIUS = 10;
function Player(container) {

  // Initializes a player
  this.initialize = function(container) {
    this.stage = container;
    this.focus = {x: 0, y: 0};
    this.crosshair = drawCrosshair();
    this.stage.addChildAt(this.crosshair);
    this.currentZone = null;
  }

  // Assign a new zone for the player's events to propagate through
  this.setZone = function(zone) {
    this.currentZone = zone;
  }

  // Assign mouse focus information
  this.setFocus = function(x, y) {
    this.focus.x = x;
    this.focus.y = y;
    this.crosshair.x = x;
    this.crosshair.y = y;
  };

  // Enter the Safety State
  // Does nothing if already in said state
  this.enterSafety = function() {
    console.log("safe!");
  }

  // Enter the Open State
  // Does nothing if already in said state
  this.leaveSafety = function() {
    console.log("open!");
  }


  // Determine what events to fire off based on current
  // state of the game
  this.clickEvent = function(event) {
    jQuery(this.currentZone).trigger(jQuery.Event("gunShot", {
      stageX: event.stageX,
      stageY: event.stageY
    }));
  };

  this.initialize(container);
}

// Create a crosshair Shape object
function drawCrosshair() {
  var crosshair = (new createjs.Shape());
  crosshair.graphics.beginStroke("blue");
  crosshair.graphics.drawCircle(0, 0, CROSSHAIR_RADIUS);
  crosshair.graphics.moveTo(-CROSSHAIR_RADIUS, 0).lineTo(CROSSHAIR_RADIUS, 0);
  crosshair.graphics.moveTo(0, -CROSSHAIR_RADIUS).lineTo(0, CROSSHAIR_RADIUS);
  return crosshair;
}
