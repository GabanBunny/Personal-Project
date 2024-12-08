int numberOfBullet = 0;
int maxBullet = 5;
int maxMissile =1;
float [] bulletXposition = new float[maxBullet];
float [] bulletYposition = new float[maxBullet];
float bulletSpeed = 1;
float rectWidth = 0, rectHeight = 2*600/5;
float tankbullet = 10;
float score = 0;
float [] enemyWidth = new float[6];
float [] enemyHeight = new float[6];
float []enemycolor = new float[50];
float enemySpeed = 3*bulletSpeed;
int enemyRadius = 10;
float yourScoreX = 1000/2-60, yourScoreY = 600/2+8;
int numberOfBushes = 10;
int [] bushX =new int [numberOfBushes];
int [] bushY = new int [numberOfBushes];
int [] bushSize = new int[50];
int lives =280;
boolean moveUp =false, moveDown = false, moveLeft = false, moveRight = false;

void setup() {
  size(1000, 600);
  //bush setup
  for (int i =0; i<bushX.length; i++) {
    bushX[i]= (int)random(1000);
    bushY[i]=(int)random(600);
    bushSize[i] =(int)random(60, 90);
  }
  for (int i=0; i<maxMissile; i++) {
    enemyWidth[i] = 1000;
    enemyHeight[i] = (int)random(0, height-90);
  }
}

void draw () {
  background(241, 234, 189);
  bushes(bushX, bushY);
  bottomOftheScreen();
  tank(rectWidth, rectHeight);
  bullet(enemyRadius);
  enemyissile();
  repositionOfBush();
  repositionOfRocket();
  endgame();
  conditions();
}
void bullet(int rad) { // put in space bar to create a new bullet
  for (int i = 0; i<numberOfBullet; i++) {
    fill(0);
    circle(bulletXposition[i], bulletYposition[i], 2*rad);
    bulletXposition[i]+=bulletSpeed;
    if (bulletXposition[i]==width && maxBullet< 5 ) { // use equal or else bullet skyrockets
      maxBullet++;
      if (maxBullet < 0) {
        maxBullet =0;
      }
    }
    //BulletXposition outside of width
    if (bulletXposition[i] > width) {
      //Index shifting
      for (; i< numberOfBullet-1; i++) {
        bulletXposition[i] =bulletXposition [i+1];
        bulletYposition[i] = bulletYposition [i+1];
      }
      numberOfBullet--;
    }
    //Collision
    collisionOfTank(numberOfBullet);
  }
}

void shoot() {
  bulletXposition[numberOfBullet]= rectWidth+30;
  bulletYposition[numberOfBullet]=rectHeight;
  numberOfBullet++;
  if (maxBullet>0) {
    maxBullet--;
  }
}

void keyPressed() {
  //tank move up and down
  if (keyCode == UP) {
    moveUp = true; //Tank move up
  }
  if (keyCode == DOWN) {
    moveDown = true;//Tank move down
  }

  if (keyCode == LEFT) {
    moveLeft = true;//Tank move left
  }

  if (keyCode == RIGHT) {
    moveRight = true;//Tank move right
  }
  if (key ==' ' && numberOfBullet < 5) { // must be in keyPressed for it to execute once, if put in void bullet, it will loop
    shoot();
    enemyWidth[maxMissile] = 1000;
    enemyHeight[maxMissile] = (int)random(0, height-70);
  }
  if (keyCode == ENTER) {
    if (lives<=180) {
      loop();
      score = 0;
      numberOfBullet=0;
      maxBullet = 5;
      rectWidth = 0;
      rectHeight = 2*height/5;
      lives = 280;
      //enemy Missile re-position
      for (int i =0; i<enemyWidth.length; i++) {
        enemyWidth[i] = 1000+random(100, 150);
        enemySpeed = 2;
        enemyHeight[i] = random(height-70);
        enemycolor[i] = random(0, 200);
        maxMissile=1;
      }
    }
  }
}
void keyReleased() {
  moveUp = false;
  moveDown = false;
  moveLeft = false;
  moveRight = false;
}

void enemyissile() {
  //Set up for new Missile;
  enemyWidth[maxMissile] = 1000;
  enemyHeight[maxMissile] = (int)random(0, 4*height/5);
  strokeWeight(0);
  for (int i=0; i<maxMissile; i++) {
    fill(enemycolor[i]-50);
    rect(enemyWidth[i], enemyHeight[i]-10, 20, 20);//upper wing
    rect(enemyWidth[i], enemyHeight[i]+10, 20, 20);//lower wing
    fill(enemycolor[i]);//body
    rect(enemyWidth[i]-50, enemyHeight[i], 70, 20);
    enemyWidth[i] = enemyWidth[i] -enemySpeed;
    ellipseMode(CENTER); //head
    fill(169);
    ellipse(enemyWidth[i]-50, enemyHeight[i]+10, 2*enemyRadius, 2*enemyRadius);
    fill(random(180, 255), random(0, 180), 0);//yellow flame
    quad(enemyWidth[i]+40, enemyHeight[i]+25, enemyWidth[i]+30, enemyHeight[i]+10, enemyWidth[i]+40, enemyHeight[i]-5, enemyWidth[i]+70, enemyHeight[i]+10);
    fill(random(0, 255), 0, 0);
    triangle(enemyWidth[i]+50, enemyHeight[i]+30, enemyWidth[i]+20, enemyHeight[i], enemyWidth[i]+20, enemyHeight[i]+20);//lower red flame
    triangle(enemyWidth[i]+50, enemyHeight[i]-10, enemyWidth[i]+20, enemyHeight[i], enemyWidth[i]+20, enemyHeight[i]+20); //upper red flame
    collisionOfMissile(maxMissile);
  }
}


