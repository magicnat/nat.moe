// make layers move w/ mouse, idea from benpigchu.com, rewrite by magicnat.
var anim_layers = function (layers) {
  var dX = 0, dY = 0;

  var layers = layers.map(layer => document.getElementById(layer));

  var rMap = {
    0: [[1, 0, 0], [0, -1, 0]],
    90: [[0, -1, 0], [-1, 0, 0]],
    180: [[-1, 0, 0], [0, 1, 0]],
    270: [[0, 1, 0], [1, 0, 0]]
  };

  // wtf? I don't know.
  var getZ = (x, y, z, beta, gamma) => (z*Math.cos(beta*Math.PI/180)+y*Math.sin(beta*Math.PI/180))*Math.cos(gamma*Math.PI/180)-x*Math.sin(gamma*Math.PI/180);

  var rndr = function () {
    var tX = .05 * window.innerWidth * dX,
        tY = .05 * window.innerHeight * dY;

    layers.forEach((layer, i) => {
      var scale = i + 1;
      layer.style.transform = `translate(${tX * scale}px, ${tY * scale}px)`;
    });

    window.requestAnimationFrame(rndr);
  };

  window.addEventListener('mousemove', e => {
    dX = e.clientX / window.innerWidth;
    dY = e.clientY / window.innerHeight;
  });

  if (window.DeviceMotionEvent) {
    window.addEventListener("deviceorientation", e => {
      var rot = window.orientation;
      rot = rot == -90 ? 270 : rot;

      dX = getZ(rMap[rot][0][0], rMap[rot][0][1], rMap[rot][0][2], e.beta, e.gamma);
      dY = getZ(rMap[rot][1][0], rMap[rot][1][1], rMap[rot][1][2], e.beta, e.gamma);
    });
  }

  rndr();

};
