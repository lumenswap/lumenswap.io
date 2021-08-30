const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const apm = require('elastic-apm-node');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if (!dev) {
  apm.start({
    serviceName: 'lumenswap-frontend',
    // Use if APM Server requires a secret token
    secretToken: process.env.KIBANA_SECRET_KEY,

    // Set the custom APM Server URL (default: http://localhost:8200)
    serverUrl: process.env.KIBANA_APM_URL,

    // Set the service environment
    environment: process.env.APP_ENV,
  });
}

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const subdomain = req.headers.host?.split('.')[0];

    if (subdomain === 'demo-obm') {
      app.render(req, res, `/obm${pathname}`, query);
    } else if (subdomain === 'reward') {
      app.render(req, res, `/reward${pathname}`, query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
