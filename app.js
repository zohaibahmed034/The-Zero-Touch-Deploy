const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

// Dynamic Environment Variables
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const ENV_NAME = process.env.NODE_ENV || 'Production';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>K8s CI/CD Dashboard</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .card { background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 450px; text-align: center; }
            .header { color: #1a73e8; margin-bottom: 20px; border-bottom: 2px solid #e8eaed; padding-bottom: 10px; }
            .status-badge { background: #34a853; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px; text-align: left; }
            .info-item { background: #f8f9fa; padding: 10px; border-radius: 8px; border-left: 4px solid #4285f4; }
            .label { font-size: 0.75rem; color: #5f6368; text-transform: uppercase; }
            .value { font-weight: bold; color: #202124; display: block; margin-top: 4px; }
            .footer { margin-top: 30px; font-size: 0.8rem; color: #9aa0a6; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="header">
                <h2>🚀 K8s CI/CD Pipeline</h2>
                <span class="status-badge">Container Active</span>
            </div>
            
            <p>Your application has been successfully deployed via the automated pipeline.</p>

            <div class="info-grid">
                <div class="info-item">
                    <span class="label">App Version</span>
                    <span class="value">v${APP_VERSION}</span>
                </div>
                <div class="info-item">
                    <span class="label">Environment</span>
                    <span class="value">${ENV_NAME}</span>
                </div>
                <div class="info-item">
                    <span class="label">Hostname</span>
                    <span class="value">${os.hostname()}</span>
                </div>
                <div class="info-item">
                    <span class="label">Platform</span>
                    <span class="value">${os.platform()} (${os.arch()})</span>
                </div>
            </div>

            <div class="footer">
                Last Sync: ${new Date().toLocaleString()}<br>
                Powered by Kubernetes & Docker
            </div>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint for K8s Liveness/Readiness probes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
