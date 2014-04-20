"use strict";

define("Bomb", ["Sprite"], function (Sprite) {

  function Bomb (x, y) {
    Sprite.call(this, x, y);

    this.speed  = $V([0, (Math.random() * 1) + 1]);
    this.acc    = $V([0, Math.random() * 0.01]);

    this.shadow    = 30;
    this.shadowInc = false;
    this.word      = "";
    this.radius    = 45;
    this.pos       = 0;
  }

  Bomb.prototype = new Sprite();
  Bomb.prototype.constructor = Bomb;

  Bomb.prototype.draw = function (ctx) {
    var step = 0.3, measure, tx, ty;

    ctx.beginPath();

    if (this.shadowInc) {
      this.shadow += step;

      if (this.shadow > 30) {
        this.shadowInc = false;
      }
    } else {
      this.shadow -= step;

      if (this.shadow < 5) {
        this.shadowInc = true;
      }
    }

    ctx.save();
    measure = ctx.measureText(this.word).width;

    ctx.shadowColor   = "white";
    ctx.fillStyle     = "#99A9A7";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur    = this.shadow;

    if (measure.width > this.radius * 2) {
      this.radius = measure.width / 2 + 10;
    }
    // Draw the bomb part
    ctx.arc(this.loc.e(1), this.loc.e(2), this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw text
    ctx.fillStyle     = "white";
    ctx.shadowColor   = "#66FFFF";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur    = 30;

    ctx.font = "italic " + 1 + "em Audiowide";

    tx = this.loc.e(1) - measure;
    ty = this.loc.e(2);
    ctx.fillText(this.word, tx, ty);

    // Draw matched section
    ctx.fillStyle     = "lime";
    ctx.fillText(this.word.substr(0, this.pos), tx, ty);

    ctx.restore();
  };

  Bomb.prototype.update = function() {
    this.speed = this.speed.add(this.acc);

    this.loc = this.loc.add(this.speed);
  };

  Bomb.prototype.isCorrect = function() {

    return this.pos === this.word.length;
  };

  return Bomb;
});
