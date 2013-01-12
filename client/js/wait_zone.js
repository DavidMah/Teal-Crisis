/* wait_zone.js
 *
 * This represents a zone with no action
 * It is optional that the player can shoot the screen to proceed
 */

function WaitZone(container, zoneManager, player, zoneData) {

  // Initialize the zone
  this.initialize = function(container, zoneManager, player, zoneData) {
    this.stage = container;
    this.zoneManager = zoneManager;
    this.player = player;

    // White backdrop if there is no image
    if (zoneData.background === undefined) {
      var backdrop = new createjs.Shape();
      backdrop.graphics.beginFill('white')
      backdrop.graphics.drawRect(0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
      this.stage.addChild(backdrop);
    } else {
      var background = new createjs.Bitmap(zoneData.background);
      this.stage.addChild(background);
    }

    this.canProceed = zoneData.canProceed;
    this.addText(zoneData.text, zoneData.font);
  };

  // Initializes anything necessary for entrance to a zone
  this.startZone = function() {
    this.player.states.beginround();
  };

  // Initializes anything necessary for exit from a zone
  this.endZone = function() {
    this.player.states.close();
  };

  // Draws description text
  this.addText = function(text, font) {
    var text = new createjs.Text(text, font, 'white');
    text.setTransform(200, 200);
    this.stage.addChild(text);
  };

  // When the player shoots, leaves the zone
  jQuery(this).on("gunShot", function(data) {
    if (this.canProceed) {
      jQuery(this.zoneManager).trigger("zoneFinished", {});
    }
  });

  this.initialize(container, zoneManager, player, zoneData);
}
