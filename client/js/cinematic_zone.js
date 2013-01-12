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

    this.initialTime = cinematicData.time;
    this.time        = cinematicData.time;
    this.started     = false;
    this.data        = cinematicData.data;

    this.spritesheet = new createjs.SpriteSheet(this.data);
    this.animation   = new createjs.BitmapAnimation(this.spritesheet);
    this.stage.addChild(this.animation);

    this.sounds = this.prepareSounds(cinematicData.sounds);

    var zone = this;
    debug_log("cin: ");
    debug_log(cinematicData);
    debug_log(this.animation);
    this.animation.gotoAndStop(0);
    this.animation.onAnimationEnd = function(self, anim) {
      if (anim == 'stop')
        zone.finishZone(zone)
      // zone.animation.gotoAndStop(zone.animation.spriteSheet.getNumFrames() - 1);
      // zone.animation.gotoAndStop("stop");
    };

  };

  // Initializes anything necessary for entrance to a zone
  // In CinematicZone's case, ensures that the display is hidden
  this.startZone = function() {
    this.player.hideDisplay();
    this.player.states.close();
    this.started = true;

    this.startAnimation();
  };

  // Initializes anything necessary for exit from a zone
  this.endZone = function() {
    this.player.states.close();
  };

  this.startAnimation = function() {
    this.animation.gotoAndPlay("play");
  };

  this.finishZone = function(zone) {
    jQuery(zone.zoneManager).trigger("zoneFinished", {});
  };

  // Processes Sound Data in any way necessary at start of zone creation
  this.prepareSounds = function(soundData) {
    // TODO: preloading action
    var manifest = []
    for (var i = 0; i < soundData.length; i++) {
      var sound = soundData[i];
      manifest.push({
        id: (i + ":" + sound.file),
        src: sound.file,
        data: 4
      });
    }

    var preload = new createjs.PreloadJS();
    preload.installPlugin(createjs.SoundJS);
    preload.loadManifest(manifest);

    soundData.reverse();
    return soundData;
  }

  this.playSounds = function() {
    while (this.sounds.length > 0
           && this.sounds[this.sounds.length - 1].time
              <= (this.initialTime - this.time)) {
      var sound  = this.sounds.pop();
      var offset = (sound.offset !== undefined ? sound.offset : 0);
      var volume = (sound.volume !== undefined ? sound.volume : 1);
      createjs.SoundJS.play(sound.file, createjs.SoundJS.INTERRUPT_NONE,
                            0, offset, 0, volume, 0);
    }

  };

  jQuery(this).on("frame", function(data) {
    if (this.started) {
      this.time -= FRAME_INTERVAL;
      this.playSounds();
      if (this.time <= 0) {
        jQuery(this.zoneManager).trigger("zoneFinished", {});
      }
    }
  });

  this.initialize(container, zoneManager, player, cinematicData);
}
