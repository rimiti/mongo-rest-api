# foncia-test

## Description

Foncia technical test.

## How to use it?

## Pre-requirements

- Docker
- Docker Compose

### Tests

All tests are dockerized.

```sh
$ yarn docker:run:test
```

### Development environment

Development environment is dockerized too.

```sh
$ yarn docker:run:development
```

### Accessing

```sh
http://127.0.0.1:3000
```

## Scripts

Run using yarn `<script>` command.

    lint                    - Eslint + prettier check.
    lint:fix                - Eslint + prettier auto fixing.
    test                    - Run tests with coverage.
    build                   - Compile source files.
    build:watch             - Interactive watch mode, compile sources on change.
    docker:wait             - Wait until stack will be ready.
    docker:run:development  - Runs development environment.
    docker:run:test         - Runs tests.
    docker:init:development - Initialize development environment.
    docker:init:test        - Initialize test environment.
