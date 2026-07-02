console.log("P1XY website loaded");
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

ctx.fillStyle = "#00b7ff";
ctx.beginPath();
ctx.arc(200, 200, 4, 0, Math.PI * 2);
ctx.fill();