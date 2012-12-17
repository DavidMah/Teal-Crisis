head.js("js/lib/easeljs-0.5.0.min.js");
head.js("js/lib/jquery-1.8.3.min.js");

head.ready(function() {
	console.log('this worked!');
	var stage = new createjs.Stage("gameCanvas");

	var s = new createjs.Shape();
	s.x = 100;
	s.y = 100;
	s.graphics.beginStroke('blue');
	s.graphics.drawCircle(5, 5, 50);
	stage.addChild(s);
	stage.update();

	stage.onMouseUp = function(event) {
       
        var s = new createjs.Shape();
		s.x = event.stageX;
		s.y = event.stageY;
		s.graphics.beginStroke('blue');
		s.graphics.drawCircle(5, 5, 50);
		stage.addChild(s);
		stage.update();
    }

	  // Visual Frame updates should happen at this time
    setInterval(function() {
        stage.update()
    },100);
});