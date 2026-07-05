// =========================
// SYSTEM METRICS
// =========================

// =========================
// DOM Elements
// =========================

const metricStatus = document.getElementById("metric-status");
const metricUptime = document.getElementById("metric-uptime");
const metricNginx = document.getElementById("metric-nginx");
const metricXray = document.getElementById("metric-xray");
const metricHttps = document.getElementById("metric-https");
const metricDomain = document.getElementById("metric-domain");
const metricDisk = document.getElementById("metric-disk");
const metricMemory = document.getElementById("metric-memory");
const metricDeploy = document.getElementById("metric-deploy");
const metrics = getMetrics();
const metricElements = {

    status: document.getElementById("metric-status"),
    uptime: document.getElementById("metric-uptime"),
    nginx: document.getElementById("metric-nginx"),
    xray: document.getElementById("metric-xray"),
    https: document.getElementById("metric-https"),
    domain: document.getElementById("metric-domain"),
    disk: document.getElementById("metric-disk"),
    memory: document.getElementById("metric-memory"),
    deploy: document.getElementById("metric-deploy")

};


// =========================
// Data
// =========================

function getMetrics() {

    return {

        status: "ONLINE",
        uptime: "245h 17m",
        nginx: "RUNNING",
        xray: "RUNNING",
        https: "VALID",
        domain: "p1xy.online",
        disk: "31%",
        memory: "43%",
        deploy: "2026-07-05 01:37 UTC"

    };

}


// =========================
// Functions
// =========================

function renderMetrics() {

    const metrics = getMetrics();

    Object.entries(metrics).forEach(([key, value]) => {

        metricElements[key].textContent = value;

    });

}


function initMetrics() {

    console.log({
        metricStatus,
        metricUptime,
        metricNginx,
        metricXray,
        metricHttps,
        metricDomain,
        metricDisk,
        metricMemory,
        metricDeploy
    });

    renderMetrics();

}
initMetrics();
// =========================
// Initialization
// =========================
