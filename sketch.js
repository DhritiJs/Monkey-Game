var PLAY=1;
var END=0;
var gameState = PLAY;
var gameover,reset,gameoverImg,restartImg;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var survivalTime;


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("monkey_collided.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   gameoverImg = loadImage("gameover.png");
  resetImg = loadImage("reset.png");
}



function setup() {
  createCanvas(600,200);
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
 
  ground = createSprite(10,190,1200,10);
  ground.velocityX = -7;
  ground.x=ground.width/2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  survivalTime = 0;
  
  gameover = createSprite(340,70);
  gameover.addImage("gameover",gameoverImg);
  gameover.scale=0.4;
  gameover.visible = false;
  
  reset = createSprite(310,110);
  reset.addImage("reset",resetImg);
  reset.scale=0.2;
  reset.visible = false;
}


function draw() {
  background("white");
  textSize(15);
  fill("black")
  text("Survival Time: "+survivalTime,20,20);


  if(gameState === PLAY){
     survivalTime=survivalTime + Math.round(getFrameRate()/60);
    ground.velocityX=-4;
     if(ground.x<0){
    ground.x=ground.width/2;
     }
  
  monkey.collide(ground);
  if(keyDown("space")&&monkey.y>=100){
    monkey.velocityY=-12;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
       }
    food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
   
      gameState=END;
    }
  }

    
  else if(gameState === END){
       ground.velocityX=0;
  
    monkey.velocityY=0;
   
        obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1); 
      monkey.changeAnimation("collided",monkey_collided);
      obstacleGroup.setVelocityXEach(0);
         foodGroup.setVelocityXEach(0);
      monkey.collide(ground);
    
   gameover.visible = true;
    reset.visible = true;
    
    if(mousePressedOver(reset)){
      restart();
       }
                
      }
  drawSprites();
}
function food(){
  if(frameCount%100===0){
    banana = createSprite(700,10,10,10);
    banana.y=Math.round(random(50,100));
    banana.addImage("banana",bananaImage);
    banana.velocityX=-6;
    banana.scale=0.1;
    banana.lifetime=200;
     foodGroup.add(banana);
   
 
     }
}

function obstacles(){
     if(frameCount%200===0){
        obstacle = createSprite(700,160,20,20);
       obstacle.addImage("obstacle",obstacleImage);
       obstacle.scale=0.15;
       obstacle.velocityX=-4;
       obstacle.lifetime=200;
       obstacleGroup.add(obstacle);
       //obstacle.debug = true;
      obstacle.setCollider("rectangle",0,0,300,300);
        }
}

function restart(){
   gameState = PLAY;
  gameover.visible = false;
  reset.visible  = false;
  monkey.changeAnimation("running",monkey_running);
  survivalTime = 0;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();

}






