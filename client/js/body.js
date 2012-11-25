/* body.js
 *
 * This file represents one attacking enemy on the screen
 * A body is represented by a bunch of circles
 * A body should not worry about it's position within a zone.
 * The zone will handle such details.
 *
 * Vocabulary:
 * - stage: the canvas container to play graphics in
 * - subbody: a circle that represents a piece of the body
 */

function Body(container, x, y, circleData) {
  // Set true to draw circles for subbodies
  var USING_VISUAL_STUBS = true

  // Initializes the Body and draws it
  // Arguments:
  // - container: An EaselJS container for the body to store its circles in
  // - x: A x coordinate for the entirety of the body
  // - y: A y coordinate for the entirety of the body
  // - circleData: An array of {x: _x_coord, y: _y_coord, radius: _radius}
  this.initialize = function(container, x, y, circleData) {
    this.stage = container;
    this.x = x;
    this.y = y;
    this.subbodies = createSubbodies(circleData);
    this.drawBody();
  }

  // Renders the subbodies in the body's container
  // Works only if USING_VISUAL_STUBS is set to true
  this.drawBody = function() {
    if (USING_VISUAL_STUBS) {
      for (var i = 0; i < this.subbodies.length; i++) {
        var subbody = this.subbodies[i];
        // var circle =  (new createjs.Shape()).graphics.f("green")
        // circle.dc(subbody.x, subbody.y, subbody.radius);
        console.log(subbody.x + " " + subbody.y + " " + subbody.radius);
        this.stage.addChild(new createjs.Shape()).setTransform(0, 0).graphics.f("green").dc(subbody.x, subbody.y, subbody.radius);
        // this.stage.addChild(circle);
      }
    }
  }


  this.initialize(container, x, y, circleData);
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

  // Checks if the target X and Y collide with his body
  // A collision does not include the outer border of the body.
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
