//hammer.js
(function snakeGame() {
var i=0;
var scoreElement = document.getElementById('score');
var w = window.innerWidth;
var h = window.innerHeight;
var tail = [];
var snakePosLog = [];
var ww = w -50;
var ww2 = ww- 50;
var hh = h -50;
var hh2 = hh -50;
var audio = document.getElementById('blop');
var food = document.getElementById('c');
var snake = document.getElementById('b');
var speed = 100;
var intervalRight;
var intervalBottom;
var intervalLeft;
var intervalTop;
var direction = "right";
var maxSpeed = 100;
var speedElement = document.getElementById('speed');
speedElement.innerHTML = speed;
    Snake = {
		properRandom: function(min, max){
		min = Math.ceil(min);
		max = Math.floor(max/50);
		return Math.floor(Math.random() * (max - min))*50;
		},
		generateRandomPosition:function(){
			var position = [];
			var randomPosX = this.properRandom(1, w);
			var randomPosY = this.properRandom(1, h);
			position.push(randomPosX, randomPosY);
			return position;
		},
		score:function(){
			i+= 50;
			score.innerHTML=i
		
		},
		hiScore:function(){
            var best = localStorage.getItem('hiScore')
                if (i > best) {
                    localStorage.setItem('hiScore', i)
                    var bestOn = localStorage.getItem('hiScore')
                    hiscore.innerHTML = bestOn
                }else if(best == null){
                    localStorage.setItem('hiScore', 0)
                    var best0 = localStorage.getItem('hiScore')
                    hiscore.innerHTML = best0
                }else {
                    hiscore.innerHTML = best
                }
        },
		setFoodPosition:function(){
			var generatePosition = this.generateRandomPosition();
			var x = generatePosition[0];
			var y = generatePosition[1];
			food.style.transform = "translate("+x+"px,"+y+"px)";
			food.setAttribute('data-x',x);
			food.setAttribute('data-y',y);
		},
		getFoodCurrentPosition:function(){
			var currentPosition=[];
			var currX = food.dataset.x;
			var currY = food.dataset.y;
			currentPosition.push(currX, currY);
			return currentPosition
		},
		getSnakeCurrentPosition:function(){
			var snakeCurrentPosition=[];
			var snakeCurrX = snake.dataset.x;
			var snakeCurrY = snake.dataset.y;
			snakeCurrentPosition.push(snakeCurrX, snakeCurrY);
			console.log("aktualna Pozycja wunsza: "+snakeCurrentPosition)
			return snakeCurrentPosition;
		},
		createTail:function(){
			var div = document.createElement('div');
			div.className = 'tail';
			var htmlString= " ";
			div.innerHTML = htmlString.trim();
			document.querySelector("#a").appendChild(div);
		},
		handleMoving:function(currPosition){
			var tailElement = document.
			getElementsByClassName('tail');
			var logLength = snakePosLog.length;
			var start = logLength - tailElement.length;
			var secondArray = snakePosLog.slice(start, logLength - 1);
			console.log(secondArray);
			for(var i=0; i<tailElement.length; i++){
				var desiredPosition = logLength - i -1;
				tailElement[i].style.top = 
				snakePosLog[desiredPosition][1]+"px";
			
				tailElement[i].style.left = 
				snakePosLog[desiredPosition][0]+"px";
				
			}
			var a = JSON.stringify(secondArray);
			var b = JSON.stringify(currPosition);
			var c = a.indexOf(b)
			if(c != -1){
					alert("XD frajer")
					this.restartGame();
				}
		},
		restartGame:function(){
			tail = [];
			snakePosLog = [];
			clearInterval(intervalTop);
			clearInterval(intervalLeft);
			clearInterval(intervalRight);
			clearInterval(intervalBottom);
			direction = "right";
			speed = 100;
			i=0;
			document.getElementById('score').innerHTML=0;
			
			[].forEach.call(document.querySelectorAll('.tail'),function(e){
				e.parentNode.removeChild(e);
				});
			this.setFoodPosition();
			snake.setAttribute('data-y', 0);
			snake.setAttribute('data-x', 50);
			snake.style.top = 0 + "px";
			snake.style.left = 50 + "px";
			scoreElement.innerHTML = speed;
			this._directions.moveRight();
		},
		handleCollision:function(){
			var currentFoodPosition = this.getFoodCurrentPosition();
			var foodX= parseInt(currentFoodPosition[0]);
			var foodY = parseInt(currentFoodPosition[1]);
			
			var currentSnakePosition = this.getSnakeCurrentPosition();
			var snakeX = parseInt(currentSnakePosition[0]);
			var snakeY = parseInt(currentSnakePosition[1]);
			
			if(foodX == snakeX && foodY == snakeY){
				this.createTail();
				tail.push([foodX, foodY]);
				
				this.score();
				this.setFoodPosition();
				this.hiScore();
				audio.play();
				if(speed <= maxSpeed){
				}else{
				speed -= 50;
				speedElement.innerHTML = speed;
				}				
			}
		},
		_directions: {
			moveUp:function(){
				clearInterval(intervalBottom);
				clearInterval(intervalRight);
				clearInterval(intervalLeft);
				intervalTop = setInterval(function(){
				var currPos = Snake.getSnakeCurrentPosition();
				var currSnakeY = parseInt(currPos[1]);
				var nextSnakePositionY = currSnakeY - 50;
				snake.setAttribute('data-y', nextSnakePositionY);
				var currSnakeX = parseInt(currPos[0]);
				snake.style.top = nextSnakePositionY + "px";
				snake.style.left = currSnakeX + "px";
				Snake.handleCollision();
				if(currSnakeY <=0){
					snake.setAttribute('data-y', Math.round(hh / 50)*50);
					snake.style.top = Math.round(hh / 50) * 50 + "px";
					snake.style.left = currSnakeX + "px";
				}
				snakePosLog.push([currSnakeX,currSnakeY]);
				Snake.handleMoving([currSnakeX,nextSnakePositionY]);
				console.log(snakePosLog);
				},speed)
			},
			moveRight:function(){
				clearInterval(intervalBottom);
				clearInterval(intervalTop);
				clearInterval(intervalLeft);
				intervalRight = setInterval(function(){
				var currPos = Snake.getSnakeCurrentPosition();
				var currSnakeX = parseInt(currPos[0]);
				var nextSnakePositionX = currSnakeX + 50;
				snake.setAttribute('data-x', nextSnakePositionX);
				var currSnakeY = parseInt(currPos[1]);
				snake.style.left = nextSnakePositionX + "px";
				snake.style.top = currSnakeY + "px";
				Snake.handleCollision()
				if(currSnakeX > ww2){
					snake.setAttribute('data-x', 0);
					snake.style.left = 0 + "px";
					snake.style.top = currSnakeY+ "px";
				}
				snakePosLog.push([currSnakeX,currSnakeY]);
				Snake.handleMoving([nextSnakePositionX,currSnakeY]);
				console.log(snakePosLog);
				},speed)
			},
			moveBottom:function(){
				clearInterval(intervalTop);
				clearInterval(intervalLeft);
				clearInterval(intervalRight);
				intervalBottom = setInterval(function(){
				var currPos = Snake.getSnakeCurrentPosition();
				var currSnakeY = parseInt(currPos[1]);
				var nextSnakePositionY = currSnakeY + 50;
				snake.setAttribute('data-y', nextSnakePositionY);
				var currSnakeX = parseInt(currPos[0]);
				snake.style.top = nextSnakePositionY + "px";
				snake.style.left = currSnakeX + "px";
				Snake.handleCollision()
				if(currSnakeY > hh2){
					snake.setAttribute('data-y', 0);
					snake.style.top = 0 + "px";
					snake.style.left = currSnakeX + "px";
				}
				snakePosLog.push([currSnakeX,currSnakeY]);
				Snake.handleMoving([currSnakeX,nextSnakePositionY]);
				console.log(snakePosLog);
				},speed)
			},
			moveLeft:function(){
				clearInterval(intervalRight);
				clearInterval(intervalTop);
				clearInterval(intervalBottom);
				intervalLeft = setInterval(function(){
				var currPos = Snake.getSnakeCurrentPosition();
				var currSnakeX = parseInt(currPos[0]);
				var nextSnakePositionX = currSnakeX - 50;
				snake.setAttribute('data-x', nextSnakePositionX);
				var currSnakeY = parseInt(currPos[1]);
				snake.style.left = nextSnakePositionX + "px";
				snake.style.top = currSnakeY + "px";
				Snake.handleCollision()
				if(currSnakeX <=0){
					snake.setAttribute('data-x', Math.round(ww / 50)*50);
					snake.style.left = Math.round(ww / 50) * 50 + "px";
					snake.style.top = currSnakeY + "px";
				}
				snakePosLog.push([currSnakeX,currSnakeY]);
				Snake.handleMoving([nextSnakePositionX,currSnakeY]);
				console.log(snakePosLog);
				},speed)				
			},
		},
		snakeMove:function(){
			window.addEventListener('keyup',function(){
				if (event.keyCode == 38 ){
				if(direction != "up" && direction != "bottom"){
				Snake._directions.moveUp();}
					direction = "up";
				}else if(event.keyCode == 39)
				{
					if(direction != "left" && direction != "right"){
					Snake._directions.moveRight();}
					direction = "right";
					
				}else if(event.keyCode == 40)
				{
					if(direction != "up" && direction != "bottom"){
					Snake._directions.moveBottom();}
					direction = "bottom";
				}else if(event.keyCode == 37){
					if(direction != "left" && direction != "right"){
					Snake._directions.moveLeft();}
					direction = "left";
				}
			},false)
		},
		_init:function(){
			this.snakeMove();
			this.setFoodPosition();
			score.innerHTML=i;
			this.hiScore();
			this._directions.moveRight();
        }
    }
    Snake._init();
})();