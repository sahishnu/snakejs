var snake;
var scl = 40;
var food;
var joystick;
var name;



function setup() {

	createCanvas(windowWidth, windowHeight);

	snake = new Snake();
	food = new Food();
	frameRate(10);

}


function draw() {
	background(50);
	snake.update();
	snake.show();
	snake.crash();
	food.show();
	if(snake.eat(food)){
		food.pickLocation();
	}

	if (snake.gameOver) {
		setNewHighScore(snake.score);
		snake.gameOver = false;
	}
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

function setNewHighScore(score) {
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
	xhttp.open("POST", "http:localhost:3000/api/addHighScore", true);
	xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhttp.send(JSON.stringify({user: name, score: score}));
	getHighestScore();
}

function setUserClose() {
	var modal = document.getElementsByClassName('user-modal')[0];
	modal.classList.remove('user-modal-in');
	modal.classList.add('user-modal-out');
	name = document.getElementById('username').value;
}

window.onload = function() {
	var modal = document.getElementsByClassName('user-modal')[0];
	modal.classList.add('user-modal-in');
	getHighestScore();
};