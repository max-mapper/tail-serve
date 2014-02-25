var fs = require('fs')
var url = require('url')
var basic = require('basic')
var debug = require('debug')('tail-serve')

module.exports = function(file, opts) {
  var size = opts.size || 1 * 1024 * 1024 // 1mb
  var user = opts.user
  var pass = opts.pass
  
  var auth = basic(function (u, p, callback) {
    if (user === u && pass === p) return callback(null)
    callback(401)
  })
  
  function handle(req, res) {
    debug(req.method + ' ' + req.url)
    if (req.url.match(/favicon/)) return res.end()
    if (!user || !pass) return tail(req, res, file, size)
    auth(req, res, function(err) {
      if (err) return authError(req, res)
      return tail(req, res, file, size)
    })
  }
  
  return handle
}

function authError(req, res) {
  res.statusCode = 401
  res.setHeader("WWW-Authenticate", "Basic realm=\"Secure Area\"")
  res.end("Unauthorized\n")
}

function tail(req, res, file, size) {
  res.writeHead(200, {
    'content-type': 'text/plain'
  })
  fs.stat(file, function(err, stat) {
    if (err) return res.end()
    var len = stat.size
    var parsed = url.parse(req.url, true)
    size = +(parsed.query.bytes || size)
    var start = 0
    if (len > size) start = len - size
    debug('readStream', 'from', start, 'to', start + size)
    fs.createReadStream(file, { start: start }).pipe(res)
  })
}
