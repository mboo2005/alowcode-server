const url = require("node:url")
const config = require("../config/default")
const proxyOptions = {
  '/proxy': {
    target: 'http://localhost', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: false, // proxy websockets
    pathFilter: '/proxy',
    pathRewrite: {
      '^/proxy/.*': '/', // rewrite path
    },
    // Custom router function (string target)
    router: function (req) {
      try {
        let u = url.parse(req.url, true)
        serviceUrl = u.query.url
        console.log("serviceUrl is " + serviceUrl)
        if (serviceUrl.startsWith("http://") || serviceUrl.startsWith("https://")) {
          return serviceUrl
        } else {
          return "http://" + serviceUrl
        }
      } catch (error) {
        console.error(error)
        return false
      }

    },
    ignorePath: true,
    logLevel: "debug",
    onProxyReq: _onProxyReq,
    onProxyRes: _onProxyRes
  }
};
function _onProxyReq(proxyReq, req, res) {
  // add custom header to request
  proxyReq.setHeader('x-alowcode-node', config.secret);
  // or log the req
  console.log(proxyReq)
}

function _onProxyRes(proxyRes, req, res) {
  proxyRes.headers['x-req'] = JSON.stringify({
    headers: req.headers,
    method: req.method,
    url: req.url,
    httpVersion: req.httpVersion,
    body: req.body,
    cookies: req.cookies,
    path: req.path,
    protocol: req.protocol,
    query: req.query,
    hostname: req.hostname,
    ip: req.ip,
    originalUrl: req.originalUrl,
    params: req.params,
  });
  delete proxyRes.headers['access-control-allow-headers']
  delete proxyRes.headers['access-control-allow-methods']
  delete proxyRes.headers['access-control-allow-origin']

  proxyRes.headers['x-res'] = proxyRes.statusCode
}

module.exports = { proxyOptions }