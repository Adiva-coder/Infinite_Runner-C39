
var bike, bikeImg;
var bg, bgImg;
var track, trackImg, track2, track3;

var coinGrp, coin, coinImg;
var obstaclesGrp, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var score, survivalTime;

var gameOver, yes, no;
var gameOverImg, yesImg, noImg;

var title, fast, slow;
var titleImg, fastImg, slowImg;

var INSTRUCTIONS = 0;
var START = 1;

var F_PLAY = 2;
var S_PLAY = 3;

var OVER = 4;
var END = 5;

var gameState = 0;


function preload(){
    bikeImg = loadImage("bike.png");
    bike2 = loadImage("bike2.png");

    trackImg = loadImage("track.png");

    coinImg = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png");
    coinImage = loadImage("coin1.png");
    

    bgImg = loadImage("bg.jpg");

    gameOverImg = loadImage("gameOver.png");
    endSceneImg = loadImage("endScene.png");

    yesImg = loadImage("yes.png");
    noImg = loadImage("no.png");

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.gif");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");

    fastImg = loadImage("fast.png");
    slowImg = loadImage("slow.png");

    titleImg = loadImage("title.png");

    smiley = loadImage("smiley.png");
}



function setup(){
    canvas = createCanvas(displayWidth - 500, displayHeight - 30);
    
    score = 0;
    survivalTime = 0;  

    track = createSprite(displayWidth/2 - 20, displayHeight - 150, displayWidth, 40);
    track.addImage("track", trackImg);
    
    track2 = createSprite(displayWidth/2 - 20, displayHeight - 40, displayWidth, 40);
    track2.shapeColor = "#484848";

    track3 = createSprite(displayWidth/2 - 20, displayHeight - 280, displayWidth, 40);
    track3.shapeColor = "#484848";

    bg = createSprite(displayWidth/2, displayHeight/2 - 170, displayWidth, 40);
    bg.addImage("background", bgImg);
    bg.scale = 1.5;
   
    bike = createSprite(displayWidth/4 - 240, displayHeight - 200, 20, 20);
    bike.addImage("bike1", bikeImg);
    bike.addImage("bike2", bike2);
    bike.scale = 0.8;
    bike.setCollider("rectangle", 0, 0, 150, 150);

    invisibleBlock = createSprite(500, 650, 1000, 20);
    invisibleBlock.visible = false;

    coinGrp = createGroup();
    obstaclesGrp = createGroup();

    yes = createSprite(displayWidth/2 - 550, displayHeight/2 - 200, 20, 20);
    yes.addImage("yes", yesImg);
    yes.scale = 0.5;

    no = createSprite(displayWidth/2, displayHeight/2 - 200, 20, 20);
    no.addImage("no", noImg);
    no.scale = 0.2;

    gameOver = createSprite(displayWidth/2 - 280, displayHeight/2 + 80, 20, 20);
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.scale = 0.5;
   

    fast = createSprite(displayWidth/2 - 400, displayHeight/2 + 150, 100, 100);
    fast.addImage("fast", fastImg);

    slow = createSprite(displayWidth/2 - 100, displayHeight/2 + 150, 20, 20);
    slow.addImage("slow", slowImg);

    title = createSprite(displayWidth/2 - 250, displayHeight/2 - 250, 20, 20);
    title.addImage("title", titleImg);

}


