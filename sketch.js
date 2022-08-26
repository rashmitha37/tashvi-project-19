var music1, music2, music3
var musicGroup

var arrow, arrowImage

var gameOver, gameOverImg

var restart, restartImg

var score

var checkPointSound

var note1=[]

var note= note1

var PLAY=1;
var END= 0;
var gameState= PLAY;
var edges

function preload(){
music1= loadImage("note 1.png")

music2= loadImage("note 2.png")

music3= loadImage("note 3.png")

arrowImage= loadImage("arrow.png")

gameOverImg= loadImage("GameOver.png")

restartImg= loadImage("Restart.png")

checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
createCanvas(600,600)

musicGroup= createGroup();

arrow= createSprite(580,580, 50,50)
arrow.addImage(arrowImage);

gameOver= createSprite(300,200)
gameOver.addImage(gameOverImg)

restart= createSprite(300,300)
restart.addImage(restartImg)

score= 0
edges=createEdgeSprites()
}

function draw() {
 background("black")

 text("Score: "+score, 50, 50)
  
 if(gameState === PLAY){
    gameOver.visible=false;
    restart.visible= false;

    arrow.x=World.mouseX

   if(arrow.isTouching(musicGroup)){
    score=score+20;
    checkPointSound.play();
    musicGroup.destroyEach()
   }
   
   
     if (!arrow.isTouching(musicGroup) &&musicGroup.isTouching(edges[3])){
        gameState=END
       }
   
   
   //else{
   // gameState= END
  // }
    spawnNotes()
  }
  if (gameState === END){
    gameOver.visible= true;
    restart.visible= true;

    musicGroup.setLifetimeEach(-1);
    musicGroup.setVelocityEach(0);
    

    //reset()
 }

 
 drawSprites()
}

function spawnNotes(){
    
    if (frameCount % 60 == 0){
        note=createSprite (300,165,40,10)
        note.x= Math.round(random(100,450))
        rand= Math.round(random(1,3));
        note.velocityY= 6;
        

        switch(rand){
            case 1: note.addImage(music1);
                    note.scale=0.5;
                   break;
            case 2: note.addImage(music2);
                   note.scale=0.5;
                   break;
            case 3: note.addImage(music3);
                   note.scale=0.5;
                    break;
            default: break;
        }
        musicGroup.add(note)
        
        
    }
}

function reset(){
    gameState=PLAY;
    musicGroup.destroyEach();
    score= 0
}