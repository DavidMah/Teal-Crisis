/* zone_manager.js
 *
 * This file manages multiple zones in the game
 * - zone storage
 * - zone transitions
 */

head.js("js/zone.js");
head.js("js/cinematic_zone.js");
head.js("js/wait_zone.js");

var FADE_DISPLAY_TIME = 1.5;

function ZoneManager(container, player, zoneData) {

  // Initializes the zone manager
  // Arguments:
  // - container
  // - zoneData: game data for all game zones
  this.initialize = function(container, player, zoneData) {
    this.stage  = container;
    this.zoneData  = zoneData;
    this.player = player;


    this.fadeDisplay = createFadeDisplay(new createjs.Container);
    this.fadeDisplayTimer = -1;
    this.fading = false;

    this.zoneStage = new createjs.Container;
    this.stage.addChild(this.zoneStage);
    this.stage.addChild(this.fadeDisplay.container);

    this.currentZoneIndex = 0;
    this.loadZones();
    this.setZone(0);
  };

  // Preloads all zones from this.zoneData
  this.loadZones = function() {
    this.zones = [];
    for (var i = 0; i < this.zoneData.length; i++) {
      this.zones.push(this.createZone(zoneData[i]));
    };
  };

  // Creates a new zone object
  // Returns
  // - a new Zone object using this and the given zoneData
  this.createZone = function(data) {
    var zoneContainer = new createjs.Container();
    // There are a few different types of zones
    // - wait    -- a screen with a visual that the player may be able to shoot through
    // - battle  -- a screen where the player fights
    // - cinematic -- a screen where the player watches
    if (data.type == 'battle') {
      return new Zone(zoneContainer, this, this.player, data);
    } else if (data.type == 'wait') {
      return new WaitZone(zoneContainer, this, this.player, data);
    } else if (data.type == "cinematic") {
      return new CinematicZone(zoneContainer, this, this.player, data);
    } else {
      debug_log("Illegal Zone: " + data);
    }
  }

  // Switch zones in the game, creating the new zone and abandoning the old
  // sets this.currentZone, this.currentZoneIndex
  // Arguments:
  // - index: the index within this.zones of the new zone to switch to.
  //          if index > this.zones.length, uses index % this.zones.length
  this.setZone = function(index) {
    index = index % this.zones.length;
    debug_log("switching to zone: " + index);
    this.currentZoneIndex = index;
    this.currentZone = this.zones[index];
    this.player.setZone(this.currentZone);

    this.zoneStage.removeAllChildren();
    this.zoneStage.addChild(this.currentZone.stage);
  }


  // Switches to the next zone
  this.nextZone = function() {
    this.setZone(this.currentZoneIndex + 1);
  }

  this.startFade = function() {
    this.fadeDisplayTimer = FADE_DISPLAY_TIME;
    this.fading = true;
    this.pastHalfFade = false;
  }

  this.updateFadeDisplay = function() {
    if (this.fading) {
      this.fadeDisplayTimer -= FRAME_INTERVAL;
      debug_log(this.fadeDisplayTimer);
      var diff = Math.abs(this.fadeDisplayTimer - (FADE_DISPLAY_TIME / 2.0))
      var ratio = 1 - Math.min(diff / (FADE_DISPLAY_TIME / 2.0), 1);
      this.fadeDisplay.container.alpha = ratio
      if (!this.pastHalfFade && this.fadeDisplayTimer < (FADE_DISPLAY_TIME / 2.0)) {
        this.nextZone();
        this.pastHalfFade = true;
      }
      if (this.fadeDisplayTimer <= 0) {
        this.fading = false;
        this.currentZone.startZone();
      }
    }
  }

  // When the zone is finished, move to the next zone
  jQuery(this).on("zoneFinished", function(data) {
    this.currentZone.endZone();
    this.startFade();
  });


  // If the gameOver announcement gets made, then just
  // jump to the last zone (the game over zone)
  jQuery(this).on("gameOver", function(data) {
    debug_log("zone_manager: game over");
    this.currentZone.endZone();
    this.setZone(this.zones.length - 1);
  });

  // On every frame entry, the zone needs to update its state
  jQuery(this).on("frame", function(data) {
    this.updateFadeDisplay();
    if (!this.fading) {
      jQuery(this.currentZone).trigger("frame", data);
    }
  });

  this.initialize(container, player, zoneData);
}


function createFadeDisplay(container) {
  var mask = new createjs.Shape();
  mask.graphics.beginFill('black');
  mask.graphics.drawRect(0, 0, 800, 600);

  container.addChild(mask);
  container.alpha = 0;

  return {
    container: container,
    mask: mask,
  };
};
