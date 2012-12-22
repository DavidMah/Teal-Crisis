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
    this.stage.addChildAt(this.crosshair);
    this.currentZone = null;
    this.display   = createDisplay(container);

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

      { name: 'beginround', from: 'closed', to: 'open'},
      { name: 'close', from: ['open', 'safe'], to: 'closed'},
    ]
  });

  // Assign a new zone for the player's events to propagate through
  this.setZone = function(zone) {
    this.currentZone = zone;
    this.states.beginround();
  }

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
    debug_log("player entered open state");
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

  // Reduce ammo by one.
  this.useAmmo = function() {
    this.ammo -= 1;
    this.setAmmoVisual();
  }

  // Updates visual display for ammo
  this.setAmmoVisual = function() {
    this.display.ammo.text = "Hand Gun: " + this.ammo;
  }

  // Restores ammo to maximum capacity
  this.reload = function() {
    this.ammo = 9;
    this.setAmmoVisual();
  }

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
    score:  score,
    ammo:   ammo,
    health: health,
    time:   time
  }
}

// Create a crosshair Shape object
function drawCrosshair() {
  var crosshair = (new createjs.Shape());
  crosshair.graphics.beginStroke("blue");
  crosshair.graphics.moveTo(-CROSSHAIR_RADIUS, 0).lineTo(-CROSSHAIR_RADIUS * 0.2, 0);
  crosshair.graphics.moveTo(CROSSHAIR_RADIUS, 0).lineTo(CROSSHAIR_RADIUS * 0.2, 0);
  crosshair.graphics.moveTo(0, -CROSSHAIR_RADIUS).lineTo(0, CROSSHAIR_RADIUS);
  crosshair.graphics.moveTo(0, -CROSSHAIR_RADIUS).lineTo(0, CROSSHAIR_RADIUS);
  return crosshair;
}
