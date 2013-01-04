/* mtool.js
 * 
 * The body drawing tool is used to create bodies out of images
 * mtool is in charge of the user interface for this tool
 */

head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");

head.ready(function() {

  // Draws a circle to the container. returns the radius
  function drawCircle(container, x, y, x2, y2, color, fill) {
    var radius = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    var shape = new createjs.Shape();
    shape.x = start_x;
    shape.y = start_y;
    if (fill)
      shape.graphics.beginFill(color);
    else
      shape.graphics.beginStroke(color);
    shape.graphics.drawCircle(0, 0, radius);
    container.addChild(shape);
    return radius;
  }

  function setBackgroundImage(image_uri) {
    background.removeAllChildren();
    var image = new createjs.Bitmap(image_uri);
    background.addChild(image);
  }

  function outputBody(states) {
    outputArea = jQuery("#output");
    outputArea.text(outputArea.text() + "\n" + JSON.stringify(createNewBody(states)) + "\n");
  }

  // Creates a body from default using the given states
  function createNewBody(states) {
    return {
              health: 3,
              x: 0,
              y: 0,
              entryTime: 0,
              states: states
           };
  }

  // Creates a State from default using the given subbodies and image
  function createNewState(subbodies, image) {
    return {
              subbodies: subbodies,
              time: 5,
              image: image,
              attackSequence: null
           };
  }

  function createNewSubbody(x, y, r) {
    return {
              x: x,
              y: y,
              radius: r
           };
  }

  var currentStates = [];
  function resetStates() {
    currentStates = [];
  }

  function addState(subbodies, image) {
    currentStates.push(createNewState(subbodies, image));
    console.log(currentStates);
  }

  var currentSubbodies = [];

  function resetSubbodies() {
    currentSubbodies = [];
  }

  function addSubbody(x, y, r) {
    currentSubbodies.push(createNewSubbody(x, y, r));
    console.log(currentSubbodies);
  }





  var stage      = new createjs.Stage("gameCanvas");
  // Circles that are part of the finished product
  var finished   = new createjs.Container();
  // Circles part of the temporary mouse held down drawing
  var incomplete = new createjs.Container();
  var background = new createjs.Container();

  var currentBackgroundImage = "assets/images/zone1.jpg";
  setBackgroundImage(currentBackgroundImage);

  stage.addChild(background);
  stage.addChild(finished);
  stage.addChild(incomplete);

  var start_x;
  var start_y;


  // Does the user current have the mouse pressed to draw?
  var drawing = false;

  // User Controls
  stage.onMouseDown = function(event) {
    start_x = event.stageX;
    start_y = event.stageY;

    drawing = true;
  };

  // When the mouse is released, draw the circle permanently
  stage.onMouseUp = function(event) { 
    incomplete.removeAllChildren();

    var radius = drawCircle(finished, start_x, start_y, event.stageX, event.stageY, 'blue', true);
    addSubbody(start_x, start_y, radius);

    drawing = false;
  };

  // When the mouse is dragged, draw temporary intermediate circles
  stage.onMouseMove = function(event) {
    incomplete.removeAllChildren();

    if (drawing) {
      drawCircle(incomplete, start_x, start_y, event.stageX, event.stageY, 'green', false);
    }
  };

  // On key press
  jQuery(window).keyup(function(event) {
    if (event.keyCode == 32 || event.keyCode == 13) {
      addState(currentSubbodies, currentBackgroundImage);
      resetSubbodies();
    }
    if (event.keyCode == 13) {
      outputBody(currentStates);
      resetStates();
    }
  });







  // Visual Frame updates should happen at this time
  setInterval(function() {
    stage.update();
  },30);
});
