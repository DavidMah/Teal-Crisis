/* zone.js
 *
 * This file handles interactions of a single gameplay screen
 * A gameplayer screen has
 * - A background
 * - A set of possible bodies
 * - A script where bodies appear(Store as JSON?)
 */

// Modules
head.js("js/body.js");

function Zone(container) {

  // Initializes a body and draws its bodies
  // Arguments:
  // - container
  this.initialize = function(container) {
    this.stage = container
    this.bodies = []

    // TODO: Get this from some source(JSON or something)
    var example_data = [
      {x: 40.0,  y: 20.0, radius: 10.0},
      {x: 60.0,  y: 90.0, radius: 20.0},
      {x: 80.0,  y: 30.0, radius: 30.0},
      {x: 120.0, y: 20.0, radius: 40.0},
      {x: 90.0,  y: 50.0, radius: 50.0},
    ]

    var bodyContainer = this.stage.addChild(new createjs.Container());
    bodyContainer.setTransform(300, 300);
    this.bodies.push(new Body(bodyContainer, 300, 300, example_data, 3));

    bodyContainer = this.stage.addChild(new createjs.Container());
    bodyContainer.setTransform(400, 400);
    this.bodies.push(new Body(bodyContainer, 400, 400, example_data, 4));
  }

  jQuery(this).on("gunShot", function(data) {
    this.runAttackCollisions(data.stageX, data.stageY);
  });

  // Checks if the target X and Y collides with any bodies in this zone
  // If the target does collide, then trigger damage taking for the
  // respective body
  // Arguments:
  // - tX: The X coordinate to check
  // - tY: The Y coordinate to check
  this.runAttackCollisions = function(tX, tY) {
    for (var i = 0; i < this.bodies.length; i++) {
      targetBody = this.bodies[i];
      if (targetBody.checkCollision(tX - targetBody.x, tY - targetBody.y)) {
        if (targetBody.takeDamage()) {
          this.stage.removeChild(targetBody.stage);
        }
        return;
      }
    }
  }

  this.initialize(container);
}
