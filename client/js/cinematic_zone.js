/* cinematic_zone.js
 *
 * This represents a zone that is a cinematic
 */

function CinematicZone(container, zoneManager, player, cinematicData) {
  var zone = this;

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
    this.subs   = this.prepareSubtitles(cinematicData.subtitles);
    this.subs2  = this.prepareSubtitles(cinematicData.subtitlesTop);


    this.subVisual = new createjs.Text("", "20pt Arial", "white");
    this.subVisual.setTransform(50, 500);
    this.stage.addChild(this.subVisual);
    this.currentSub = null;

    this.subVisual2 = new createjs.Text("", "20pt Arial", "white");
    this.subVisual2.setTransform(50, 50);
    this.stage.addChild(this.subVisual2);
    this.currentSub2 = null;

    var zone = this;
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

  this.prepareSubtitles = function(subtitleData) {
    return (subtitleData !== undefined ? subtitleData : []);
  }

  this.shiftSubtitles = function() {
    if (this.currentSub != null && this.currentSub[1] <= (this.initialTime - this.time)) {
      this.removeSubtitle();
    }
    if (this.subs.length > 0) {
      var nextSub = this.subs[0]
      if (nextSub[0] <= (this.initialTime - this.time)) {
        this.setSubtitle(nextSub);
        this.subs.shift();
      }
    }

    if (this.currentSub2 != null && this.currentSub2[1] <= (this.initialTime - this.time)) {
      this.removeSubtitle2();
    }
    if (this.subs2.length > 0) {
      var nextSub = this.subs2[0]
      if (nextSub[0] <= (this.initialTime - this.time)) {
        this.setSubtitle2(nextSub);
        this.subs2.shift();
      }
    }
  }

  this.removeSubtitle = function() {
    this.currentSub = null;
    this.subVisual.text = "";
  }

  this.setSubtitle = function(sub) {
    this.currentSub = sub;
    this.subVisual.text = sub[2];
    debug_log(sub);
  }

  this.removeSubtitle2 = function() {
    this.currentSub2 = null;
    this.subVisual2.text = "";
  }

  this.setSubtitle2 = function(sub) {
    this.currentSub2 = sub;
    this.subVisual2.text = sub[2];
    debug_log(sub);
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
      this.shiftSubtitles();
      if (this.time <= 0) {
        jQuery(this.zoneManager).trigger("zoneFinished", {});
      }
    }
  });

  this.initialize(container, zoneManager, player, cinematicData);
}
