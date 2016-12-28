function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	this.total = 0;

	this.update = function(){

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x,0,width-scl);
		this.y = constrain(this.y,0,height-scl);

		var v = createVector(this.x,this.y);
		this.tail.push(v);
		this.tail.splice(0,this.tail.length-this.total-1);
		textSize(38);
		fill(175);
		text(this.total, width/2, height/2);
	}

	this.show = function(){
		noStroke();
		fill(0,255,0);
		rect(this.x,this.y, scl, scl);
		for(var i = 0; i < this.tail.length; i++){
			fill(0,255-i*scl/2,0);
			rect(this.tail[i].x,this.tail[i].y,scl,scl);
		}
	}

	this.crash = function(){
		for(var i = 0; i < this.tail.length-1; i++){
			var pos = this.tail[i];
			var dis = dist(this.x,this.y,pos.x,pos.y);
			if(dis < 1){
				this.total = 0;
				this.tail = [];
		
			}
		}
	}

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
		this.xspeed = x;
		this.yspeed = y;
	}
}
//imgay
