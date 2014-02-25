# tail-serve

simple http server with optional http basic auth that will expose a file over HTTP in a similar way to how `tail` works

[![NPM](https://nodei.co/npm/tail-serve.png)](https://nodei.co/npm/tail-serve/)

`tail -f` (e.g. live tail) isn't supported, as Chrome stopped rendering live text/plain streams so this module would have to use websockets/xhr instead, which would be more trouble than it is worth

## usage

### CLI

```
npm install tail-serve -g
tail-serve foo.log
```

you can specify these options via env variables:

```
PORT # default 8080
TAILUSER # default undefined
TAILPASS # default undefined
TAILSIZE # default 1048576 (1MB)
```

e.g.

```
PORT=80 TAILUSER=foo TAILPASS=bar TAILSIZE=1024 tail-serve app.log
```

if `TAILUSER` and `TAILPASS` are set then tail-serve will require HTTP basic auth for access

`TAILSIZE`

### javascript

```js
var tailserve = require('tail-serve')
var filename = "foo.log"
var options = { user: user, pass: pass, size: size }
var handler = tailserve(filename, options)
http.createServer(handler).listen(80)
```
