var snake;
var scl = 40;
var food;
var joystick;
var name;
var level = 10;
var count = 5;
var database;
var modelout = false;
var mutex = false;
var hpadding;
var vpadding;
var temphighscore;


function setup() {
	hpadding = windowWidth - windowWidth%scl;
	vpadding = windowHeight - windowHeight%scl;
	createCanvas(hpadding, vpadding);

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDS6UXulI-e_xed3iQx1HWUk-6mF6CKw4A",
		authDomain: "snekjs-932e0.firebaseapp.com",
		databaseURL: "https://snekjs-932e0.firebaseio.com",
		storageBucket: "snekjs-932e0.appspot.com",
		messagingSenderId: "600064049611"
	};
	firebase.initializeApp(config);
	database = firebase.database();

	vex.dialog.prompt({
	    message: 'Enter your name:',
	    callback: function (value) {
	        if (value) {
				name = value;
	            console.log('Successful');
	            modelout = true;
	        } else {
	            console.log('Error.');
	        }
	    }
	})

	var ref = database.ref('scores');
	ref.on('value', gotData, errData);

	snake = new Snake();
	food = new Food();
	frameRate(level);
	temphighscore = 0;
}


function draw() {
	background(50);
	snake.update();
	snake.show();
	snake.crash();
	food.show();
	tmphighscore();
	mutex = false;
	if(snake.eat(food)){
		food.pickLocation();
		var v = createVector(food.x,food.y);
		for(var i = 0; i < snake.tail.length; i++){
			var s = createVector(snake.tail[i].x,snake.tail[i].y);
			var dis = dist(v.x,v.y,s.x,s.y);
			if(dis < 3){
				console.log("Oops");
				food.pickLocation();
			}
		}
		nextLevel();
		frameRate(level);
	}

	if (snake.gameOver) {
		if(snake.score > temphighscore){
			temphighscore = snake.score;
		}
		sendScore(snake.score);
		level = 10;
		frameRate(level);
		snake.gameOver = false;
	}

}

function tmphighscore(){
	textAlign(CENTER);
	textSize(20);
	fill(65);
	text(temphighscore, width/2, height/2 + height/22);
}

function keyPressed(){
	if(modelout && !mutex){
		mutex = true;
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
}

function nextLevel(){
	if(count == 0){
		frameRate(level++);
		count = 5;
	}else{
		count--;
	}
}

function sendScore(score){
	var data = {
		name: name,
		score: score
	}
	var ref = database.ref('scores');
	ref.push(data);
}


function gotData(data){
	var scores = data.val();
	var keys = Object.keys(scores);
	var highscore = scores[keys[0]].score;
	var name;
	for (var i = 0; i < keys.length; i++){
		var k = keys[i];
		var score = scores[k].score;
		if(score > highscore){
			highscore = score;
			name = scores[k].name;
		}
	}
	//console.log(highscore, name);
	var user = document.getElementsByClassName('user-name')[0];
	var highestscore = document.getElementsByClassName('user-score')[0];
	var snakeskilled = document.getElementsByClassName('snakes-killed-number')[0];
	user.innerHTML = name;
	highestscore.innerHTML = highscore;
	snakeskilled.innerHTML = keys.length;
}

function errData(err){
	console.log('Error');
	console.log(err);
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
	xhttp.open("GET", "http:sbodiwala:3000/api/getHighestScore", true);
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
	xhttp.open("POST", "http:sbodiwala:3000/api/addHighScore", true);
	xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhttp.send(JSON.stringify({user: name, score: score}));
	getHighestScore();
}

