/* closing_zone.js
 *
 * This represents a zone that is given at the end of the game
 */

function ClosingZone(container, zoneManager, player) {

  // Initialize the zone
  this.initialize = function(container, zoneManager, player) {
    this.stage = container;
    this.zoneManager = zoneManager;
    this.player = player;

    this.addText();
  };

  // Initializes anything necessary for entrance to a zone
  // In OpeningZone's case, does nothing
  this.startZone = function() {
    this.player.states.beginround();
  }

  // Initializes anything necessary for exit from a zone
  // In OpeningZone's case, does nothing
  this.endZone = function() {
    this.player.states.close();
  }

  // Draws description text
  this.addText = function() {
    var text = new createjs.Text("End of Game.\n\nHappy Birthday Nick!", "20 pt Arial");
    text.setTransform(200, 200);
    this.stage.addChild(text);
  };

  this.initialize(container, zoneManager, player);
}

