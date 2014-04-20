'use strict';

define("Game", [
  "InputQueue",
  "State",
  "Sylvester",
  "Sprite",
  "Bomb",
  "Stats",
  "Words",
  "Bar",
  "Background",
  "Cloud",
  "Score",
  "Sound" ],
  function (InputQueue, State, Sylvester, Sprite, Bomb, Stats, Words, Bar, Background, Cloud, Score, Sound) {

  function Game (element, width, height) {
    this.element = element;
    this.width   = width;
    this.height  = height;

    this.wordCount = Words.length - 1;
    this.add();
  }

  Game.prototype.init = function() {
    this.reset();

    Sound.coin.play();

    // Start the rendering cycle
    this.update();
  };

  Game.prototype.resize = function () {

    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  };

  Game.prototype.reset = function() {
    this.input   = [];
    this.bombs   = [];

    Stats.health        = 1;
    Stats.bombsExploded = 0;
    Stats.score         = 0;

    this.inputQueue = new InputQueue(this.input, this);
    this.healthBar  = new Bar(this.width, this.height, "top-left");
    this.background = new Background(this);
    this.cloud      = new Cloud(this);
    this.scoreDisplay = new Score(this);

    if (this.timer) {
      window.clearInterval(this.timer);
    }

    // Start timer
    this.timer = window.setInterval(this.timerTick.bind(this), 3 * 1000);

  };

  Game.prototype.add = function() {
    var canvasEl = document.createElement("canvas");

    this.canvas = canvasEl;
    this.ctx    = this.canvas.getContext("2d");

    this.element.appendChild(canvasEl);
    this.resize();

    // Prevent context menu
    window.oncontextmenu = function() { return false; };
    window.onresize = this.resize.bind(this);

    // Custom event handlers
    document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
  };

  Game.prototype.timerTick = function() {
    var bomb;

    if (!State.RUNNING) {
      return;
    }

    bomb = new Bomb(this.getRandIn(50, this.width - 50), 40);
    bomb.word = Words[this.getRandIn(0, this.wordCount)];

    this.bombs.push(bomb);
  };

  Game.prototype.removeEventHandlers = function() {

    document.removeEventListener("keydown", this.handleKeyDown.bind(this), false);
  };

  Game.prototype.getRandIn = function (min, max) {

    return Math.floor(Math.random()*(max-min+1)+min);
  };


  Game.prototype.handleKeyDown = function(e) {
    var char = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();

    if (e.keyCode === 13) {

      if (State.GAME_OVER) {

        this.reset();

        State.GAME_OVER = false;
        State.RUNNING   = true;

      } else if (State.NOT_STARTED) {

        this.reset();

        State.NOT_STARTED = false;
        State.RUNNING     = true;
      }
    }

    // Seems the key is not in ASCII range
    if (e.keyCode < 65 || e.keyCode > 90) {
      return;
    }

    if (this.input.length > 20) {
      this.input.shift();
    }

    // Search in the bombs if char matches
    this.bombs.forEach(function (bomb) {

      if (bomb.word[bomb.pos] === char) {

        Sound.char.play();
        bomb.pos++;

      } else {
        Stats.missed++;
        bomb.pos = 0;
      }
    });

    this.input.push(char);
  };

  Game.prototype.render = function() {
    var _this = this;

    // Clearing all the screen is not efficent!
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.background.draw(this.ctx);
    this.healthBar.draw(this.ctx);

    // Render bombs if this is too large the rendering cycle slows down
    this.bombs.reverse().forEach(function (bomb, index) {

      if (bomb.isCorrect()) {
        console.log('You typed correct word ' , bomb.word);

        Sound.laser.play();
        Stats.score++;
        _this.removeBomb(index);
      }

      // Bomb has hit the ground
      if (bomb.loc.e(2) >= _this.height - 150) {

        console.log('Delete bomb', bomb.word, bomb.pos);

        Stats.bombsExploded += 1;
        Stats.health        -= 0.17;

        Sound.powerup.play();

        if (Stats.health <= 0) {

          State.RUNNING   = false;
          State.GAME_OVER = true;

          Sound.coin.play();
        }

        _this.removeBomb(index);
      }

      bomb.update();
      bomb.draw(_this.ctx);
    });

    this.scoreDisplay.draw(this.ctx);
    this.cloud.draw(this.ctx);
    this.inputQueue.draw(this.ctx);
  };

  Game.prototype.renderGameOver = function() {
    var ctx = this.ctx, tx, ty;

    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.fillStyle     = "white";
    ctx.shadowColor   = "#66FFFF";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur    = 30;
    ctx.textAlign     = "center";

    ctx.font = "italic " + 3.5 + "em Audiowide";

    tx = this.width / 2;
    ty = this.height / 2;

    ctx.fillText("Game Over", tx, ty);

    ctx.font = "italic " + 2 + "em Audiowide";
    ctx.fillText("Press ENTER to play again!", tx, ty + 70);
    ctx.fillText("Your score: " + Stats.score, tx, ty + 70 * 2);

    ctx.restore();
  };

  Game.prototype.renderNotStarted = function () {
    var ctx = this.ctx, tx, ty;

    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.fillStyle     = "white";
    ctx.shadowColor   = "#66FFFF";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur    = 30;
    ctx.textAlign     = "center";

    ctx.font = "italic " + 3.5 + "em Audiowide";

    tx = this.width / 2;
    ty = this.height / 2;

    ctx.fillText("Stop propaganda, type fast!", tx, ty);

    ctx.font = "italic " + 2 + "em Audiowide";
    ctx.fillText("Press ENTER to START game!", tx, ty + 70);

    ctx.restore();
  };

  Game.prototype.removeBomb = function (index) {

    this.bombs.splice(index, 1);
  };

  Game.prototype.update = function () {

    if (State.RUNNING) {

      this.render();
    } else if (State.GAME_OVER) {

      this.renderGameOver();
    } else if (State.NOT_STARTED) {

      this.renderNotStarted();
    }

    if (window.requestAnimationFrame) {

      window.requestAnimationFrame(this.update.bind(this));
    } else {

      window.setTimeout(this.update.bind(this), 16);
    }
  };

  return Game;
});
