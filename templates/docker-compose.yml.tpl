version: '3'

services:
  server:
    build: .
    image: %{git.name}%/%{name}%
    hostname: %{name}%-{{NODE_ENV}}
    command: dumb-init node index.js
    ports:
      - "{{NODE_APP_PORT}}:{{NODE_APP_PORT}}"
      - "{{NODE_REPL_PORT}}:{{NODE_REPL_PORT}}"
    environment:
      - DEBUG=%{name}%
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
