var snake;
var scl = 40;
var food;
var joystick;

function setup() {
	createCanvas(windowWidth, windowHeight);
	snake = new Snake();
	food = new Food();
	joystick = new VirtualJoystick({
		mouseSupport  : true,
    	limitStickTravel: true,
    	stickRadius : 50	
	})
	frameRate(10);

}


function draw() {
  background(50);
  textSize(15);
  fill(35);
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
		if(snake.xspeed != 0 && snake.yspeed != 1){
			snake.dir(0,-1);
		}
	}else if(keyCode == DOWN_ARROW || keyCode == 83){
		if(snake.xspeed != 0 && snake.yspeed != -1){
			snake.dir(0,1);
		}
	}else if(keyCode == LEFT_ARROW || keyCode == 65){
		if(snake.xspeed != 1 && snake.yspeed != 0){
			snake.dir(-1,0);
		}
	}else if(keyCode == RIGHT_ARROW || keyCode == 68){
		if(snake.xspeed != -1 && snake.yspeed != 0){
			snake.dir(1,0);		
		}

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



//imgay

