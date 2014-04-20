define("Sound", [ "Howler" ], function (Howler) {

    var assetPath = './public/sounds/';

    return  {
        "coin": new Howl({
            urls: [ assetPath + "coin.wav" ]
        }),

        "powerup": new Howl({
            urls: [ assetPath + "powerup.wav" ]
        }),

        "char": new Howl({
            urls: [ assetPath + "char.wav" ],
            volume: 0.5
        }),

        "laser": new Howl({
            urls: [ assetPath + "laser.wav" ],
            volume: 0.5
        })
    };
});
