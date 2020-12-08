var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running
var banana ,bananaImage;
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var backs,back;
var InvisibleGround;
var happy2;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backs = loadImage("d2a.jpg");
  happy2 = loadImage("h2-removebg-preview.png");
 
}



function setup() {
    createCanvas(600,400);
  
  
  back = createSprite(100,100,600,600);
  back.addImage(backs);
  back.scale=0.5;
  
  monkey = createSprite(100,300,10,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
     
 
  
  InvisibleGround = createSprite(400,365,900,10);
  InvisibleGround.visible=false;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  
  
}


function draw() {
    background(180);
  
  console.log(monkey.y);  
  
  monkey.collide(InvisibleGround);

  InvisibleGround.velocityX=-(6+3*score/200);
  
  if(gameState===PLAY){
      if (InvisibleGround.x < 0){
      InvisibleGround.x = InvisibleGround.width/2;
    }
  
  if(keyDown("space")&&monkey.y>=298){
    monkey.velocityY=-16;
    
  }
  
  monkey.velocityY=monkey.velocityY + 0.8;
  
  fruit();
  danger();
  
  
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
     }
  
  if(obstacleGroup.isTouching(monkey)){
     
     FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
     gameState=END;

     }
    
   score = score + Math.round(getFrameRate()/60);
    
  }else if(gameState===END){
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.addAnimation("running",happy2);
    monkey.x=300;
    monkey.y=200;
    monkey.scale=1;
   
  }
    
    
  

  
  drawSprites();
  fill("black");
   textSize(30);
  text("SURVIVAL TIME= "+score,270,50);
 
}

function fruit(){
  
  if(frameCount % 80===0){
   banana = createSprite(400,Math.round(random(150,300)),25,25);
    banana.velocityX=-(6+3*score/200);
  banana.addImage(bananaImage);
  banana.scale=0.15;
    FoodGroup.add(banana);
  }
  
}

function danger(){
  if(frameCount % 110===0){
    obstacle = createSprite(400,335,25,25);
    obstacle.velocityX=-(6+3*score/200);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.13;
    obstacleGroup.add(obstacle);
  }
}



