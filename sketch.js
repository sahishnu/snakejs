var snake;
var scl = 20;
var food;

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
  food.show();
  if(snake.eat(food)){
  	food.pickLocation();
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
//imgay

