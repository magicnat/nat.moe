var anim_layers = function (layers) {
  var dX = 0, dY = 0, deg = 0;

  var fX = (r, deg) => r * Math.cos(2 * Math.PI * (deg%360) / 360),
      fY = (r, deg) => r * Math.sin(2 * Math.PI * (deg%360) / 360);

  var layers = layers.map(layer => document.getElementById(layer));

  var rMap = {
    0: [[1, 0, 0], [0, -1, 0]],
    90: [[0, -1, 0], [-1, 0, 0]],
    180: [[-1, 0, 0], [0, 1, 0]],
    270: [[0, 1, 0], [1, 0, 0]]
  };

  var getZ = (x, y, z, beta, gamma) => (z*Math.cos(beta*Math.PI/180)+y*Math.sin(beta*Math.PI/180))*Math.cos(gamma*Math.PI/180)-x*Math.sin(gamma*Math.PI/180);

  if (window.DeviceMotionEvent) {
    window.addEventListener("deviceorientation", e => {
      var rot = window.orientation;
      rot = rot == -90 ? 270 : rot;

      if (e.beta || e.gamma) {
        fX = () => getZ(rMap[rot][0][0], rMap[rot][0][1], rMap[rot][0][2], e.beta, e.gamma);
        fY = () => getZ(rMap[rot][1][0], rMap[rot][1][1], rMap[rot][1][2], e.beta, e.gamma);
      }
    });
  }

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
