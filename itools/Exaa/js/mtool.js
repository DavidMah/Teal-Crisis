head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");

head.ready(function() {
	console.log('this worked!');
	var stage = new createjs.Stage("gameCanvas");
	
	var START_X;
	var START_Y;
	var OFFSET_X;
	var OFFSET_Y;
	var RAD;
   
   stage.onMouseDown = function(event) {
      START_X = event.stageX;
      START_Y = event.stageY;
      document.onmousemove = mouseMove;
   }
   
   /*
   //This code has no affect, commented or not
   //Can't get old circle to be removed while drawing a 
   //new circle :(
   function mouseMove(event) {
      OFFSET_X = event.stageX;
      OFFSET_Y = event.stageY;
      var xs = 0;
      var ys = 0;
      xs = OFFSET_X - START_X;
      xs = xs * xs;
      ys = OFFSET_Y - START_Y;
      ys = ys * ys;
      RAD = Math.sqrt(xs + ys);
      var s = new createjs.Shape();
      s.x = START_X;
      s.y = START_Y;
      s.graphics.beginStroke('blue');
      s.graphics.drawCircle(0,0, RAD);
      stage.addChild(s);
		stage.update();
   }*/
      
	stage.onMouseUp = function(event) { 
      OFFSET_X = event.stageX;
      OFFSET_Y = event.stageY;
      var xs = 0;
      var ys = 0;
      xs = OFFSET_X - START_X;
      xs = xs * xs;
      ys = OFFSET_Y - START_Y;
      ys = ys * ys;
      RAD = Math.sqrt(xs + ys);
      var s = new createjs.Shape();
      s.x = START_X;
      s.y = START_Y;
      s.graphics.beginStroke('blue');
      s.graphics.drawCircle(0,0,RAD);

		stage.addChild(s);
		stage.update();
    }

	  // Visual Frame updates should happen at this time
    setInterval(function() {
        stage.update()
    },100);
});