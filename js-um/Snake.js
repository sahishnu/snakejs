// This defines the snake object.


function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.score = 0;
	this.total = 0; // number of food eaten so far (also like score)
	this.tail = []; // the trailing squares behind the snake (like history)
	this.gameOver = false;
	this.color = Math.floor(Math.random() * 3) + 1
	this.r = 0;
	this.g = 0;
	this.b = 0;

	switch(this.color){
		case 1:
			this.r = 1;
			break;
		case 2:
			this.g = 1;
			break;
		case 3:
			this.b = 1;
			break;
		default:
			this.g = 1;

	} 

	// This is called every frame to update the snake
	this.update = function(){

		// update the snake location based on snake direction.
		// constrain its location upto the screen width minus the size of the snake.
		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
		this.x = constrain(this.x,0,width-scl);
		this.y = constrain(this.y,0,height-scl);

		// creates a vector to store the snakes position (x,y)
		var v = createVector(this.x,this.y);
		this.tail.push(v); // pushes vector to tail array
		this.tail.splice(0,this.tail.length-this.total-1); // only keeps last (total) number of entries

		// displays score in center of screen
		textAlign(CENTER);
		textSize(38);
		fill(175);
		text(this.total, width/2, height/2);
	}

	this.show = function(){
		noStroke();
		//draws the snake
		for(var i = 0; i < this.tail.length; i++){
			fill(this.r*i*2,this.g*i*2,this.b*i*2); //gradient effect for snake
			rect(this.tail[i].x,this.tail[i].y,scl,scl);
		}
	}


	// Checks for snake crashing into itself
	this.crash = function(){
		for(var i = 0; i < this.tail.length-1; i++){
			var pos = this.tail[i];
			var dis = dist(this.x,this.y,pos.x,pos.y);
			if(dis < 3){
				this.score = this.total;
				this.total = 0;
				this.tail = [];
				this.x = 0;
				this.y = 0;
				this.xspeed = 0;
				this.yspeed = 0;
				this.gameOver = true;
			}
		}
	}


	// makes the snake bigger when it eats food
	this.eat = function(food){
		var d = dist(this.x,this.y,food.x,food.y);
		if(d < 3){
			this.total = this.total + 1;
			return true;
		}else{
			return false;
		}
	}

	// set the direction of the snake
	this.dir = function(x,y){

		if(this.total == 0){
			this.xspeed = x;
			this.yspeed = y;
		}

		if(x * -1 != this.xspeed){
			this.xspeed = x;
		}else{
			this.xspeed = this.xspeed;
		}
		if(y * -1 != this.yspeed){
			this.yspeed = y;
		}else{
			this.yspeed = this.yspeed;
		}
	}
}