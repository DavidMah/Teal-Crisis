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


    this.entityContainer = new createjs.Container();
    this.stage.addChild(this.entityContainer);

    // Cover
    this.image = new createjs.Bitmap(zoneData.image);
    this.entityContainer.addChild(this.image);
    this.coverSide = zoneData.coverSide;
    this.coverInitial = zoneData.coverInitial;
    this.coverCoordinate = 0;
    this.inCover = false;

    if (zoneData.cover !== undefined) {
      this.cover = new createjs.Bitmap(zoneData.cover);
      this.stage.addChild(this.cover);
      this.cover.visible = false;
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
  };

  // Visually changes the game field for player cover
  this.enterCover = function() {
    // this.image.alpha = 0.5;
    this.cover.visible = true;
    this.inCover = true;
  };

  // Visually changes the game field for player uncover
  this.leaveCover = function() {
    // this.image.alpha = 1;
    this.cover.visible = false;
    this.inCover = false;
  };

  // Places the cover at the correct coordinates
  // with respect to this.coverCoordinate and
  // this.coverSide
  this.updateCover = function() {
    if (this.inCover) {
      if (this.coverSide == 'right')
        this.coverCoordinate = Math.max(0, this.coverCoordinate - (this.coverInitial / 5.0));
      else
        this.coverCoordinate = Math.min(0, this.coverCoordinate - (this.coverInitial / 5.0));
    } else {
      this.coverCoordinate = Math.min(this.coverInitial, this.coverCoordinate + (this.coverInitial / 10.0));

    }
    if (this.coverSide == 'left' || this.coverSide == 'right') {
      this.cover.setTransform(this.coverCoordinate, 0);
    }
  };

  this.getBodyCount = function() {
    return this.bodies.length + this.inactiveBodies.length;
  };;

  // Establish body information, so that bodies will appear in the zone
  // at their given entryTime
  // sets this.inactiveBodies = [<latest body>, ..., <earliest body>]
  // Arguments:
  // - bodyData: a list of bodies meant to exist in the zone
  this.setBodyTable = function(bodyData) {
    this.inactiveBodies = [];
    for (var i = 0; i < bodyData.length; i++) {
      var bodyValues = bodyData[i];
      var body = this.createBody(bodyValues.x, bodyValues.y, bodyValues);
      this.inactiveBodies.push(body);
      body.stage.visible = false;
      this.entityContainer.addChild(body.stage);
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
      body.stage.visible = true;
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
    this.updateCover();
    this.updateCover();
  });

  // When the player enters safety, switch to cover view
  jQuery(this).on("enterCover", function(data) {
    debug_log("enter cover");
    this.enterCover();
  });

  // When the player enters open, switch to uncover view
  jQuery(this).on("leaveCover", function(data) {
    this.leaveCover();
  });

  this.updateTime = function() {
    this.remainingTime -= FRAME_INTERVAL;
    if (this.getBodyCount() > 0) {
      this.player.setTimeVisual(this.remainingTime);
    }
    if(this.remainingTime <= 0) {
      if (this.getBodyCount() <= 0) {
        jQuery(this.zoneManager).trigger("zoneFinished", {});
      } else {
        jQuery(this.zoneManager).trigger("gameOver", {});
      }
    }
  }

  this.endZoneIfNoMoreEnemies = function() {
    if (this.getBodyCount() == 0) {
      this.remainingTime = Math.min(this.remainingTime, 1);
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
