
var slideshow = document.querySelector('.slideshow');
var images = slideshow.querySelectorAll(".img");


var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');


var dotsContainer = slideshow.querySelector('.dots');


var currentIndex = 0;
var interval = 2000;


for (var i = 0; i < images.length; i++) {
    var dot = document.createElement('span');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
    dotsContainer.children[0].classList.add('active');
}

[...dotsContainer.children].forEach((event, index) => {
    event.addEventListener('click', () => {
        currentIndex = index;
        updateSlideshow();
    })
})


prevButton.addEventListener('click', function () {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateSlideshow();
});


nextButton.addEventListener('click', function () {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateSlideshow();
});


function updateSlideshow() {
    for (var i = 0; i < images.length; i++) {
        if (i === currentIndex) {
            dotsContainer.children[i].classList.add('active');
            images[i].classList.add('active');
        } else {
            dotsContainer.children[i].classList.remove('active');
            images[i].classList.remove('active');
        }
    }
}
let timer;
function changeSlide(index) {

    for (let i = 0; i < images.length; i++) {
        if (i === index) {
            dotsContainer.children[i].classList.add('active');
            images[i].classList.add('active');
        } else {
            dotsContainer.children[i].classList.remove('active');
            images[i].classList.remove('active');
        }
    }
 
    currentIndex = index;
}


function startSlideshow() {
    var nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
        nextIndex = 0;
    }
    changeSlide(nextIndex);


    clearTimeout(timer);

    timer = setTimeout(startSlideshow, interval);
    
}


window.addEventListener('load', function () {
    timer = setTimeout(startSlideshow, interval);
});





var spans = document.querySelectorAll('.column span');


spans.forEach(function (span) {
    span.addEventListener('mouseover', function () {

        this.style.backgroundColor = 'orange';
    });

    span.addEventListener('mouseout', function () {

        this.style.backgroundColor = '';
    });
});


var popupImage = document.querySelector(".popup-image");
var months = document.getElementsByClassName("one-on-one");
var imgs = document.getElementsByClassName("image-container");
months[0].classList.add("on");
window.onload = () => {
    for (var j = 0; j < imgs.length; j++) {
        var imageMonth = parseInt(imgs[j].getAttribute("data-month"));
 
        if (imageMonth === 1) {
            imgs[j].style.display = "block";
        } else {
            imgs[j].style.display = "none";
        }
    }
}

for (var i = 0; i < months.length; i++) {
    months[i].addEventListener("click", function () {
        var month = parseInt(this.innerText[0]);

     
        for (var j = 0; j < imgs.length; j++) {
            var imageMonth = parseInt(imgs[j].getAttribute("data-month"));

         
            if (imageMonth === month) {
                imgs[j].style.display = "block";
            } else {
                imgs[j].style.display = "none";
            }
        }
  
        for (var j = 0; j < months.length; j++) {
            months[j].classList.remove("on");
        }
   
        this.classList.add("on");
    });
}



var canvas = document.getElementById("game-board");
var context = canvas.getContext("2d");

var blockSize = 20;
var widthInBlocks = canvas.width / blockSize;
var heightInBlocks = canvas.height / blockSize;

var score = 0;
var snake = [
    { x: widthInBlocks / 2, y: heightInBlocks / 2 }
];
var apple = generateApple();

var direction = "right";
var intervalId;

function drawBlock(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        var snakePart = snake[i];
        drawBlock(snakePart.x, snakePart.y, "#000");
    }
}

function drawApple() {
    drawBlock(apple.x, apple.y, "#f00");
}

function generateApple() {
    return {
        x: Math.floor(Math.random() * widthInBlocks),
        y: Math.floor(Math.random() * heightInBlocks)
    };
}

function checkCollision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}

function checkAppleCollision(newHead) {
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        apple = generateApple();
        return true;
    }
    return false;
}

function gameOver() {
    clearInterval(intervalId);
    context.clearRect(0, 0, canvas.width, canvas.height);

    btn.style.display = 'block';
}

function moveSnake() {
    var head = snake[0];
    var newHead;

    if (direction === "right") {
        newHead = { x: head.x + 1, y: head.y };
    } else if (direction === "down") {
        newHead = { x: head.x, y: head.y + 1 };
    } else if (direction === "left") {
        newHead = { x: head.x - 1, y: head.y };
    } else if (direction === "up") {
        newHead = { x: head.x, y: head.y - 1 };
    }

    if (newHead.x < 0 || newHead.x >= widthInBlocks || newHead.y < 0 || newHead.y >= heightInBlocks || checkCollision(newHead.x, newHead.y, snake)) {
        gameOver();
        return;
    }

    snake.unshift(newHead);

    if (!checkAppleCollision(newHead)) {
        snake.pop();
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    drawScore();
}

function drawScore() {
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillText("Score: " + score, blockSize, blockSize);
}

function changeDirection(event) {
    var key = event.keyCode;
    var newDirection;

    if (key === 38 || key === 40) {
        event.preventDefault();
    }

    if (key === 37 && direction !== "right") {
        newDirection = "left";
    } else if (key === 38 && direction !== "down") {
        newDirection = "up";
    } else if (key === 39 && direction !== "left") {
        newDirection = "right";
    } else if (key === 40 && direction !== "up") {
        newDirection = "down";
    }

    if (newDirection) {
        direction = newDirection;
    }
}
let btn = document.getElementById("btn");
function startGame() {
    clearInterval(intervalId);
    snake = [
        { x: widthInBlocks / 2, y: heightInBlocks / 2 }
    ];
    apple = generateApple();
    score = 0;
    direction = "right";
    intervalId = setInterval(moveSnake, 150);
    btn.style.display = 'none';
}

document.addEventListener("keydown", changeDirection);
btn.addEventListener("click", startGame);

drawScore();
drawSnake();
drawApple();