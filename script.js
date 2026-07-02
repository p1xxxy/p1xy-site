console.log("P1XY website loaded");
const pulses = [];
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");
const mouse = {
    x: null,
    y: null,
    radius: 180
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =========================

const points = [];
const connections = [];

const POINT_COUNT = 100;

// =========================

for (let i = 0; i < POINT_COUNT; i++) {

    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        baseVx: (Math.random() - 0.5) * 1.2,
        baseVy: (Math.random() - 0.5) * 1.2,

        vx: 0,
        vy: 0,
        radius: 2 + Math.random() * 2
    });

}

// =========================

function update() {

    for (const point of points) {

        point.x += point.baseVx + point.vx;
        point.y += point.baseVy + point.vy;
        point.vx *= 0.985;
        point.vy *= 0.985;

        if (point.x <= 0 || point.x >= canvas.width)
            point.baseVx *= -1;

        if (point.y <= 0 || point.y >= canvas.height)
            point.baseVy *= -1;
        if (mouse.x !== null) {

            const dx = point.x - mouse.x;
            const dy = point.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius && distance > 0) {

                const force = (mouse.radius - distance) / mouse.radius;

                point.vx += (dx / distance) * force * 0.04;
                point.vy += (dy / distance) * force * 0.04;

            }

        }

    }

}

// =========================

function draw() {

    connections.length = 0;
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

                connections.push({
                    from: i,
                    to: j,
                    alpha
                });

                

                ctx.shadowBlur = 12;
                ctx.shadowColor = "#00b7ff";

                ctx.strokeStyle = `rgba(0,183,255,${alpha * 0.18})`;
                ctx.lineWidth = 3;

                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();

                ctx.shadowBlur = 0;

                ctx.strokeStyle = `rgba(0,183,255,${alpha * 0.55})`;
                ctx.lineWidth = 1;

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
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00b7ff";
        ctx.fill();
        ctx.shadowBlur = 0;

    }

}

// =========================

function animate() {

    update();
    draw();

    requestAnimationFrame(animate);

}

animate();