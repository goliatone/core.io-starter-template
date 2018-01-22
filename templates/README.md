## %{name}%

This is a sample project. To get started:

```
$ npm i %{moduleName}%
```


### Environment variables

* `NODE_APP_PORT`
* `NODE_REPL_PORT`

## Docker

NOTE: Ensure that the ports you have specified in the **docker-compose.yml** file, the **Dockerfile**, and `.envset` are the same.

### Dockerfile

### Docker Compose

```
version: '3'

services:
  server:
    build: .
    image: %{git.name}%/%{moduleName}%
    hostname: %{name}%-{{NODE_ENV}}
    command: dumb-init node index.js
    ports:
      - "{{NODE_APP_PORT}}:{{NODE_APP_PORT}}"
      - "{{NODE_REPL_PORT}}:{{NODE_REPL_PORT}}"
    environment:
      - DEBUG=%{moduleName}%
      - NODE_ENV={{NODE_ENV}}
      - NODE_APP_ID={{NODE_APP_ID}}
      - NODE_APP_PORT={{NODE_APP_PORT}}
      - NODE_REPL_PORT={{NODE_REPL_PORT}}
      - NODE_REPL_ENABLED={{NODE_REPL_ENABLED}}
    restart: always
    logging:
      options:
        max-size: "50m"
        max-file: "3"
```

## License
® License %{license}% 2017 by %{git.name}%
