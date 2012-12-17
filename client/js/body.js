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
  var USING_VISUAL_STUBS = true

  // Initializes the Body and draws it
  // Arguments:
  // - container: An EaselJS container for the body to store its circles in
  // - x: A x coordinate for the entirety of the body within the zone
  // - y: A y coordinate for the entirety of the body within the zone
  // - bodyData: an object of {health:_, x:_,y:_, states:[{subbodies...}..]}
  this.initialize = function(container, x, y, bodyData) {
    this.stage = container;
    this.x = x;
    this.y = y;
    this.health = bodyData.health;
    // TODO Will I use my own custom state machine?
    this.currentStateIndex = 0;
    this.states = generateStates(bodyData.states);
    this.currentState = this.states[0];
    this.drawBody();
  }

  // Renders the subbodies in the body's container
  // Works only if USING_VISUAL_STUBS is set to true
  this.drawBody = function() {
    if (USING_VISUAL_STUBS) {
      var subbodies = this.currentState.subbodies;
      for (var i = 0; i < subbodies.length; i++) {
        var subbody = subbodies[i];
        this.stage.addChild(new createjs.Shape()).setTransform(0, 0).graphics.f("green").dc(subbody.x, subbody.y, subbody.radius);
      }
    }
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
    this.health -= 1;
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
    states.push({
      subbodies: subbodies,
      time: state.time
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
