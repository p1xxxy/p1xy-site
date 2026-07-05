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

async function getMetrics() {

    const response = await fetch("/system_metrics.json");

    return await response.json();

}


// =========================
// Functions
// =========================

async function renderMetrics() {

    const metrics = await getMetrics();

    Object.entries(metrics).forEach(([key, value]) => {

        metricElements[key].textContent = value;

    });

}


async function initMetrics() {

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

    await renderMetrics();

}
initMetrics();
// =========================
// Initialization
// =========================
