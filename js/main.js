const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const font = `'Otomanopee One'`;

function radian(degrees) {
  return (Math.PI / 180) * degrees;
}

let mask = {
  base: ["rgba(255, 122, 0)", "rgba(100, 212, 155)"],
  border: [undefined, undefined],
  circleDecoration: [undefined, undefined],
};

const maskFunctions = {
  base: (color1, color2) => drawShape.baseMask(color1, color2),
  border: (color1, color2) => drawShape.border(color1, color2),
  upside: () => {},
  circleDecoration: (color1, color2) => {
    drawShape.circleDecoration(color1, color2, 20);
  },
};

function renderCanvas(print) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (print) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = `20px ${font} , sans-serif`;
    ctx.textAlign = "start";
    ctx.fillText("Made with https://carnivalmask.netlify.app/", 50, 50);
  }

  for (const property in mask) {
    mask[property][0] = document.getElementById(property + "1").value;
    mask[property][1] = document.getElementById(property + "2").value;

    if (mask[property] != undefined) {
      maskFunctions[property](mask[property][0], mask[property][1]);
    }
  }
  renderNameOnCanvas();
}

const drawShape = {
  colors: {
    last1: undefined,
    last2: undefined,
  },
  maskShape: () => {
    ctx.bezierCurveTo(200, 200, 250, 100, 500, 200);
    ctx.bezierCurveTo(750, 100, 800, 200, 900, 200);
    ctx.bezierCurveTo(900, 440, 750, 550, 500, 430);
    ctx.bezierCurveTo(250, 550, 100, 440, 100, 200);
  },
  baseMask: (color1, color2) => {
    let bg = ctx.createLinearGradient(100, 200, 900, 430);

    if (color1 == undefined && color2 == undefined) {
      bg.addColorStop(0.08, drawShape.colors.last1);
      bg.addColorStop(1, drawShape.colors.last1);
    } else {
      bg.addColorStop(0.08, color1);
      bg.addColorStop(1, color2);
      drawShape.colors.last1 = color1;
      drawShape.colors.last2 = color2;
    }

    ctx.beginPath();
    ctx.fillStyle = bg;
    ctx.moveTo(100, 200);
    drawShape.maskShape();
    ctx.moveTo(200, 280);
    ctx.bezierCurveTo(220, 370, 400, 400, 450, 280);
    ctx.moveTo(550, 280);
    ctx.bezierCurveTo(600, 370, 720, 400, 800, 280);

    ctx.fill();
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
        x: 500,
        y: 240,
      },
    ];

    const circlePosition_left = [
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
    ];

    circlePosition_left.forEach((obj) => {
      let right = { x: 1000 - obj.x, y: obj.y };
      circlePosition.push(obj);
      circlePosition.push(right);
    });

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
  gem: (color1, color2) => {
    ctx.beginPath();
    let bg = ctx.createLinearGradient(445, 95, 555, 200);
    bg.addColorStop(0.08, color1);
    bg.addColorStop(1, color2);

    ctx.strokeStyle = "#EBECF0";
    ctx.fillStyle = bg;
    ctx.lineWidth = 5;
    ctx.arc(500, 145, 55, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  upside: (color1, color2) => {
    let bg = ctx.createLinearGradient(100, 200, 900, 430);
    bg.addColorStop(0.08, color1);
    bg.addColorStop(1, color2);
    ctx.strokeStyle = bg;

    // ctx.moveTo(100, 200);
    // ctx.bezierCurveTo(220, 370, 400, 400, 4500, 280);
    ctx.stroke();
    ctx.closePath();
  },
};

function renderNameOnCanvas() {
  const input = document.getElementById("name-input");

  if (input.value == "") {
    return;
  }

  ctx.fillStyle = "black";

  ctx.font = `20px ${font} , sans-serif`;
  ctx.textAlign = "start";
  ctx.setTransform(1, 0.1, -0.3, 0.9, 0, 0);
  ctx.fillText("Created by:", 350, 420);

  ctx.font = `30px ${font} , sans-serif`;
  ctx.setTransform(1, 0.1, -0.3, 0.9, 0, 0);
  ctx.fillText(input.value, 320, 450);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

const download = () => {
  renderCanvas(true);

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");

  a.setAttribute("href", url);
  a.setAttribute("download", "");
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  renderCanvas();
};

renderCanvas();
