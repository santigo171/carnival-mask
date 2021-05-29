console.log("Hello World!");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function radian(degrees) {
  return (Math.PI / 180) * degrees;
}

const drawShape = {
  mask: (color) => {
    let bg = ctx.createLinearGradient(100, 200, 900, 430);
    bg.addColorStop(0.08, "rgba(255,122,0,1)");
    bg.addColorStop(1, "rgba(100,212,155,1)");

    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.fillStyle = bg;
    ctx.bezierCurveTo(200, 200, 250, 100, 500, 200);
    ctx.bezierCurveTo(750, 100, 800, 200, 900, 200);
    ctx.bezierCurveTo(900, 440, 750, 550, 500, 430);
    ctx.bezierCurveTo(250, 550, 100, 440, 100, 200);
    ctx.moveTo(200, 280);
    ctx.bezierCurveTo(220, 370, 400, 400, 450, 280);
    ctx.moveTo(550, 280);
    ctx.bezierCurveTo(600, 370, 720, 400, 800, 280);

    ctx.fill();
  },
};

drawShape.mask(1);
