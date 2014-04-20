define("Cloud", [
    "image!./public/images/cloud-first.png",
    "image!./public/images/cloud-second.png",
    "image!./public/images/cloud-third.png",
    ], function (CloudFImg, CloudSImg, CLoudTImg) {

    function Cloud (game) {
        this.game = game;

        this.clouds = [
            {
                "img": CloudFImg,
                "x": this.getX(),
                "y": this.getY()
            },
            {
                "img": CloudSImg,
                "x": this.getX(),
                "y": this.getY()
            },
            {
                "img": CLoudTImg,
                "x": this.getX(),
                "y": this.getY()
            },
            {
                "img": CloudSImg,
                "x": this.getX(),
                "y": this.getY()
            }
        ];

    }

    Cloud.prototype.getX = function () {
        return ~~(Math.random() * this.game.width);
    };

    Cloud.prototype.getY = function () {
        return ~~Math.random() * this.game.height / 5;
    };

    Cloud.prototype.move = function (ctx) {
        var _this = this;

        this.clouds.forEach(function (cloud) {

            if (cloud.x <= 0) {
                cloud.x = _this.game.width;
            }

            cloud.x--;

            ctx.drawImage(cloud.img, cloud.x, cloud.y);
        });
    };

    Cloud.prototype.draw = function (ctx) {

        ctx.save();

        ctx.translate(0, 100);
        this.move(ctx);

        ctx.restore();
    };


    return Cloud;
});
