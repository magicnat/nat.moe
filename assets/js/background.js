var anim_layers = function (layers) {
  var dX = 0, dY = 0, deg = 0;

  var fX = (r, deg) => r * Math.cos(2 * Math.PI * (deg%360) / 360),
      fY = (r, deg) => r * Math.sin(2 * Math.PI * (deg%360) / 360);

  var layers = layers.map(layer => document.getElementById(layer));

  var rndr = function () {
    var tX = .05 * window.innerWidth * fX(2, deg),
        tY = .05 * window.innerHeight * fY(2, deg);

    deg += .1;

    layers.forEach((layer, i) => {
      var scale = i + 1;
      layer.style.transform = `translate(${tX * scale}px, ${tY * scale}px)`;
    });

    window.requestAnimationFrame(rndr);
  };

  rndr();

};
