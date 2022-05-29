# [seankrail.dev](https://seankrail.dev)

[![GitHub Actions](https://github.com/sean-krail/website/workflows/Deploy%20GitHub%20Pages/badge.svg)](https://github.com/sean-krail/website/actions?query=workflow%3A%22Deploy+GitHub+Pages%22)

My personal website built using vanilla JavaScript, HTML, and CSS, hosted on GitHub Pages, and continuously deployed by GitHub Actions.

## Development
Run the server in development mode with hot reloading:
```sh
# runs `parcel src/index.html` under the hood
yarn start
# Server running at http://localhost:1234
```

Open up http://localhost:1234/ in your browser. Now everytime you save a file,
the page will reload with your latest changes.

## Updating

### Updating node via nvm
There's a `.nvmrc` in this project root, so all you need to run is:
```sh
nvm use
```

### Updating yarn
See https://yarnpkg.com/getting-started/install.
```sh
# assuming you have already run:
# corepack enable
yarn set version stable
```

### Updating npm packages
```sh
yarn up -i '*' '@*/*'
```
