var cloud 
var obs
var score
var PLAY = 1
var END  = 0
var gameState = PLAY
function preload(){
  trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground2  = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
  trex_collided = loadImage("trex_collided.png")
  restart = loadImage("restart.png")
  gameover = loadImage("gameOver.png")
  
}
function setup() {
  createCanvas(600,200);
  trex = createSprite(50, 150, 50, 50);
  //trex.addAnimation("trex_collided",trex_collided)
 trex.addAnimation("running",trex_run) 

 trex.scale=0.5;
 edges = createEdgeSprites()
 ground = createSprite(200,180,400,20);
 ground.addImage("ground_2",ground2)
 ground.x = ground.width/2
 score = 0
 obstacleGroup = new Group()
 cloudGroup = new Group()
 
 //Creating Invisible ground
 invisible_ground = createSprite(200,190,400,10)
  invisible_ground.visible = false
  over = createSprite(300,120,10,10)
  over.addImage("gameover",gameover)
  over.visible = false
  reset = createSprite(300,150,10,10)
  reset.addImage("restart",restart)
  reset.visible = false
}

function draw() 
{
  background("white");
  text("Score: "+score,500,30)
 
  
  
  trex.collide(invisible_ground)
 

 if(gameState===PLAY){
  score = score+Math.round(frameCount%1.1)
  ground.velocityX = -2
  if(ground.x<0){
    ground.x = ground.width/2;
   
    }
    if(keyDown("space")&& trex.y>=150||touches.length > 0) {
      trex.velocityY = -10;
      touches = []
       } 
       trex.velocityY = trex.velocityY+0.5
       spawn_cloud()
       spawn_obs() 
       if(obstacleGroup.isTouching(trex)){ 
        gameState = END
       }
 }
else if(gameState ===END){
  ground.velocityX = 0
  trex.changeAnimation("collided",trex_collided)
  obstacleGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
  cloudGroup.setLifetimeEach(-1)
  trex.velocityY = 0
  over.visible = true
 reset.visible = true
 over.scale = 2.5
 reset.scale = 0.5
 if (mousePressedOver(reset)){
  restartGame()
  }
}
 
  drawSprites()
}

function restartGame(){
 gameState = PLAY
 over.visible = false
 reset.visible = false
 score = 0
 obstacleGroup.destroyEach()
 cloudGroup.destroyEach()

}
function spawn_cloud(){
  if(frameCount%100===0){
    cloud = createSprite(600,100,40,10)
    cloud.addImage("cloud",cloudimg)
    cloud.velocityX = -5
    cloud.y = Math.round(random(15,70))
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    console.log(trex.depth)
    console.log(cloud.depth)
   cloud.lifetime = 130
   cloudGroup.add(cloud)
  }
  
  // 5/2 = 2.5
  // 5%2 = 1

}
function spawn_obs(){
  if(frameCount%60===0){
    obstacle = createSprite(600,165,10,40)
    obstacle.scale = 0.5
    obstacle.velocityX = -5
    var r1 = Math.round(random(1,6))
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 130
    
 switch(r1){
  

  case 1:
  obstacle.addImage(obs1)

  break;


  case 2:
  obstacle.addImage(obs2)

  break;


  case 3:
  obstacle.addImage(obs3)

  break;


  case 4:
  obstacle.addImage(obs4)

  break;


  case 5:
  obstacle.addImage(obs5)

  break;


  case 6:
    obstacle.addImage(obs6)
  
    break;

    default:
    
    break;
 }
  }
  
}