void bottomOftheScreen() {
  fill(144, 95, 16);
  rect(0, height-50, width, height/12);
  fill(255, 255, 255);
  textSize(15);
  text("Bullet  = " +int(maxBullet), 600, height-20); // number of bullt
  text("Score  = "+int(score), 5, height-20); // score
  text("Lives:", 150, height-20);
  for (int liveX = 200; liveX<=lives; liveX+=20) {
    fill(255, 0, 0);
    circle(liveX, height-24, 20);
  }
}
void tank(float a, float b) {
  //tank  body
  stroke(0);
  fill(51, 102, 255);
  rect(a, b, 80, 30);
  // tank tiles in the bottom
  stroke(0);
  fill(0, 0, 0);
  ellipse(a+40, b+30, 80, 20);
  fill(192);
  circle(a+12, b+30, 15);
  circle(a+29, b+30, 15);
  circle(a+46, b+30, 15);
  circle(a+63, b+30, 15);
  //tank missile
  noStroke();
  fill(0, 122, 204);
  rect(a+15, b-4.5, 90, tankbullet);
  //tank-top
  strokeWeight(.5);
  stroke(0);
  fill(0, 153, 255);
  quad(a, b+5, a+60, b+5, a+80, b+5, a+20, b-20);
  stroke(137, 207, 240);
  triangle(a+100, b+5, a+100, b-5, a+120, b);
  strokeWeight(2);
  //flag
  stroke(0);
  fill(255, 0, 0);
  line(a+60, b-30, a+60, b-5);
  rect(a+60, b-30, 20, 10);
}

void repositionOfBush() {
  for (int i =0; i<enemyWidth.length; i++) {
    if (bushX[i]<0) {
      bushX[i] = width + (int)random(50);
      bushSize[i] =(int)random(60, 90);
    }
  }
}

void repositionOfRocket() {
  for (int i =0; i<enemyWidth.length; i++) {
    if (enemyWidth[i]<0) {
      enemyWidth[i] = 1000;
      enemyHeight[i] = random(height-90);
      enemycolor[i] = random(0, 200);
     livesLost();
    }
  }
}

void collisionOfMissile(int b) {
  for (int i=0; i<b; i++) {
    if (dist(enemyWidth[i], enemyHeight[i], rectWidth+110, rectHeight) <= 50) {
      enemyWidth[i] = 1000;
      enemyHeight[i] = random(height-70);
      enemycolor[i] = random(0, 200);
      livesLost();
    }
  }
}
void livesLost() {
  lives-=20;
}
void collisionOfTank(int b) {
  for (int i = 0; i<b; i++) {
    for (int a =0; a<enemyWidth.length; a++) {
      if ((dist(enemyWidth[a]-50, enemyHeight[a]+10, bulletXposition[i], bulletYposition[i]-4.5)<=20)) {
        score = score + 5;
        //enemy Missile re-position
        enemyWidth[a] =1000 + random(50, 100);
        enemyHeight[a] = random(height-90);
        //enemyHeight[a] = random(height-50);
        enemycolor[a] = random(0, 200);
        //BulletReposition
        if (maxBullet<5) {
          maxBullet++;
        }
        bulletXposition[i]= width; //set bulletXposition outside of screen
        //Missile number increase
        if (maxMissile<=4) {
          maxMissile++;
        }
      }
    }
  }
}

void endgame() {
  if (lives==160) {
    fill(144, 95, 16);
    strokeWeight(4);
    rect(width/4.5, height/4, height, height/2); //frame
    noLoop();
    fill(255);
    textSize(24);
    text("Game Over", yourScoreX+11, yourScoreY-60);
    text("Your score is "+int(score), yourScoreX+10, yourScoreY-15);
    text("Press ENTER to Try Again", yourScoreX-35, yourScoreY+30);

    for (int i =0; i<bushX.length; i++) {
      bushX[i]= (int)random(1000);
      bushY[i]=(int)random(600);
    }
  }
}

void bushes(int []bushX, int [] bushY) {
  for (int i = 0; i<bushX.length; i++) {
    fill(16, 59, 29);
    ellipse(bushX[i], bushY[i]-20, 20, bushSize[i]);
    ellipse(bushX[i], bushY[i], 50, bushSize[i]-40);
    ellipse(bushX[i], bushY[i]-20, 35, bushSize[i]-40);
    fill(0, 144, 64);
    ellipse(bushX[i], bushY[i]-10, 45, bushSize[i]-40);
    fill(195, 210, 178);
    ellipse(bushX[i], bushY[i]-30, 25, bushSize[i]-40);
    bushX[i]-=bulletSpeed;
  }
}

void conditions() {
  //tank limit condition
  if (rectHeight <30) {
    rectHeight = 30;
  }
  if (rectHeight > height-90) {
    rectHeight =height-90;
  }
  if ( rectWidth <0) {
    rectWidth =0;
  }
  if (rectWidth>width-120) {
    rectWidth = width-120;
  }
  //tank movement
  if (moveUp) {
    rectHeight = rectHeight -5.5;
  }
  if (moveDown) {
    rectHeight = rectHeight +5.5;
  }
  if (moveLeft) {
    rectWidth = rectWidth - 5.5;
  }
  if (moveRight) {
    rectWidth = rectWidth + 5.5;
  }
}
