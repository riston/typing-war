define("Bar", [ "Stats" ], function (Stats) {

  function Bar (screenWidth, screenHeight, position) {

    this.screenWidth  = screenWidth;
    this.screenHeight = screenHeight;
    this.position     = position || "top-left";

    this.width = 200;
    this.height = 20;
  }

  Bar.prototype.getPoint = function (position) {
    var parts = position.split("-"),
      x = 0,
      y = 0;

    if (parts.length !== 2) {
      return { x: 0, y: 0};
    }

    if (parts[0] === "top") {
      y = 20;
    } else {
      y = 0;
    }

    if (parts[1] === "left") {
      x = 20;
    } else {
      x = 0;
    }

    return { "x": x, "y": y };
  };

  Bar.prototype.draw = function (ctx) {
    var pos    = this.getPoint(this.position),
        grad   = ctx.createLinearGradient(pos.x, pos.y,this.width,this.height),
        offset = 10;

    // Defensive check for health var
    if (Stats.health < 0) {
      Stats.health = 0;
    }

    ctx.save();
    grad.addColorStop(0, "#556B2F");
    grad.addColorStop(Stats.health, "#556B2F");
    grad.addColorStop(1, "#B22222");

    ctx.shadowColor   = "#66FFFF";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur    = 30;

    ctx.fillStyle = grad;

    for (var i = 1, color = 'red'; i <= 10; i++) {

        if (Math.round(Stats.health * 10) < i) {
            color = 'red';
        } else {
            color = 'green';
        }

        ctx.fillStyle = color;
        offset        = 20 * i;

        ctx.fillRect(pos.x + offset, pos.y, 15, 30);
    }

    ctx.restore();
  };

  return Bar;
});
