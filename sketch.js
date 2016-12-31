var snake;
var scl = 40;
var food;
var joystick;
var name;



function setup() {

	createCanvas(windowWidth, windowHeight);

	snake = new Snake();
	food = new Food();
	joystick = new VirtualJoystick({
		mouseSupport  : true,
    	limitStickTravel: true,
    	stickRadius : 50
	});

	frameRate(10);

}


function draw() {
	background(50);
	snake.update();
	animate();
	snake.show();
	snake.crash();
	food.show();
	if(snake.eat(food)){
		food.pickLocation();
	}
	snake.crash();
}

function keyPressed(){
	if(keyCode == UP_ARROW || keyCode == 87){
			snake.dir(0,-1);
	}else if(keyCode == DOWN_ARROW || keyCode == 83){
			snake.dir(0,1);
	}else if(keyCode == LEFT_ARROW || keyCode == 65){
			snake.dir(-1,0);
	}else if(keyCode == RIGHT_ARROW || keyCode == 68){
			snake.dir(1,0);
	}
}

function animate(){
	if( joystick.right() ){
		snake.dir(1,0);
	}
	if( joystick.left() ){
		snake.dir(-1,0);
	}
	if( joystick.up() ){
		snake.dir(0,-1);
	}
	if( joystick.down() ){
		snake.dir(0,1);
	}
}


function getHighestScore() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(xhttp.responseText);
			var user = document.getElementsByClassName('user-name')[0];
			var highscore = document.getElementsByClassName('user-score')[0];
			if (data && data.length > 0 && data[0]) {
				user.innerHTML = data[0].user;
				highscore.innerHTML = data[0].score;
			}
		}
	}
	xhttp.open("GET", "http:localhost:3000/api/getHighestScore", true);
	xhttp.send();
}

window.onload = function() {
	getHighestScore();
};