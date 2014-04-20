define("SoundPool", function () {
  var SoundPool = function () {

    var ctx, buf, pool = {};

    function init() {
      try {
        ctx = new webkitAudioContext();
        loadFile("hit", "http://dl.dropbox.com/u/26141789/canvas/pingpong/Metal%20Cling%20-%20Hit.wav");

      } catch (e) {
        console.log("No support for webaudio");
      }

    }

    //load and decode mp3 file
    function loadFile(name, location) {
        var req = new XMLHttpRequest();
        req.open("GET", location, true);
        req.responseType = "arraybuffer";
        req.onload = function() {
            //decode the loaded data
            ctx.decodeAudioData(req.response, function(buffer) {

              pool[name] = buffer;
            });
        };
        req.send();
    }

    //play the loaded file
    function play(name) {
        //create a source node from the buffer
        var src = ctx.createBufferSource();
        src.buffer = pool[name];
        //connect to the final output node (the speakers)
        src.connect(ctx.destination);
        //play immediately
        src.noteOn(0);
    }

    window.addEventListener("load", init, false);

    return {
      "init": init,
      "loadFile": loadFile,
      "play": play
    }
  }();

  return SoundPool;
});
