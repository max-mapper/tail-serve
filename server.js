#!/usr/bin/env node
var http = require('http')
var tailserve = require('./')
var file = process.argv[2]
if (!file) throw new Error('must specify file')
var user = process.env['TAILUSER']
var pass = process.env['TAILPASS']
var port = process.env['PORT'] || 8080
var size = process.env['TAILSIZE']

var handler = tailserve(file, {user: user, pass: pass, size: size })
var server = http.createServer(handler).listen(port)
