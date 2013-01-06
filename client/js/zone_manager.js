/* zone_manager.js
 *
 * This file manages multiple zones in the game
 * - zone storage
 * - zone transitions
 */

head.js("js/zone.js");
head.js("js/opening_zone.js");

function ZoneManager(container, player, zoneData) {

  // Initializes the zone manager
  // Arguments:
  // - container
  // - zoneData: game data for all game zones
  this.initialize = function(container, player, zoneData) {
    this.stage  = container;
    this.zoneData  = zoneData;
    this.player = player;

    this.currentZoneIndex = 0;
    this.loadZones();
    this.setZone(0);
  }

  // Preloads all zones from this.zoneData
  this.loadZones = function() {
    this.zones = []
    for (var i = 0; i < this.zoneData.length; i++) {
      this.zones.push(this.createZone(zoneData[i]));
    }
  }

  // Creates a new zone object
  // Returns
  // - a new Zone object using this and the given zoneData
  this.createZone = function(data) {
    var zoneContainer = new createjs.Container();
    // There are a few different types of zones
    // - opening
    // - battle
    // - cinematic
    if (data.type == 'battle') {
      return new Zone(zoneContainer, this, this.player, data);
    } else if (data.type == 'opening') {
      return new OpeningZone(zoneContainer, this, this.player);
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
    this.currentZoneIndex = index;
    this.currentZone = this.zones[index];
    this.player.setZone(this.currentZone);

    this.stage.removeAllChildren();
    this.stage.addChild(this.currentZone.stage);
    this.currentZone.startZone();
  }

  // Switches to the next zone
  this.nextZone = function() {
    this.setZone(this.currentZoneIndex + 1);
  }

  // When the zone is finished, move to the next zone
  jQuery(this).on("zoneFinished", function(data) {
    this.currentZone.endZone();
    this.nextZone();
  });

  // On every frame entry, the zone needs to update its state
  jQuery(this).on("frame", function(data) {
    jQuery(this.currentZone).trigger("frame", data);
  });

  this.initialize(container, player, zoneData);
}
