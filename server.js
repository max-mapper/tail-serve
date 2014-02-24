#!/usr/bin/env node
var tailserve = require('./')
var file = process.argv[2]
if (!file) throw new Error('must specify file')
var user = process.env['TAILUSER']
var pass = process.env['TAILPASS']
var port = process.env['PORT'] || 8080

tailserve(file, user, pass).listen(port)