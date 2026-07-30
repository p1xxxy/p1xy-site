<div align="center">

# P1XY

**Personal infrastructure & DevOps portfolio**

Minimalistic engineering website focused on Linux, Networking and Infrastructure.

![Status](https://img.shields.io/badge/status-active-success)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Nginx](https://img.shields.io/badge/Nginx-config-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

</div>

---

## About

P1XY is my personal website built from scratch without templates or website builders.

The project serves as both a portfolio and a playground where I experiment with frontend, Linux infrastructure and deployment automation.

The main goal was to build something lightweight, fast and maintainable.

---

## Features

- ⚡ Lightweight vanilla HTML/CSS/JavaScript
- 🎨 Custom animated Canvas background
- 🖥️ Responsive layout
- 🚀 Automatic deployment via GitHub Actions
- 🌐 Nginx configuration
- 📊 System metrics endpoint
- 🔒 Production-ready server configuration

---

## Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | HTML5, CSS3, JavaScript |
| Server | Nginx |
| Automation | GitHub Actions |
| OS | Debian Linux |
| Version Control | Git |

---

## Project Structure

```
.
├── assets/
├── css/
├── js/
├── images/
├── system_metrics.json
├── index.html
└── README.md
```

---

## Deployment

The website is automatically deployed after every push to the `main` branch using GitHub Actions.

Pipeline:

```
Git Push
    ↓
GitHub Actions
    ↓
SSH
    ↓
Production Server
    ↓
Nginx
```

---

## Goals

This project is continuously evolving.

Planned improvements:

- Docker deployment
- Monitoring dashboard
- Backend API
- CI/CD improvements
- Infrastructure as Code
- Performance optimization

---

## Preview

<p align="center">
  <video src="p1x.mp4" width="900" controls autoplay loop muted></video>
</p>

---

## Author

**Daniil Babkin**

Linux • DevOps • System Administration

Telegram: **@toxissimo**

Website: **https://p1xy.online**

---

⭐ If you like this project, feel free to leave a star.
