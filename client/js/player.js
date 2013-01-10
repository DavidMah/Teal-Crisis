/* player.js
 *
 * This file handles all of information regarding one player
 * - Crosshairs
 * - Personal Gameplay Variables(health, bullets, etc)
 * - Player input handling
 */

var CROSSHAIR_RADIUS = 10;
var DEATH_TIME = 3;
var PAIN_TIME = 0.5;

function Player(container) {
  var player = this;

  // Initializes a player
  this.initialize = function(container) {
    this.stage = container;
    this.focus = {x: 0, y: 0};
    this.crosshair = drawCrosshair();
    this.stage.addChild(this.crosshair);
    this.currentZone = null;
    this.display   = createDisplay(new createjs.Container());
    this.stage.addChild(this.display.container);

    // Sets up initial player stats, like full health and 0 points
    this.setDefaultValues();

    this.deathTimer = 9999;
    this.deathDisplay = createDeathDisplay(new createjs.Container());
    this.stage.addChild(this.deathDisplay.container);

    this.painTimer = -1;
    this.painDisplay = createPainDisplay(new createjs.Container());
    this.stage.addChild(this.painDisplay.container);

    this.hideDisplay();
  };

  // Sets up initial player stats, like full health and 0 points
  this.setDefaultValues = function() {
    this.score  = 0;
    this.ammo   = 9;
    this.health = 3;
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
      { name: 'rejoin', from: 'dead', to: 'open'},

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
      this.runPainPane();
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
    this.updatePainTimer();
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
      this.crosshair.visible = false;
      jQuery(this.currentZone).trigger("enterCover", {});
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
    if (this.states.is('safe')) {
      this.states.leaveSafety()
      this.crosshair.visible = true;
      jQuery(this.currentZone).trigger("leaveCover", {});
    }
  }

  // Open the player to pain and allow the player to attack
  this.states.onopen = function(eventname, from, to) {
    debug_log("player entered open state");
  }

  this.states.ondie = function(eventname, from, to) {
    player.deathDisplay.container.visible = true;
  }

  this.states.onleavedead = function(eventname, from, to) {
    debug_log("player left dead state");
    player.deathDisplay.container.visible = false;
  }

  // Determine what events to fire off based on current
  // state of the game
  this.clickEvent = function(event) {
    if (this.states.is('open')) {
      if(this.ammo > 0) {
        this.useAmmo();
        var position = getGunShotPosition(event.stageX, event.stageY);
        jQuery(this.currentZone).trigger(jQuery.Event("gunShot", {
          stageX: position.x,
          stageY: position.y
        }));
      }
    }
    // Player shoots when dead. That means rejoin
    if (this.states.is('dead')) {
      this.setDefaultValues();
      this.setVisuals();
      this.states.rejoin();
    }
  };

  // Changes state to dead. This state gives the player
  // DEATH_TIME seconds to choose to rejoin the game or else moves to
  // game over
  this.runDeathPane = function() {
    debug_log("death timer activated");
    this.deathTimer = DEATH_TIME;
    this.states.die();
  };

  this.updateDeathTimer = function() {
    if (this.states.is('dead')) {
      this.deathTimer -= FRAME_INTERVAL;
      this.deathDisplay.mask.alpha = Math.min((1 - (this.deathTimer / DEATH_TIME)) * 5, 0.5);
      this.deathDisplay.countdown.text = (this.deathTimer).toFixed(2);
      if (this.deathTimer <= 0) {
        debug_log("player: Game Over");
        jQuery(this.zone_manager).trigger("gameOver", {});
      }
    }
  };

  this.runPainPane = function() {
    debug_log("pain timer activated");
    this.painTimer = PAIN_TIME;
  }

  this.updatePainTimer = function() {
    this.painTimer -= FRAME_INTERVAL
    this.painDisplay.mask.alpha = Math.max(Math.min(0.5, this.painTimer), 0);
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

  this.setVisuals = function() {
    player.setAmmoVisual();
    player.setScoreVisual();
    player.setHealthVisual();
  }

  // Updates visual display for ammo
  this.setAmmoVisual = function() {
    this.display.ammo.text = "Ammo: " + this.ammo;
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
  var score = (new createjs.Text("Score: 0", "20pt Arial", 'white'));
  score.setTransform(50, 50);
  display.addChild(score);

  var ammo = (new createjs.Text("Ammo: 9", "20pt Arial", 'white'));
  ammo.setTransform(50, 500);
  display.addChild(ammo);

  var health = (new createjs.Text("Life: 3", "20pt Arial", 'white'));
  health.setTransform(650, 50);
  display.addChild(health);

  var time = (new createjs.Text("Time: 9999", "20pt Arial", 'white'));
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
  crosshair.graphics.drawCircle(0, 0, CROSSHAIR_RADIUS);
  return crosshair;
};

function createDeathDisplay(container) {
  var mask = new createjs.Shape();
  mask.graphics.beginFill('black');
  mask.graphics.drawRect(0, 0, 800, 600);
  mask.alpha = 0;

  var message   = (new createjs.Text("You Died! Shoot to rejoin", "20pt Arial", 'white'));
  message.setTransform(200, 200);


  var countdown = (new createjs.Text("---", "35pt Arial", 'white'));
  countdown.setTransform(350, 300);

  container.addChild(mask);
  container.addChild(countdown);
  container.addChild(message);

  container.visible = false;
  return {
    container: container,
    mask: mask,
    message: message,
    countdown: countdown
  };
};

function createPainDisplay(container) {
  var mask = new createjs.Shape();
  mask.graphics.beginFill('red');
  mask.graphics.drawRect(0, 0, 800, 600);
  mask.alpha = 0;

  container.addChild(mask);

  return {
    container: container,
    mask: mask,
  };
};

function getGunShotPosition(x, y) {
  var angle  = Math.random() * 2 * Math.PI;
  var radius = Math.random() * CROSSHAIR_RADIUS;
  var offsetX = Math.sin(angle) * radius;
  var offsetY = Math.cos(angle) * radius;
  return {
    x: x + offsetX,
    y: y + offsetY
  };
}
