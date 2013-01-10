/* mtool.js
 * 
 * The body drawing tool is used to create bodies out of images
 * mtool is in charge of the user interface for this tool
 */

head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");
head.js("assets/information.js");

head.ready(function() {

  // Draws a circle to the container. returns the radius
  function drawCircle(container, circle, color, fill) {
    var radius = circle.radius;
    var x = circle.x;
    var y = circle.y;
    var shape = new createjs.Shape();
    shape.x = x;
    shape.y = y;
    if (fill) {
      shape.graphics.beginFill(color);
    } else {
      shape.graphics.beginStroke(color);
    }
    shape.graphics.drawCircle(0, 0, radius);
    container.addChild(shape);
    return radius;
  }


  var currentBackgroundImageIndex = 0;
  var currentBackgroundImage = imageList[currentBackgroundImageIndex];

  function setBackgroundImage(image_uri) {
    setImageNames();

    background.removeAllChildren();
    var image = new createjs.Bitmap(image_uri);
    background.addChild(image);
  }

  function nextBackgroundImage() {
    currentBackgroundImageIndex += 1;
    setBackgroundImage(imageList[currentBackgroundImageIndex]);
  }

  function setImageNames() {
    if (currentBackgroundImageIndex < imageList.length) {
      jQuery("#thisImage").text(imageList[currentBackgroundImageIndex]);
    } else {
      jQuery("#thisImage").text("NO IMAGE");
    }

    if (currentBackgroundImageIndex < imageList.length - 1) {
      jQuery("#nextImage").text(imageList[currentBackgroundImageIndex + 1]);
    } else {
      jQuery("#nextImage").text("NO IMAGE");
    }
  }

  function outputBody(states) {
    outputArea = jQuery("#output");
    outputArea.text(outputArea.text() + JSON.stringify(createNewBody(states)) + "\n");
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

  var attacking = false;
  // Creates a State from default using the given subbodies and image
  function createNewState(subbodies, image) {
    return {
              subbodies: subbodies,
              time: 0.5,
              image: image,
              attackSequence: (attacking ? [0.3] : null)
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

  function addSubbody(subbody) {
    currentSubbodies.push(subbody);
    console.log(currentSubbodies);
  }



  var stage      = new createjs.Stage("gameCanvas");
  // Circles that are part of the finished product
  var finished   = new createjs.Container();
  // Circles part of the temporary mouse held down drawing
  var incomplete = new createjs.Container();
  var background = new createjs.Container();

  setBackgroundImage(currentBackgroundImage);

  stage.addChild(background);
  stage.addChild(finished);
  stage.addChild(incomplete);

  var start_x;
  var start_y;


  // Does the user current have the mouse pressed to draw?
  var drawing = false;

  function createNewCircle(x, y, x2, y2) {
    var diameter = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    return createNewSubbody((x + x2) / 2, (y + y2) / 2, (diameter / 2));
  }

  // User Controls
  stage.onMouseDown = function(event) {
    start_x = event.stageX;
    start_y = event.stageY;

    drawing = true;
  };

  // When the mouse is released, draw the circle permanently
  stage.onMouseUp = function(event) { 
    incomplete.removeAllChildren();

    var circleData = createNewCircle(start_x, start_y, event.stageX, event.stageY);
    var radius = drawCircle(finished, circleData, 'blue', true);
    addSubbody(circleData);

    drawing = false;
  };

  // When the mouse is dragged, draw temporary intermediate circles
  stage.onMouseMove = function(event) {
    incomplete.removeAllChildren();

    if (drawing) {
      var circleData = createNewCircle(start_x, start_y, event.stageX, event.stageY);
      drawCircle(incomplete, circleData, 'green', false);
    }
  };

  // On key press
  jQuery(window).keyup(function(event) {
    if (event.keyCode == 66) {
      attacking = true;
    }
    if (event.keyCode == 32 || event.keyCode == 13) {
      console.log(currentBackgroundImage);
      addState(currentSubbodies, currentBackgroundImage);
      resetSubbodies();
      nextBackgroundImage();
      finished.removeAllChildren();
      attacking = false;
      currentBackgroundImage = imageList[currentBackgroundImageIndex];
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
