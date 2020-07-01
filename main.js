// slect canvas
const cvs = document.getElementById("FlappyBird");
const ctx = cvs.getContext("2d");

// game var and const
let frames = 0

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "images/sprite.png";
// game state

const state = {
  current : 0,
  getReady : 0,
  game : 1,
  over : 2,
}
// control the game
cvs.addEventListener("click", function(evt){
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      bird.flap();
      break;
    case state.gameOver:
      state.current = state.getReady;
      break;
  }
});

// background
const bg = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height - 226,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

}
//foreground

const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112,

  draw : function(){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  }
}

// bird
const bird = {
   animation : [
       {sX: 276, sY : 112},
       {sX: 276, sY : 139},
       {sX: 276, sY : 164},
       {sX: 276, sY : 139}
   ],
   x : 50,
   y : 150,
   w : 34,
   h : 26,

   frame : 0,

   draw : function(){
        let bird = this.animation[this.frame];

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
      },

      flap : function(){

      },
      update: function(){
        // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;
 }
 // GET READY MESSAGE
  const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,

    draw: function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

}

 // gameOver

 const gameOver = {
   sX: 175,
   sY: 228,
   w : 225,
   h : 202,
   x : cvs.width/2 - 225/2
   y : 90,

   draw: function(){
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
 }
// DRAW
function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
  }

// update

function update(){
   bird.update();

}

// loop

function loop(){
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}

loop();
