var http = require('http')
var basic = require('basic')
var bintail = require('bintail')

module.exports = function(file, user, pass) {
  
  var auth = basic(function (u, p, callback) {
    if (user === u && pass === p) return callback(null)
    callback(401)
  })
  
  var server = http.createServer(function(req, res) {
    console.log(req.method, req.url)
    if (req.url.match(/favicon/)) return res.end()
    if (!user || !pass) return tail(file, res)
    auth(req, res, function(err) {
      if (err) return authError(req, res)
      return tail(file, res)
    })
  })
  
  return server
}

function authError(req, res) {
  res.statusCode = 401
  res.setHeader("WWW-Authenticate", "Basic realm=\"Secure Area\"")
  res.end("Unauthorized\n")
}

function tail(file, res) {
  res.writeHead(200, {
    'content-type': 'text/plain'
  })
  bintail.createReadStream(file).pipe(res)
}
