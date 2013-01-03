/* body.js
 *
 * This file represents one attacking enemy on the screen
 * A body is represented by a bunch of circles
 *
 * Vocabulary:
 * - stage: the canvas container to play graphics in
 * - subbody: a circle that represents a piece of the body
 */

function Body(container, x, y, bodyData) {
  // Set true to draw circles for subbodies
  var USING_VISUAL_STUBS = true;
  var RECOIL_TIME = 0.5;
  var MERCY_TIME = 0.5;

  // Initializes the Body and draws it
  // Arguments:
  // - container: An EaselJS container for the body to store its circles in
  // - x: A x coordinate for the entirety of the body within the zone
  // - y: A y coordinate for the entirety of the body within the zone
  // - bodyData: an object of {health:_, x:_,y:_, states:[{subbodies...}..]}
  // - id: a string or integer to identify the body. If not specified,
  //       a random probabalistically unique value will be used.
  this.initialize = function(container, x, y, bodyData, id) {
    this.stage = container;
    this.x = x;
    this.y = y;
    this.health = bodyData.health;
    this.states = generateStates(bodyData.states);

    this.id = (typeof id !== 'undefined') ? id : md5(Math.random());

    // If 0 or less, the body is attackable
    this.mercyTime = 0;

    // set this.currentState, this.currentStateIndex,
    // and this.remainingStateTime
    this.setState(0);

  }

  // Every game frame, the body has a chance to change state
  $(this).bind("frame", function(event) {
    this.updateState();
    this.updateMercyTime();
  });

  // Update the remaining state time
  // If remaining state time has run out, then move to the next state
  this.updateState = function() {
    this.remainingStateTime -= FRAME_INTERVAL;
    if (this.remainingStateTime <= 0) {
      this.setState(this.currentStateIndex + 1);
    }
  }

  // Switch states of the body
  // setting this.currentState, this.currentStateIndex,
  // and this.remainingStateTime
  // Also draws the body with the new state
  // Arguments:
  // - index: the index within this.states of the new state to switch to.
  //          if index > states.length, uses index % this.states.length
  this.setState = function(index) {
    index = index % this.states.length;
    this.currentStateIndex = index;
    this.currentState = this.states[index];
    this.remainingStateTime = this.currentState.time;
    this.drawBody();
  }

  // Renders the subbodies in the body's container
  // Works only if USING_VISUAL_STUBS is set to true
  this.drawBody = function() {
    this.stage.removeAllChildren();

    if (this.currentState.image !== 'null')
      this.stage.addChild(this.currentState.image);
    if (USING_VISUAL_STUBS) {
      var subbodies = this.currentState.subbodies;
      for (var i = 0; i < subbodies.length; i++) {
        var subbody = subbodies[i];
        var shape = new createjs.Shape();
        shape.setTransform(0, 0);
        shape.graphics.beginFill("green");
        shape.graphics.drawCircle(subbody.x, subbody.y, subbody.radius);
        this.stage.addChild(shape);
      }
    }
  }

  // Visually distorts the body in reaction to having taken damage
  this.flashDamageTaken = function() {
    this.mercyTime = MERCY_TIME;
  }

  // Update the remaining damage time along with any visual effects associated with damage
  this.updateMercyTime = function() {
    this.mercyTime -= FRAME_INTERVAL;
    this.stage.alpha = Math.min(1 - (this.mercyTime / MERCY_TIME), 1);
  }

  // Checks if the target X and Y collide with this body
  // A collision does not include the outer border of the body.
  //  Nobody ever dies from those!
  // Arguments:
  // - tX: The X coordinate to check
  // - tY: The Y coordinate to check
  // Returns:
  // - true if the body collides. false otherwise
  this.checkCollision = function(tX, tY) {
    var subbodies = this.currentState.subbodies;
    for (var i = 0; i < subbodies.length; i++) {
      if (subbodies[i].checkCollision(tX, tY)) {
        return true;
      }
    }
    return false;
  }

  // Logic that occurs upon being shot by a player
  // Health reduces by one, and if health is 0, dies
  // Returns:
  // - true if dead, otherwise false
  this.takeDamage = function() {
    if (this.mercyTime <= 0) {
      this.health -= 1;
      this.flashDamageTaken();
      debug_log(this.id + "took damage. health: " + this.health);
    }
    return this.health == 0;
  }

  this.initialize(container, x, y, bodyData);
}

// Creates subbodies from circle data
// Arguments:
// - circleData: An array of {x: _x_coord, y: _y_coord, radius: _radius}
// Returns:
// - An array of Subbody objects
function createSubbodies(circleData) {
  var subbodies = []
  for (var i = 0; i < circleData.length; i++) {
    var data = circleData[i];
    subbodies.push(new Subbody(data.x, data.y, data.radius));
  }
  return subbodies;
}

// Generates state data for the body
// Arguments:
// - stateData: an array of [{subbodies:[{x:_,y:_,radius:_}, time:_},{..}]},{...},..]
// Returns:
// - An array of states
function generateStates(stateData) {
  var states = []
  for (var i = 0; i < stateData.length; i++) {
    var state = stateData[i];
    var subbodies = createSubbodies(state.subbodies);
    if (state.image !== undefined)
      var image = new createjs.Bitmap(state.image);

    states.push({
      subbodies: subbodies,
      time: state.time,
      image: image
    });
  }
  return states;
}

function Subbody(x, y, radius) {

  // Initializes the Subbody
  // Arguments:
  // - x: The x coordinate of the subbody relative to the body offset
  // - y: The y coordinate of the subbody relative to the body offset
  // - r: The radius of the subbody
  this.initialize = function(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  // Checks if the target X and Y collide with this subbody
  // A collision does not include the outer border of the subbody.
  //  Nobody ever dies from those!
  // Arguments:
  // - tX: The X coordinate to check
  // - tY: The Y coordinate to check
  // Returns:
  // - true if the subbody collides. false otherwise
  this.checkCollision = function(tX, tY) {
    var dist = Math.sqrt(Math.pow(this.x - tX, 2) + Math.pow(this.y - tY, 2));
    return dist < this.radius;
  }

  this.initialize(x, y, radius);
}
