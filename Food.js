function Food(){

	this.x = scl*floor(random(0,width/scl));
	this.y = scl*floor(random(0,height/scl));

	this.pickLocation = function(){
		this.x = scl*floor(random(0,width/scl));
		this.y = scl*floor(random(0,height/scl));
	}

	this.show = function(){
		fill(175);
		rect(this.x,this.y,scl,scl)
	}

	
}

//imgay
