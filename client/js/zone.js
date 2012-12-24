/* zone.js
 *
 * This file handles interactions of a single gameplay screen
 * A gameplayer screen has
 * - A background
 * - A set of possible bodies
 * - A script where bodies appear(Store as JSON?)
 */

// Modules
head.js("js/body.js");

function Zone(container, player, zoneData) {

  // Initializes a body and draws its bodies
  // Arguments:
  // - container
  // - zoneData: game data for this zone and its constituent bodies
  this.initialize = function(container, player, zoneData) {
    this.stage  = container;
    this.player = player;
    this.bodies = [];
    this.remainingTime = zoneData.time;

    console.log(zoneData);
    var bodyData = zoneData.bodies
    for (var i = 0; i < bodyData.length; i++) {
      var body = bodyData[i];
      this.createBody(body.x, body.y, body);
    }
  }

  // Creates a body and adds it to the zone
  this.createBody = function(x, y, subbodyData) {
    var bodyContainer = this.stage.addChild(new createjs.Container());
    bodyContainer.setTransform(x, y);
    this.bodies.push(new Body(bodyContainer, x, y, subbodyData));
  }

  // When the player makes a gunShot, collision testing needs to be run
  // on all of the remaining bodies in the zone.
  // Awards a score increment to the player based on if a body was hit
  jQuery(this).on("gunShot", function(data) {
    var award = this.runAttackCollisions(data.stageX, data.stageY);
    jQuery(this.player).trigger(jQuery.Event("scoreAward", {award: award}));
  });

  // On every frame entry, every body needs to update its state
  jQuery(this).on("frame", function(data) {
    // Re propogate the state update needs through events to be asyncronous
    jQuery(this.bodies).trigger("frame", data);
    this.updateTime();
  });

  this.updateTime = function() {
    this.remainingTime -= FRAME_INTERVAL;
    this.player.setTimeVisual(this.remainingTime);
  }

  // Checks if the target X and Y collides with any bodies in this zone
  // If the target does collide, then trigger damage taking for the
  // respective body
  // Arguments:
  // - tX: The X coordinate to check
  // - tY: The Y coordinate to check
  // Returns:
  // - An integer that represents the worth of whatever was hit, meant to be
  //   added to the player's score.
  this.runAttackCollisions = function(tX, tY) {
    for (var i = 0; i < this.bodies.length; i++) {
      targetBody = this.bodies[i];
      if (targetBody.checkCollision(tX - targetBody.x, tY - targetBody.y)) {
        if (targetBody.takeDamage()) {
          this.stage.removeChild(targetBody.stage);
          this.bodies.splice(i, 1);
          return 420;
        }
        return 139;
      }
    }
    return -10;
  }

  this.initialize(container, player, zoneData);
}
