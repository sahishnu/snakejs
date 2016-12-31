// This defines the Food object the snake eats to grow.

function Food(){

	// Divides the screen into width(or height)/scl rows and columns 
	//and picks a random row/column for the food to appear on.
	this.x = scl*floor(random(0,(width-scl)/scl));
	this.y = scl*floor(random(0,(height-scl)/scl));

	this.pickLocation = function(){
		this.x = scl*floor(random(0,(width-scl)/scl));
		this.y = scl*floor(random(0,(height-scl)/scl));
	}

	this.show = function(){
		fill(175);
		rect(this.x,this.y,scl,scl);
	}

	
}

//imgay
