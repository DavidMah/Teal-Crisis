/* opening_zone.js
 *
 * This represents a zone that is given on the start of the game
 */

function OpeningZone(container, zoneManager, player) {

  // Initialize the zone
  this.initialize = function(container, zoneManager, player) {
    this.stage = container;
    this.zoneManager = zoneManager;
    this.player = player;

    this.addOpeningText();
  };

  this.addOpeningText = function() {
    var text = new createjs.Text("Example Opening Text\n\nShoot to Continue", "20 pt Arial");
    text.setTransform(200, 200);
    this.stage.addChild(text);
  };

  jQuery(this).on("gunShot", function(data) {
    jQuery(this.zoneManager).trigger("zoneFinished", {});
  });

  this.initialize(container, zoneManager, player);
}
