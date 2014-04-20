// Code goes here

function Game (element, width, height) {
  this.element = element;
  this.width = width;
  this.height = height;
  this.sprites = [];
  
  // Prevent context menu
  window.oncontextmenu = function() { return false };
}

Game.prototype.add = function() {
  
  this.canvas = document.createElement("canvas");
      
  this.canvas.setAttribute("width", this.width);
  this.canvas.setAttribute("height", this.height);
  
  this.ctx = this.canvas.getContext("2d");
  
  this.sprites.push(new BounceBall(34, 43));
  this.menu = new Menu(this.element);
  
  this.element.appendChild(this.canvas);
  
  this.addEvents();
};

Game.prototype.addEvents = function() {
  
  this.canvas.addEventListener("click", this.addSprite.bind(this));
};

Game.prototype.addSprite = function(ev) {
  console.log("Added sprite", ev);
  
  
  switch (ev.which) {
    case 1:
      // Left mouse
      this.sprites.push(new BounceBall(ev.x, ev.y));
    break;

    case 2:
    // Middle mouse
    break;

    case 3:
    // Right mouse.
      this.menu.show();
    break;
  }
  
};

Game.prototype.checkHit = function (ev) {
  console.log("Hit check");
  var _that = this;
  
  this.sprites.forEach(function (sprite, index) {
    if (sprite.inBounds(ev.x, ev.y)) {
      console.log("Hit sprite", index);
      // delete sprite
      _that.sprites.splice(index, 1);
    }
  });
};

Game.prototype.render = function() {
  var _this = this;
  _this.ctx.clearRect(0, 0, this.width, this.height);

  this.sprites.forEach(function (sprite) {
    
    if (sprite.r < 50) {
      sprite.draw(_this.ctx);  
    }
  });
  
};

Game.prototype.update = function() {
  var self = this;
  this.render();
  window.requestAnimationFrame(this.update.bind(this));
  
};

function Menu(element) {
  var playOption = document.querySelector(".play");
  
  this.container = element;
  this.menu = document.querySelector(".menu");
  
  playOption.addEventListener("click", this.onPlay.bind(this), true);
}

Menu.prototype.onPlay = function() {
  console.log("play");
  this.hide();
};

Menu.prototype.hide = function() {
  this.menu.classList.add("hide");
  this.menu.classList.remove("show");
};

Menu.prototype.show = function() {
  this.menu.classList.remove("hide");
  this.menu.classList.add("show");
};

function Sprite(x, y) {
  this.x = x;
  this.y = y;
  
  this.height = 30;
  this.width = 30;
}

Sprite.prototype.draw = function(ctx) {
  
  ctx.clearRect(this.x, this.y, this.width, this.height);
  this.x++;
  this.y++;
  this.width++;
  
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (this.x, this.y, this.width, this.height);
};

function BounceBall(x, y) {
  Sprite.call(this, x, y);  
  this.r = 5;
}

BounceBall.prototype = new Sprite();
BounceBall.prototype.constructor = BounceBall;

BounceBall.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "#99A9A7";
  this.r += 0.1;
  
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
  ctx.fill();
};

BounceBall.prototype.inBounds = function (x, y) {
  
  return Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) < Math.pow(this.r, 2);
};


var body = document.querySelector("#canvas"),
    w = window.innerWidth,
    h = window.innerHeight,
    game = new Game(body, w, h);
    
game.add();
game.update();