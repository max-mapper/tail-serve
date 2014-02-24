#!/usr/bin/env node
var tailserve = require('./')
var file = process.argv[2]
if (!file) throw new Error('must specify file')
var user = process.env['TAILUSER']
var pass = process.env['TAILPASS']
var port = process.env['PORT'] || 8080
var size = process.env['TAILSIZE']

tailserve({ file: file, user: user, pass: pass, size: size }).listen(port)
