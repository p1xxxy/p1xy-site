console.log("P1XY website loaded");
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =========================

const points = [];

const POINT_COUNT = 100;

// =========================

for (let i = 0; i < POINT_COUNT; i++) {

    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,

        radius: 2 + Math.random() * 2
    });

}

// =========================

function update() {

    for (const point of points) {

        point.x += point.vx;
        point.y += point.vy;

        if (point.x <= 0 || point.x >= canvas.width)
            point.vx *= -1;

        if (point.y <= 0 || point.y >= canvas.height)
            point.vy *= -1;

    }

}

// =========================

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

const MAX_DISTANCE = 120;

ctx.lineWidth = 1;

for (let i = 0; i < points.length; i++) {

    for (let j = i + 1; j < points.length; j++) {

        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_DISTANCE) {

            const alpha = 1 - distance / MAX_DISTANCE;

            ctx.strokeStyle = `rgba(0,183,255,${alpha * 0.5})`;

            ctx.beginPath();

            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);

            ctx.stroke();

        }

    }

}

    ctx.fillStyle = "#00b7ff";

    for (const point of points) {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            point.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}

// =========================

function animate() {

    update();
    draw();

    requestAnimationFrame(animate);

}

animate();