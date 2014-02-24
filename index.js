var http = require('http')
var basic = require('basic')
var fs = require('fs')

module.exports = function(opts) {
  var file = opts.file
  var size = opts.size || 1 * 1024 * 1024 // 1mb
  var user = opts.user
  var pass = opts.pass
  
  var auth = basic(function (u, p, callback) {
    if (user === u && pass === p) return callback(null)
    callback(401)
  })
  
  var server = http.createServer(function(req, res) {
    console.log(req.method, req.url)
    if (req.url.match(/favicon/)) return res.end()
    if (!user || !pass) return tail(file, size, res)
    auth(req, res, function(err) {
      if (err) return authError(req, res)
      return tail(file, size, res)
    })
  })
  
  return server
}

function authError(req, res) {
  res.statusCode = 401
  res.setHeader("WWW-Authenticate", "Basic realm=\"Secure Area\"")
  res.end("Unauthorized\n")
}

function tail(file, size, res) {
  res.writeHead(200, {
    'content-type': 'text/plain'
  })
  fs.stat(file, function(err, stat) {
    if (err) return res.end()
    var len = stat.size
    var start = 0
    if (len > size) start = len - size
    fs.createReadStream(file, { start: start }).pipe(res)
  })
}
