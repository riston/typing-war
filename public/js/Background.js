define("Background", [
        "image!./public/images/house.png",
        "image!./public/images/ground.png",
        "image!./public/images/tree.png",
        "image!./public/images/tree-large.png",
        "image!./public/images/bush.png",
        "image!./public/images/spruce.png",
        "image!./public/images/small-house.png",
        "image!./public/images/flag.png",
    ], function (HouseImg, GroundImg, TreeImg, TreeLargeImg, BushImg, SpruceImg, SmallHouseImg, Flag) {

    function Background (game) {

        // TODO: look for algorithm to avoid the colliding numbers
        this.treeLocations   = [ 70, 100, 200, 300, 700, 900, 1000, 1300, 1700 ];
        this.spruceLocations = [ 90, 170, 260, 500, 1100, 1800 ];

        this.game = game;
    }

    Background.prototype.draw = function (ctx) {

        var pattern = ctx.createPattern(GroundImg, "repeat-x"),
            _this = this;

        ctx.save();
        ctx.beginPath();
        // Move bottom
        ctx.translate(0, this.game.height - 100);

        // Draw Ukraine flag
        ctx.drawImage(Flag, 630, -45);

        // Draw house
        ctx.drawImage(HouseImg, 50, -50);
        ctx.drawImage(HouseImg, 530, -50);
        ctx.drawImage(HouseImg, 1750, -50);
        ctx.drawImage(SmallHouseImg, 333, -50);
        ctx.drawImage(SmallHouseImg, 777, -50);

        // Draw bush
        ctx.drawImage(BushImg, 800, -50);
        ctx.drawImage(BushImg, 467, -50);
        ctx.drawImage(BushImg, 1111, -50);
        ctx.drawImage(BushImg, 1500, -50);

        // Draw tree
        this.treeLocations.forEach(function (tx) {
            ctx.drawImage(TreeImg, tx, -50);
        });

        // Draw spruce
        this.spruceLocations.forEach(function (tx) {
            ctx.drawImage(SpruceImg, tx, - 55);
        });

        // Draw the grass
        ctx.rect(0, 0, this.game.width, 30);
        ctx.fillStyle = pattern;
        ctx.fill();

        ctx.restore();
    };

    return Background;
});
