require(["domready", "Game"], function (domReady, Game) {

  domReady(function () {

    var body = document.querySelector("#canvas"),
        w    = window.innerWidth,
        h    = window.innerHeight,
        game = new Game(body, w, h);

    game.init();
  });
});
