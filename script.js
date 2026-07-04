// =========================
// DOM Elements
// =========================
const journalOutput = document.getElementById("journal-output");
const journalSection = document.getElementById("journal");
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
const packets = [];
const MAX_PACKETS = 5;
let packetTimer = 0;

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

            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < mouse.radius * mouse.radius) {

                const distance = Math.sqrt(distanceSquared);

                const force = (mouse.radius - distance) / mouse.radius;

                point.vx += (dx / distance) * force * 0.04;
                point.vy += (dy / distance) * force * 0.04;

            }

        }

    }

}

// =========================

function updatePackets() {

    packetTimer++;

    const spawnDelay = 20 + Math.random() * 40;

    if (
        packetTimer >= spawnDelay &&
        packets.length < MAX_PACKETS &&
        connections.length > 0
    ) {
        packetTimer = 0;

        const connection =
            connections[Math.floor(Math.random() * connections.length)];

        packets.push({
            connection,
            progress: Math.random() * 0.2,
            speed: 0.012 + Math.random() * 0.006,
            size: 0.8 + Math.random() * 0.4
        });
    }
    for (let i = packets.length - 1; i >= 0; i--) {

        packets[i].progress += packets[i].speed;

        if (packets[i].progress >= 1) {
            packets.splice(i, 1);
        }

    }

}

// =========================

function draw() {

    connections.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const MAX_DISTANCE = 150;

    ctx.lineWidth = 1;

    for (let i = 0; i < points.length; i++) {

        for (let j = i + 1; j < points.length; j++) {

            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;


            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < MAX_DISTANCE * MAX_DISTANCE) {

                const distance = Math.sqrt(distanceSquared);

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

        for (const packet of packets) {

            const from = points[packet.connection.from];
            const to = points[packet.connection.to];

            if (!from || !to) continue;

            const x =
                from.x + (to.x - from.x) * packet.progress;

            const y =
                from.y + (to.y - from.y) * packet.progress;

            ctx.save();

            ctx.translate(x, y);
            ctx.scale(packet.size, packet.size);

            const angle = Math.atan2(
                to.y - from.y,
                to.x - from.x
            );

            ctx.rotate(angle);

            ctx.shadowBlur = 2;
            let alpha = 1;

            if (packet.progress < 0.15) {
                alpha = packet.progress / 0.15;
            }

            if (packet.progress > 0.85) {
                alpha = (1 - packet.progress) / 0.15;
            }
            ctx.fillStyle = `rgba(0,183,255,${alpha})`;
            ctx.shadowColor = `rgba(0,183,255,${alpha})`;

            ctx.shadowBlur = 7;
            ctx.shadowColor = `rgba(0,183,255,${alpha})`;
            ctx.beginPath();
            ctx.arc(0, 0, 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(0,183,255,0.35)";
            ctx.lineWidth = 1.2;

            const gradient = ctx.createLinearGradient(-14, 0, 0, 0);

            gradient.addColorStop(0, "rgba(0,183,255,0)");
            gradient.addColorStop(0.7, "rgba(0,183,255,0.2)");
            gradient.addColorStop(1, `rgba(0,183,255,${alpha})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.4;

            ctx.beginPath();
            ctx.moveTo(-14, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();

            ctx.restore();

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
    updatePackets();
    draw();

    requestAnimationFrame(animate);

}

animate();

// =========================
// SYSTEM JOURNAL
// =========================

function addLog(time, type, message) {

    const line = document.createElement("div");
    line.className = "journal-line";

    line.innerHTML = `
        <span class="journal-time">${time}</span>
        <span class="journal-type ${type.toLowerCase()}">${type}</span>
        <span class="journal-message">${message}</span>
    `;

    journalOutput.appendChild(line);

}

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

}

// =========================
// Data
// =========================


const startupLogs = [

    {
        type: "INFO",
        message: "Visitor connected"
    },

    {
        type: "SUCCESS",
        message: "Canvas engine initialized"
    },

    {
        type: "SUCCESS",
        message: "Identity module loaded"
    },

    {
        type: "INFO",
        message: "Loading configuration..."
    },

    {
        type: "SUCCESS",
        message: "Theme profile applied"
    },

    {
        type: "SUCCESS",
        message: "Network topology synchronized"
    },

    {
        type: "INFO",
        message: "Rendering interface..."
    },

    {
        type: "SUCCESS",
        message: "System Journal initialized"
    }

];

// =========================
// Functions
// =========================

function startJournal() {

    startupLogs.forEach((log, index) => {

        setTimeout(() => {

            addLog(
                getCurrentTime(),
                log.type,
                log.message
            );

        }, index * 300);

    });

}

function observeSection(section, callback) {

    const observer = new IntersectionObserver((entries) => {

        const entry = entries[0];

        if (entry.isIntersecting) {

            callback();

            observer.unobserve(section);

        }

    });

    observer.observe(section);

}

// =========================
// Initialization
// =========================

observeSection(journalSection, startJournal);