function draw(){

    if(gameState === INSTRUCTIONS){
        background("lightPink");

        textSize(40);
        stroke("black");
        strokeWeight(2);
        fill("black");
        text("INSTRUCTIONS :- ", displayWidth/2 - 420, displayHeight/2 - 300);
        text("________________", displayWidth/2 - 430, displayHeight/2 - 290);

        textSize(30);
        strokeWeight(0);
        text("> Collect as many coins as you can to increase the score.", displayWidth/2 - 650, displayHeight/2 - 150);
        text("> Try to collect all", displayWidth/2 - 650, displayHeight/2 - 90);
        image(coinImage, displayWidth/2 - 385, displayHeight/2 - 119, 40, 40);
        image(coinImage, displayWidth/2 - 405, displayHeight/2 - 128, 42, 42);
        text("> Also try to dodge all the obstacles by pressing '               '", displayWidth/2 - 650, displayHeight/2 - 30);
        text("   for the game to continue.", displayWidth/2 - 650, displayHeight/2 + 10);

       
        text("HOPE YOU ALL ENJOY!!!", displayWidth/2 - 300, displayHeight/2 + 320);
        image(smiley, displayWidth/2 + 60, displayHeight/2 + 285, 50, 50);

        textSize(35);
        fill("purple");
        strokeWeight(1);
        text("Press '   ' to start the game", displayWidth/2 - 500, displayHeight/2 + 150);
        fill("blue");
        stroke("blue");
        strokeWeight(2);
        text("S", displayWidth/2 - 390, displayHeight/2 + 150);
        text("SPACE", displayWidth/2 + 5, displayHeight/2 - 30);


        if(keyDown("s") && gameState === INSTRUCTIONS){
            gameState = START;
        }
    }

    
    if(gameState === START){
        background("#96D8E8");
        
        bike.visible = false;
        track.visible = false;
        track2.visible = false;
        track3.visible = false;
        bg.visible = false;
        yes.visible = false;
        no.visible = false;
        gameOver.visible = false;

        textSize(30);
        stroke("red");
        strokeWeight(2);
        fill("red");
        text("CHOOSE YOUR SPEED:-", displayWidth/2 - 450, displayHeight/2 - 30);
        
        if(mousePressedOver(fast)){
            gameState = F_PLAY;
        }

        if(mousePressedOver(slow)){
            gameState = S_PLAY;
        }

        drawSprites();

    }



    if(gameState === S_PLAY){
        background("#96D8E8");

        bike.visible = true;
        track.visible = true;
        track2.visible = true;
        track3.visible = true;
        bg.visible = true;

        fast.visible = false;
        slow.visible = false;
        title.visible = false;
      
        track.velocityX = -(10 + 3* score/100);
        bg.velocityX = -(10 + 3* score/100);

        survivalTime = survivalTime + Math.round(getFrameRate()/60);

        if (track.x < 0){
            track.x = track.width/2;
        }

        if (bg.x < 0){
            bg.x = bg.width/2;
        }

        bike.collide(invisibleBlock);

   
        if(keyDown("space") && bike.y > displayWidth/2 - 350) {
            bike.velocityY = -12;
            bike.changeImage("bike2", bike2);
        }

        if(keyWentUp("space")){
            bike.changeImage("bike1", bikeImg)
        }

        bike.velocityY = bike.velocityY + 0.8;
        
        camera.position.x = canvas.width/2;
        camera.position.y = bike.y - 200;

        spawnCoins();
        spawnObstacles();

        if(bike.isTouching(coinGrp)){
            coinGrp.destroyEach();
            score = score + 1;
        }

        if(bike.isTouching(obstaclesGrp)){
            gameState = OVER;
            
            gameOver.visible = true;

            yes.visible = true;
            no.visible = true;
        
        }

        drawSprites();

    
        fill("black");
        textSize(25);
        stroke("black");
        text("Survival Time : " + survivalTime, displayWidth/4 - 250, displayHeight/4 - 130);
        text("Score : " + score, displayWidth/2, displayHeight/4 - 130);

    }


    if(gameState === F_PLAY){
        background("#96D8E8");
        
        bike.visible = true;
        track.visible = true;
        track2.visible = true;
        track3.visible = true;
        bg.visible = true;

        fast.visible = false;
        slow.visible = false;
        title.visible = false;
      
        track.velocityX = -(30 + 3* score/60);
        bg.velocityX = -(30 + 3* score/60);

        survivalTime = survivalTime + Math.round(getFrameRate()/60);

        if (track.x < 0){
            track.x = track.width/2;
        }

        if (bg.x < 0){
            bg.x = bg.width/2;
        }

        bike.collide(invisibleBlock);

    
        if(keyDown("space") && bike.y > displayWidth/2 - 350) {
            bike.velocityY = -12;
            bike.changeImage("bike2", bike2);
        }

        if(keyWentUp("space")){
            bike.changeImage("bike1", bikeImg)
        }

        bike.velocityY = bike.velocityY + 0.8;
        
        camera.position.x = canvas.width/2;
        camera.position.y = bike.y - 200;

        spawnCoins();
        spawnObstacles();

        if(bike.isTouching(coinGrp)){
            coinGrp.destroyEach();
            score = score + 1;
        }

        if(bike.isTouching(obstaclesGrp)){
            gameState = OVER;
            
            gameOver.visible = true;

            yes.visible = true;
            no.visible = true;
        

        }

        drawSprites();

        
        fill("black");
        textSize(25);
        stroke("black");
        text("Survival Time : " + survivalTime, displayWidth/4 - 250, displayHeight/4 - 130);
        text("Score : " + score, displayWidth/2, displayHeight/4 - 130);

    }



    if(gameState === OVER){
       
        bg.velocityX = 0;
        track.velocityX = 0;
        bike.velocityY = 0;

        yes.visible = true;
        no.visible = true;
        gameOver.visible = true;

        //set lifetime of the game objects so that they are never destroyed
        obstaclesGrp.setLifetimeEach(-1);
        coinGrp.setLifetimeEach(-1);
       
        obstaclesGrp.setVelocityXEach(0);
        coinGrp.setVelocityXEach(0);   
       
        textSize(30);
        fill("red");
        text("Do you want to try again?", displayWidth/2 - 450, displayHeight/2 - 200);


        if(mousePressedOver(yes)) {
            reset();
        }

        if(mousePressedOver(no)) {
           gameState = END;

        }
    }


    if(gameState === END){
        
        imageMode(CENTER);
        image(endSceneImg, displayWidth/2 - 250, displayHeight/2 - 20, displayWidth - 200, displayHeight - 20);
    }


}

function spawnCoins(){
    if (frameCount % 200 === 0) {

        coin = createSprite(displayWidth/2 + 300, displayHeight - 40, displayWidth, 40);
        coin.y = Math.round(random(displayWidth/2 - 500, displayWidth/2 - 200));
        coin.velocityX = Math.round(random(-5, -20));
        coin.addAnimation("coin", coinImg);
        coin.scale = 0.5;
       
        
         //assign lifetime to the variable
        coin.lifetime = displayWidth/2 - 1000;

        coinGrp.add(coin);
    }
}


function spawnObstacles(){
    if (frameCount % 100 === 0){
      var obstacle = createSprite(displayWidth/2 + 300, displayHeight - 160, displayWidth, 40);
      obstacle.velocityX = track.velocityX;
      obstacle.addImage(obstacle1);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle2);
                 break;
         case 2: obstacle.addImage(obstacle3);
                 break;
         case 3: obstacle.addImage(obstacle4);
                 break;
         case 4: obstacle.addImage(obstacle5);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.2;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGrp.add(obstacle);
    }
}

function reset(){
    gameState = START;

    gameOver.visible = false;
    no.visible = false;
    yes.visible = false;

    fast.visible = true;
    slow.visible = true;
    title.visible = true;

    obstaclesGrp.destroyEach();
    coinGrp.destroyEach();

    score = 0;
    survivalTime = 0;
}
