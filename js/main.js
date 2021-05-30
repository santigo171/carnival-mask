console.log("Hello World!");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function radian(degrees) {
  return (Math.PI / 180) * degrees;
}

const drawShape = {
  maskShape: () => {
    ctx.bezierCurveTo(200, 200, 250, 100, 500, 200);
    ctx.bezierCurveTo(750, 100, 800, 200, 900, 200);
    ctx.bezierCurveTo(900, 440, 750, 550, 500, 430);
    ctx.bezierCurveTo(250, 550, 100, 440, 100, 200);
  },
  baseMask: (color1, color2) => {
    let bg = ctx.createLinearGradient(100, 200, 900, 430);
    bg.addColorStop(0.08, color1);
    bg.addColorStop(1, color2);

    ctx.beginPath();
    ctx.fillStyle = bg;
    ctx.moveTo(100, 200);
    drawShape.maskShape();
    ctx.moveTo(200, 280);
    ctx.bezierCurveTo(220, 370, 400, 400, 450, 280);
    ctx.moveTo(550, 280);
    ctx.bezierCurveTo(600, 370, 720, 400, 800, 280);

    ctx.fill();
    ctx.closePath();
  },
  border: (color1, color2) => {
    let bg = ctx.createLinearGradient(100, 200, 900, 430);
    bg.addColorStop(0.08, color1);
    bg.addColorStop(1, color2);
    ctx.strokeStyle = bg;
    ctx.lineWidth = 20;

    ctx.moveTo(100, 200);
    drawShape.maskShape();

    // Left Eye
    ctx.moveTo(200, 269);
    ctx.bezierCurveTo(220, 370, 400, 400, 450, 280);
    ctx.lineTo(200, 280);

    // Right Eye
    ctx.moveTo(550, 280);
    ctx.bezierCurveTo(600, 370, 720, 400, 800, 280);
    ctx.lineTo(550, 269);

    ctx.stroke();
    ctx.closePath();
  },
  circleDecoration: (color1, color2, radius) => {
    const circlePosition = [
      {
        x: 140,
        y: 240,
      },
      {
        x: 260,
        y: 200,
      },
      {
        x: 380,
        y: 200,
      },
      {
        x: 500,
        y: 240,
      },
      {
        x: 630,
        y: 200,
      },
      {
        x: 750,
        y: 200,
      },
      {
        x: 860,
        y: 240,
      },
      {
        x: 168,
        y: 340,
      },
      {
        x: 260,
        y: 420,
      },
      {
        x: 420,
        y: 410,
      },
      {
        x: 1000 - 420,
        y: 410,
      },
      {
        x: 1000 - 260,
        y: 420,
      },
      {
        x: 832,
        y: 340,
      },
    ];

    circlePosition.forEach((element) => {
      let bg = ctx.createLinearGradient(
        element.x - radius,
        element.y - radius,
        element.x + radius,
        element.y + radius
      );
      bg.addColorStop(0.0, color1);
      bg.addColorStop(1, color2);

      ctx.beginPath();
      ctx.fillStyle = bg;
      ctx.arc(element.x, element.y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    });
  },
};

drawShape.baseMask("rgba(255, 122, 0)", "rgba(100, 212, 155)");
drawShape.border("rgba(140, 212, 155)", "rgba(255, 122, 255)");
drawShape.circleDecoration("rgba(10, 212, 255)", "rgba(255, 12, 0)", 20);

// background color
// border color
// border style
// border decoration
// upside decoration
// side decoration
