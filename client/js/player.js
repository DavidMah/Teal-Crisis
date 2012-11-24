/* player.js
 *
 * This file handles all of information regarding one player
 * - Crosshairs
 * - Personal Gameplay Variables(health, bullets, etc)
 * - Player input handling
 */

function Player(container) {
  var CROSSHAIR_RADIUS = 10

  // Create a crosshair Shape object
  function _drawCrosshair() {
    var crosshair = (new createjs.Shape())
    crosshair.graphics.beginStroke("blue");
    crosshair.graphics.drawCircle(0, 0, CROSSHAIR_RADIUS);
    crosshair.graphics.moveTo(-CROSSHAIR_RADIUS, 0).lineTo(CROSSHAIR_RADIUS, 0);
    crosshair.graphics.moveTo(0, -CROSSHAIR_RADIUS).lineTo(0, CROSSHAIR_RADIUS);
    return crosshair;
  }

  this.focus = {x: 0, y: 0}
  this.crosshair = _drawCrosshair();
  container.addChildAt(this.crosshair, 0);


  // Assign mouse focus information
  this.setFocus = function(x, y) {
    this.focus.x = x;
    this.focus.y = y;
    this.crosshair.x = x;
    this.crosshair.y = y;
  }

  // Determine what events to fire off based on current
  // state of the game
  this.clickEvent = function(event) {
    jQuery(document).trigger(jQuery.Event("gunShot", {
      stageX: event.stageX,
      stageY: event.stageY}));
  }
}
