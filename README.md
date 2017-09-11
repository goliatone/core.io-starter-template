does not resolve:
port: process.env.NODE_REPL_PORT || %{ replPort | randomPortNumber}%,

TODO:
If we don't select modules versions we don't get to pick which modules we want,
only server and persistence, but then data-manager and filesync get included...
