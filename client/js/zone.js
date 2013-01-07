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

function Zone(container, zoneManager, player, zoneData) {

  // Initializes a body and draws its bodies
  // Arguments:
  // - container
  // - zoneData: game data for this zone and its constituent bodies
  this.initialize = function(container, zoneManager, player, zoneData) {
    this.stage  = container;
    this.player = player;
    this.bodies = [];
    debug_log(zoneData);
    this.initialTime   = zoneData.time;
    this.remainingTime = zoneData.time;
    this.zoneManager = zoneManager;

    if (zoneData.image !== undefined) {
      var image = new createjs.Bitmap(zoneData.image);
      this.stage.addChild(image);
    }

    this.setBodyTable(zoneData.bodies);
  };

  // Initializes anything necessary for entrance to a zone
  // In Zone's case, asks the player to draw his display
  this.startZone = function() {
    this.player.showDisplay();
    this.player.states.beginround();
  };

  // Initializes anything necessary for exit from a zone
  // In Zone's case, asks the player to hide his display
  this.endZone = function() {
    this.player.hideDisplay();
    this.player.states.close();
  }

  this.getBodyCount = function() {
    return this.bodies.length + this.inactiveBodies.length;
  }

  // Establish body information, so that bodies will appear in the zone
  // at their given entryTime
  // sets this.inactiveBodies = [<latest body>, ..., <earliest body>]
  // Arguments:
  // - bodyData: a list of bodies meant to exist in the zone
  this.setBodyTable = function(bodyData) {
    this.inactiveBodies = [];
    for (var i = 0; i < bodyData.length; i++) {
      var body = bodyData[i];
      this.inactiveBodies.push(this.createBody(body.x, body.y, body));
    }
    this.inactiveBodies.sort(function(a, b) {
      return b.entryTime - a.entryTime;
    });
    debug_log(this.inactiveBodies);
    this.moveActiveBodies();
  }

  // Enters bodies into the zone who's entry times have passed
  this.moveActiveBodies = function() {
    var currentTime = this.initialTime - this.remainingTime;
    while (this.inactiveBodies.length > 0
           && this.inactiveBodies[this.inactiveBodies.length - 1].entryTime <= currentTime) {
      var body = this.inactiveBodies.pop();
      this.bodies.push(body);
      this.stage.addChild(body.stage);
    }
  }

  // Creates a body
  // Arguments:
  // - x: the x coordinate within the zone to place the body
  // - y: the y coordinate within the zone to place the body
  // - subbodyData: data about the circles that compose the body. see body.js
  // Returns:
  // - a Body based on the given parameters
  this.createBody = function(x, y, subbodyData) {
    var bodyContainer = new createjs.Container();
    bodyContainer.setTransform(x, y);
    return new Body(bodyContainer, player, x, y, subbodyData);
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
    this.moveActiveBodies();
  });

  this.updateTime = function() {
    this.remainingTime -= FRAME_INTERVAL;
    this.player.setTimeVisual(this.remainingTime);
    if(this.remainingTime <= 0) {
      jQuery(this.zoneManager).trigger("zoneFinished", {});
    }
  }

  this.endZoneIfNoMoreEnemies = function() {
    if (this.getBodyCount() <= 0) {
      jQuery(this.zoneManager).trigger("zoneFinished", {});
    }
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
          this.endZoneIfNoMoreEnemies();
          return 420;
        }
        return 139;
      }
    }
    return -10;
  }

  this.initialize(container, zoneManager, player, zoneData);
}
