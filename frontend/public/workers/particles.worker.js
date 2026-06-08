'use strict';
var offscreen, ctx, W, H, nodes = [], animId;
var DIST = 150, COLOR = 'rgba(113,177,54,';
var mouse = { x: -9999, y: -9999 };

function init() {
  nodes = [];
  for (var i = 0; i < 45; i++) {
    nodes.push({
      x: Math.random() * (W * 0.45) + W * 0.55,
      y: Math.random() * H,
      angle: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
      angleChange: (Math.random() - 0.5) * 0.04,
      baseRadius: 1.5 + Math.random() * 2.5,
      pulseSpeed: 0.02 + Math.random() * 0.02,
      pulseOffset: Math.random() * Math.PI * 2,
      radius: 2
    });
  }
}

function lineAlpha(x1, x2, base) {
  var mx = Math.max(x1, x2);
  var fade = mx > W * 0.55 ? 1 : Math.max(0, (mx - W * 0.4) / (W * 0.15));
  return base * fade;
}

function nodeAlpha(x) {
  return x > W * 0.55 ? 1 : Math.max(0, (x - W * 0.4) / (W * 0.15));
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  var t = Date.now() * 0.001;
  var i, j, n, dx, dy, d, md, la, a;
  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    n.angleChange += (Math.random() - 0.5) * 0.005;
    n.angleChange = Math.max(-0.06, Math.min(0.06, n.angleChange));
    n.angle += n.angleChange;
    n.x += Math.cos(n.angle) * n.speed;
    n.y += Math.sin(n.angle) * n.speed;
    if (n.x < W * 0.3) n.angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
    if (n.x > W + 20) n.x = W * 0.55;
    if (n.y < -20) n.y = H + 20;
    if (n.y > H + 20) n.y = -20;
    dx = n.x - mouse.x; dy = n.y - mouse.y;
    md = Math.sqrt(dx * dx + dy * dy);
    n.radius = md < 80
      ? n.baseRadius * (1 + (80 - md) / 80 * 1.5)
      : n.baseRadius * (1 + 0.3 * Math.sin(t * n.pulseSpeed * 60 + n.pulseOffset));
  }
  for (i = 0; i < nodes.length; i++) {
    for (j = i + 1; j < nodes.length; j++) {
      dx = nodes[i].x - nodes[j].x; dy = nodes[i].y - nodes[j].y;
      d = Math.sqrt(dx * dx + dy * dy);
      if (d < DIST) {
        la = lineAlpha(nodes[i].x, nodes[j].x, 1 - d / DIST);
        if (la > 0.001) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = COLOR + la + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }
  for (i = 0; i < nodes.length; i++) {
    a = nodeAlpha(nodes[i].x);
    if (a > 0.001) {
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
      ctx.fillStyle = COLOR + a + ')';
      ctx.fill();
    }
  }
  animId = requestAnimationFrame(draw);
}

self.onmessage = function(e) {
  var d = e.data;
  if (d.type === 'init') {
    offscreen = d.canvas;
    W = d.width;
    H = d.height;
    offscreen.width = W;
    offscreen.height = H;
    ctx = offscreen.getContext('2d');
    init();
    draw();
  } else if (d.type === 'resize') {
    if (!offscreen) return;
    W = d.width;
    H = d.height;
    offscreen.width = W;
    offscreen.height = H;
    init();
  } else if (d.type === 'mouse') {
    mouse.x = d.mouseX;
    mouse.y = d.mouseY;
  } else if (d.type === 'mouseleave') {
    mouse.x = -9999;
    mouse.y = -9999;
  } else if (d.type === 'stop') {
    if (animId) cancelAnimationFrame(animId);
  }
};
