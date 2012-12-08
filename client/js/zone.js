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
    var exampleData = [
      {
        health: 5,
        x: 200,
        y: 400,
        states: [
          {
            subbodies: [
              {x: 60.0,  y: 90.0, radius: 50.0},
              {x: 30.0,  y: 20.0, radius: 40.0},
              {x: 70.0,  y: 40.0, radius: 30.0},
              {x: 80.0,  y: 10.0, radius: 20.0},
              {x: 30.0,  y: 50.0, radius: 10.0}
            ],
            time: 5
          },
          {
            subbodies: [
              {x: 40.0,  y: 20.0, radius: 10.0},
              {x: 60.0,  y: 90.0, radius: 20.0},
              {x: 80.0,  y: 30.0, radius: 30.0},
              {x: 120.0, y: 20.0, radius: 40.0},
              {x: 90.0,  y: 50.0, radius: 50.0}
            ],
            time: 2
          }
        ]
      },
      {
        health: 5,
        x: 400,
        y: 400,
        states: [
          {
            subbodies: [
              {x: 40.0,  y: 20.0, radius: 10.0},
              {x: 60.0,  y: 90.0, radius: 20.0},
              {x: 80.0,  y: 30.0, radius: 30.0},
              {x: 120.0, y: 20.0, radius: 40.0},
              {x: 90.0,  y: 50.0, radius: 50.0}
            ],
            time: 9999
          }
        ]
      }
    ]

    for (var i = 0; i < exampleData.length; i++) {
      var body = exampleData[i];
      this.createBody(body.x, body.y, body);
    }
  }

  // Creates a body and adds it to the zone
  this.createBody = function(x, y, subbodyData) {
    var bodyContainer = this.stage.addChild(new createjs.Container());
    bodyContainer.setTransform(x, y);
    this.bodies.push(new Body(bodyContainer, x, y, subbodyData));
  }

  // When the player makes a gunShot, collision testing needs to be run
  // on all of the remaining bodies in the zone
  jQuery(this).on("gunShot", function(data) {
    this.runAttackCollisions(data.stageX, data.stageY);
  });

  // On every frame entry, every body needs to update its state
  jQuery(this).on("frame", function(data) {
    // Re propogate the state update needs through events to be asyncronous
    for (var i = 0; i < this.bodies.length; i++) {
      jQuery(this.bodies[i]).trigger("frame", data);
    }
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
          this.bodies.splice(i, 1);
        }
        return;
      }
    }
  }

  this.initialize(container);
}
