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
			fill(0,0+i*scl/3,0); //gradient effect for snake
			rect(this.tail[i].x,this.tail[i].y,scl,scl);
		}
	}


	// Checks for snake crashing into itself
	this.crash = function(){
		for(var i = 0; i < this.tail.length-1; i++){
			var pos = this.tail[i];
			var dis = dist(this.x,this.y,pos.x,pos.y);
			if(dis < 1){
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

	this.dir = function(x,y){
		if(x * -1 != this.xspeed){
			this.xspeed = x;
		}
		if(y * -1 != this.yspeed){
			this.yspeed = y;
		}
	}
}