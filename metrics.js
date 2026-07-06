// =========================
// SYSTEM METRICS
// =========================

// =========================
// DOM Elements
// =========================
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
const metricConfig = {

    status: {
        type: "status",
        success: ["ONLINE"]
    },

    uptime: {
        type: "text"
    },

    nginx: {
        type: "status",
        success: ["RUNNING"]
    },

    xray: {
        type: "status",
        success: ["RUNNING"]
    },

    https: {
        type: "status",
        success: ["VALID"]
    },

    domain: {
        type: "text"
    },

    disk: {
        type: "percentage",
        warning: 70,
        critical: 90
    },

    memory: {
        type: "percentage",
        warning: 75,
        critical: 90
    },

    deploy: {
        type: "text"
    }

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

        const element = metricElements[key];
        const config = metricConfig[key];
        const renderer = renderers[config.type];
        renderer(element, value, config);

    });

}

initMetrics();
function renderText(element, value) {

    element.textContent = value;

}
function renderStatus(element, value, config) {

    element.textContent = "";

    const dot = document.createElement("span");

    dot.classList.add("status-dot");

    element.classList.add("online");

    element.append(dot);
    element.append(value);

}
function renderPercentage(element, value, config) {

    element.textContent = value;

}
// =========================
// Initialization
// =========================
