/* player.js
 *
 * This file handles all of information regarding one player
 * - Crosshairs
 * - Personal Gameplay Variables(health, bullets, etc)
 * - Player input handling
 */

var CROSSHAIR_RADIUS = 10;
function Player(container) {

  // Initializes a player
  this.initialize = function(container) {
    this.stage = container;
    this.focus = {x: 0, y: 0};
    this.crosshair = drawCrosshair();
    this.stage.addChild(this.crosshair);
    this.currentZone = null;
    this.display   = createDisplay(new createjs.Container());
    this.stage.addChild(this.display.container);

    this.score  = 0;
    this.ammo   = 9;
    this.health = 3;

    this.deathTimer = 9999;

    this.hideDisplay();
  }

  // Possible Player States:
  // closed
  // - Player is in some non gameplay screen
  // open
  // - Player is in a gameplay screen and can attack
  // safe
  // - Player is in a gameplay screen but hiding
  this.states = StateMachine.create({
    initial: 'closed',
    events: [
      { name: 'enterSafety', from: 'open', to: 'safe'},
      { name: 'leaveSafety', from: 'safe', to: 'open'},

      { name: 'die', from: 'open', to: 'dead'},

      { name: 'beginround', from: 'closed', to: 'open'},
      { name: 'close', from: ['closed','open', 'safe', 'dead'], to: 'closed'}
    ]
  });

  // Assign a new zone for the player's events to propagate through
  this.setZone = function(zone) {
    this.currentZone = zone;
  };

  // Hand the reference to the zone manager to the player
  this.setZoneManager = function(zone_manager) {
    this.zone_manager = zone_manager;
  }

  // When point amount awarded, update score
  jQuery(this).bind("scoreAward", function(event) {
    debug_log("scoreAward: " + event);
    this.score += event.award;
    this.setScoreVisual();
  });

  jQuery(this).bind("damage", function(event) {
    if (this.states.is('open')) {
      debug_log("damage: " + event);
      this.health -= 1;
      if (this.health <= 0) {
        this.runDeathPane();
      }
      this.setHealthVisual();
    } else {
      debug_log("miss");
    }
  });

  jQuery(this).on("frame", function(data) {
    this.updateDeathTimer();
  });

  // Assign mouse focus information
  this.setFocus = function(x, y) {
    this.focus.x = x;
    this.focus.y = y;
    this.crosshair.x = x;
    this.crosshair.y = y;
  };

  // Enter the Safety State
  // Does nothing if already in said state
  this.enterSafety = function() {
    if (this.states.is('open')) {
      this.states.enterSafety()
      this.reload();
    }
  }

  // Hide the player from pain and dissallow the player
  // from attacking
  this.states.onsafe = function(eventname, from, to) {
    debug_log("player entered safety state");
  }

  // Enter the Open State
  // Does nothing if already in said state
  this.leaveSafety = function() {
    if (this.states.is('safe'))
      this.states.leaveSafety()
  }

  // Open the player to pain and allow the player to attack
  this.states.onopen = function(eventname, from, to) {
    debug_log("player entered open state");
  }

  // Determine what events to fire off based on current
  // state of the game
  this.clickEvent = function(event) {
    if (this.states.is('open')) {
      if(this.ammo > 0) {
        this.useAmmo();
        jQuery(this.currentZone).trigger(jQuery.Event("gunShot", {
          stageX: event.stageX,
          stageY: event.stageY
        }));
      }
    }
  };

  // Changes state to dead. This state gives the player
  // 3 seconds to choose to rejoin the game or else moves to
  // game over
  this.runDeathPane = function() {
    debug_log("death timer activated");
    this.deathTimer = 3;
    this.states.die();
  };

  this.updateDeathTimer = function() {
    if (this.states.is('dead')) {
      this.deathTimer -= FRAME_INTERVAL;
      if (this.deathTimer <= 0) {
        debug_log("player: Game Over");
        jQuery(this.zone_manager).trigger("gameOver", {});
      }
    }
  };

  // Reduce ammo by one.
  this.useAmmo = function() {
    this.ammo -= 1;
    this.setAmmoVisual();
  };

  // Restores ammo to maximum capacity
  this.reload = function() {
    this.ammo = 9;
    this.setAmmoVisual();
  };

  this.showDisplay = function() {
    this.display.container.visible = true;
  };

  this.hideDisplay = function() {
    this.display.container.visible = false;
  }

  // Updates visual display for ammo
  this.setAmmoVisual = function() {
    this.display.ammo.text = "Hand Gun: " + this.ammo;
  };

  this.setScoreVisual = function() {
    this.display.score.text = "Score: " + this.score;
  };

  this.setHealthVisual = function() {
    this.display.health.text = "Life: " + this.health;
  };

  this.setTimeVisual = function(time) {
    this.display.time.text = "Time: " + (time).toFixed(2);
  };

  this.initialize(container);
}

// Create visual objects for displaying player information and returns it
// in an object. Adds it to the passed in display container
function createDisplay(display) {
  var score = (new createjs.Text("Score: 0", "20pt Arial"));
  score.setTransform(50, 50);
  display.addChild(score);

  var ammo = (new createjs.Text("Hand Gun: 9", "20pt Arial"));
  ammo.setTransform(50, 500);
  display.addChild(ammo);

  var health = (new createjs.Text("Life: 3", "20pt Arial"));
  health.setTransform(650, 50);
  display.addChild(health);

  var time = (new createjs.Text("Time: 9999", "20pt Arial"));
  time.setTransform(600, 500);
  display.addChild(time);

  return {
    container: display,
    score:  score,
    ammo:   ammo,
    health: health,
    time:   time
  };
};

// Create a crosshair Shape object
function drawCrosshair() {
  var crosshair = (new createjs.Shape());
  crosshair.graphics.beginStroke("blue");
  crosshair.graphics.moveTo(-CROSSHAIR_RADIUS, 0).lineTo(-CROSSHAIR_RADIUS * 0.2, 0);
  crosshair.graphics.moveTo(CROSSHAIR_RADIUS, 0).lineTo(CROSSHAIR_RADIUS * 0.2, 0);
  crosshair.graphics.moveTo(0, -CROSSHAIR_RADIUS).lineTo(0, CROSSHAIR_RADIUS);
  crosshair.graphics.moveTo(0, -CROSSHAIR_RADIUS).lineTo(0, CROSSHAIR_RADIUS);
  return crosshair;
};
