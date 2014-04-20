define('InputQueue', [], function () {

    function InputQueue (input, game) {
        this.input = input;
        this.game  = game;
    }

    InputQueue.prototype.draw = function (ctx) {
        var string = "Text: " + this.input.join(" ");

        ctx.save();
        ctx.fillStyle     = "white";
        ctx.shadowColor   = "#66FFFF";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur    = 30;

        ctx.font = "italic " + 2 + "em Audiowide";

        ctx.fillText(string, 100, this.game.height - 40);
        ctx.restore();
    };

    return InputQueue;
});
