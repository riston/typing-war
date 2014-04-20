define("Sprite", ["Sylvester"], function(Sylvester) {

    function Sprite(x, y) {
        this.loc = $V([x, y]);

        // The speed of sprite, default has 0, 0
        this.speed = $V([0, 0]);

        // The acceleration of sprite default has 0, 0
        this.acc = $V([0, 0]);

        this.height = 32;
        this.width = 32;

        this.state = "";
    }

    Sprite.prototype.draw = function(ctx) {

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(this.loc.e(1), this.loc.e(2), this.width, this.height);
    };

    Sprite.prototype.reset = function() {
        // Reset all the sprite states
    };

    return Sprite;
});
