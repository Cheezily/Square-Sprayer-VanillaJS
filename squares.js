var maxStars = 100;
var startingStars = 40;
var starBurst = 15;
var startX = Math.floor(screen.availWidth/10);
var startY = Math.floor(screen.availHeight/10)
var starSpeed = Math.floor(screen.availWidth/500);
var sizePxGrowth = 3;
var shadowGrowth = .5;
var borderGrowth = .1;
var stars = [];
var target = document.getElementById("target");
var dragX = 0;
var dragY = 0;

var delay = 10;
var starChance = .2;
var movementMultiplier = .013;

function makeStars(override) {

  //i only want it to make a star on a small number of attempts
  if(Math.random() < starChance || override) {
    var direction = Math.floor(Math.random() * 360);
    var color = "rgb(" + Math.floor(Math.random() * 255) +
                ", " + Math.floor(Math.random() * 255) +
                ", " + Math.floor(Math.random() * 255) +
                ")";

    var star = {xPos: startX,
                yPos: startY,
                width: 1,
                height: 1,
                direction: direction,
                moveX: Math.floor(Math.cos(direction) * starSpeed) + Math.floor(Math.random() * 5 - 2.5),
                moveY: Math.floor(Math.sin(direction) * starSpeed) + Math.floor(Math.random() * 5 - 5),
                color: color,
                shadow: .5,
                border: 1,
              };
  stars.push(star);
  }
}


function showStars() {
  var starDivs = '';

  for (var i = 0; i < stars.length; i++) {

    starDivs += "<div class='star' id='" + i +"' style='" +
                  "top: " + stars[i].yPos + "px;" +
                  "left: " + stars[i].xPos + "px;" +
                  "width: " + Math.floor(stars[i].width) + "px;" +
                  "height: " + Math.floor(stars[i].height) + "px;" +
                  "background: " + stars[i].color + ";" +
                  "border: " + stars[i].border + "px solid #000;" +
                  "box-shadow: "+ Math.floor(stars[i].shadow) +"px "+ Math.floor(stars[i].shadow) +"px " + Math.floor(stars[i].shadow) + "px #000;" +
                  "'></div>";

    moveStar(i);
    deleteCheck(stars[i], i);
  }

  target.innerHTML = starDivs;

  setTimeout(function() {
    showStars();
  }, delay);

  if (stars.length < maxStars) {
    makeStars();
  }
}


function moveStar(i) {
  stars[i].xPos += stars[i].moveX + dragX * stars[i].width;
  stars[i].yPos += stars[i].moveY + dragY * stars[i].width;
  stars[i].width += sizePxGrowth;
  stars[i].height += sizePxGrowth;
  stars[i].shadow += shadowGrowth;
  stars[i].border += borderGrowth;
}


function deleteCheck(star, i) {
  if (star.xPos > screen.availWidth * 1.3 ||
      star.yPos > screen.availHeight * 1.3 ||
      star.xPos < -screen.availHeight * 1.3 ||
      star.yPos < -screen.availWidth * 1.3 ||
      star.width > screen.availHeight * .8) {
        stars.splice(i, 1);
      }
}

document.onmousemove = function(event) {

  if (event.clientX > startX) {dragX = movementMultiplier;}
  if (event.clientX < startX) {dragX = -movementMultiplier;}
  if (event.clientY > startY) {dragY = movementMultiplier;}
  if (event.clientY < startY) {dragY = -movementMultiplier;}
  if (event.clientX == startX) {dragX = dragX * .5;}
  if (event.clientY == startY) {dragY = dragY * .5;}
  startX = event.clientX;
  startY = event.clientY;
}

target.onmousedown = function() {
  for (var i = 0; i < starBurst; i++) {
    makeStars(true);
  }
}

for (var i = 0; i < startingStars; i++) {
  makeStars(true);
}

showStars();
