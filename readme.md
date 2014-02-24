# tail-serve

simple http-server with optional http basic auth that will expose a file over HTTP in a similar way to how `tail` works

[![NPM](https://nodei.co/npm/tail-serve.png)](https://nodei.co/npm/tail-serve/)

## example

```
npm install tail-serve -g
PORT=80 TAILUSER=foo TAILPASS=bar TAILSIZE=1048756 tail-serve foo.log
```

`tail -f` (e.g. live tail) isn't supported yet
