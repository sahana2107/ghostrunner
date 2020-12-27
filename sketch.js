var tower;
var towerImage;
var door,doorImg,doorsgroup;
var climber,climberImg,climbersgroup;
var ghost,ghostImage;
var invisibleBlock,invisiblegroup;
var gamestate = "play";
var spookysound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  spookysound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
   doorsgroup = new Group();
  climbersgroup = new Group();
  invisiblegroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.3;
}
function draw(){
  background(0);
  if (gamestate==="play"){
  if (tower.y>400){
    tower.y = 300;
  }
  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  if (keyDown("space")){
   ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  if(climbersgroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if (invisiblegroup.isTouching(ghost)||ghost.y >600){
    ghost.destroy();
  }
  spawndoors();
  drawSprites();
}
  if (gamestate==="end"){
    fill("yellow");
    textSize(30);
    text ("gameOver",230,250);
  }
}
function spawndoors(){
  if (frameCount%240===0){
    door = createSprite(200,50);
    door.addImage(doorImg);
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    climbersgroup.add(climber);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisiblegroup.add(invisibleBlock);
    doorsgroup.add(door);
    
    
  }
}