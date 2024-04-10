
var fs = require('fs');

var proxyConfig = {
  add_proxy_header: true,//activate addition of X-Forwarded-For header for better logging on real server side
  allow_ip_list: './config/allow_ip_list',
  black_list:    './config/black_list',
  host_filters:   './config/hostfilters.js',
};

exports.proxyConfig = proxyConfig;