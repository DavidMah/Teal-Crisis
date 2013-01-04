/* zone_manager.js
 *
 * This file manages multiple zones in the game
 * - zone storage
 * - zone transitions
 */

head.js("js/zone.js");

function ZoneManager(container, player, zoneData) {

  // Initializes the zone manager
  // Arguments:
  // - container
  // - zoneData: game data for all game zones
  this.initialize = function(container, player, zoneData) {
    this.stage  = container;
    this.zones  = zoneData;
    this.player = player;

    this.currentZoneIndex = 0;
    this.setZone(0);
  }

  // Switch zones in the game, creating the new zone and abandoning the old
  // sets this.currentZone, this.currentZoneIndex
  // Arguments:
  // - index: the index within this.zones of the new zone to switch to.
  //          if index > this.zones.length, uses index % this.zones.length
  this.setZone = function(index) {
    debug_log("aya " + this.zones);
    index = index % this.zones.length;
    this.currentZoneIndex = index;
    var zoneContainer = new createjs.Container();
    this.currentZone = new Zone(zoneContainer, this, this.player, this.zones[index]);
    this.player.setZone(this.currentZone);

    this.stage.removeAllChildren();
    this.stage.addChild(zoneContainer);
  }

  // Switches to the next zone
  this.nextZone = function() {
    this.player.states.close();
    this.setZone(this.currentZoneIndex + 1);
  }

  // When the zone is finished, move to the next zone
  jQuery(this).on("zoneFinished", function(data) {
    this.nextZone();
  });

  // On every frame entry, the zone needs to update its state
  jQuery(this).on("frame", function(data) {
    jQuery(this.currentZone).trigger("frame", data);
  });

  this.initialize(container, player, zoneData);
}
