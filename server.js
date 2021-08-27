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

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
