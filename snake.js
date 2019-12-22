var c = document.getElementById("game");
var ctx = c.getContext("2d");

var width = 400;
var height = 400;
c.width = width;
c.height = height;

var total = width*height;

var hist = new Array(total);
//Difference between c_iter and d_iter determine the length of the snake
var d_iter = 0;
var c_iter = 100;

var snake = {}
snake.head = [0,0];
snake.move = function(x,y){
  //Moving the head
  var current_pos = this.head;
  c_iter += 1 % total;
  hist[c_iter] = Array.from(current_pos); //Deep copying
  this.head = [x%width,y%height];

  //Droping last tile (tail)
  d_iter += 1 % total;
  hist[d_iter] = undefined;
}
snake.inertia = [1,0];

function draw(){
  //ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;
  for(let k = 0; k<total; k++){
    if(hist[k]){
      ctx.rect(hist[k][0],hist[k][1],1,1);
      ctx.stroke();
    }
  }
}

function keymap(event){
  switch (event.keyCode) {
        case 37:
            snake.inertia = [width-1,0];
            break;
        case 38:
            snake.inertia = [0,height-1];
            break;
        case 39:
            snake.inertia = [1,0];
            break;
        case 40:
            snake.inertia = [0,1];
            break;
    }
}
document.addEventListener('keydown', keymap);

function dynamics(){
  //Move the snake
  snake.move(snake.head[0]+snake.inertia[0],snake.head[1]+snake.inertia[1]);
  //Draw updated snake
  draw();
}
setInterval(dynamics,10);
