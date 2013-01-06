/* cinematic_zone.js
 *
 * This represents a zone that is a cinematic
 */

function CinematicZone(container, zoneManager, player, cinematicData) {

  // Initialize the zone
  this.initialize = function(container, zoneManager, player, cinematicData) {
    this.stage = container;
    this.zoneManager = zoneManager;
    this.player = player;

    this.time = cinematicData.time;
    this.started = false;

  };

  // Initializes anything necessary for entrance to a zone
  // In CinematicZone's case, ensures that the display is hidden
  this.startZone = function() {
    this.player.hideDisplay();
    this.player.states.close();
    this.started = true;
  }

  // Initializes anything necessary for exit from a zone
  // In CinematicZone's case, does nothing
  this.endZone = function() {
    this.player.states.close();
  }

  jQuery(this).on("frame", function(data) {
    if (this.started) {
      this.time -= FRAME_INTERVAL;
      if (this.time <= 0) {
        jQuery(this.zoneManager).trigger("zoneFinished", {});
      }
    }
  });

  this.initialize(container, zoneManager, player, cinematicData);
}
