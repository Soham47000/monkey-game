var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var score, ground, monkeyCollide, obsGroup, FruitGroup, survivalTime, score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkeyCollide = loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(40, 300, 20, 20)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;
  ground = createSprite(10, 350, 1200, 20)
  fruitGroup = createGroup();
  obsGroup = createGroup();
  survivalTime = 0;
  score = 0;


}


function draw() {
  background(255);
  monkey.velocityY += 0.8;
  textSize(20)

  text("score: " + score, 400, 50)
  text("survival Time: " + survivalTime, 100, 50)
  if (gameState === PLAY) {
    survivalTime = Math.ceil(frameCount / frameRate())
    spawnObstacle();
    if (keyDown("space") && monkey.collide(ground)) {
      monkey.velocityY = -12;
    }
    if (monkey.isTouching(fruitGroup)) {
      score++;
      fruitGroup.destroyEach();
    }
    monkey.collide(ground)
    spawnBanana();
    drawSprites();
  }
  if (monkey.isTouching(obsGroup)) {
    gameState = END;

  }
  if (gameState === END) {
    text("Game Over", 250, 200)
  }
}

function spawnObstacle() {
  if (frameCount % 140 == 0) {
    obstacle = createSprite(600, 322, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6
    obsGroup.add(obstacle)
    obstacle.lifetime = 150;
  }

}

function spawnBanana() {
  if (frameCount % 100 == 0) {
    rand = random(150, 200)
    banana = createSprite(600, rand, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4
    fruitGroup.add(banana)
    banana.lifetime = 150;
  }

}