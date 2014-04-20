define('Score', [ "Stats" ], function (Stats) {

    function Score (game) {
        this.game  = game;
    }

    Score.prototype.draw = function (ctx) {

        ctx.save();
        ctx.fillStyle     = "white";
        ctx.shadowColor   = "#66FFFF";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur    = 30;

        ctx.font = "italic " + 2 + "em Audiowide";

        ctx.fillText("Score: " + Stats.score, this.game.width - 300, 50);
        ctx.restore();
    };

    return Score;
});
