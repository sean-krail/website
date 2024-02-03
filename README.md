# [seankrail.dev](https://seankrail.dev/)

[![GitHub Actions](https://github.com/sean-krail/website/workflows/Deploy%20GitHub%20Pages/badge.svg)](https://github.com/sean-krail/website/actions?query=workflow%3A%22Deploy+GitHub+Pages%22)

My personal website built using TypeScript, HTML, and CSS, built by Parcel, hosted on GitHub Pages, and continuously deployed by GitHub Actions.

## Development

Run the server in development mode with hot reloading:

```sh
# runs `parcel src/*.html` under the hood
yarn start
# Server running at http://localhost:1234
```

Open up http://localhost:1234/ in your browser. Now everytime you save a file,
the page will reload with your latest changes.

## Updating

### Updating node via [mise](https://mise.jdx.dev/getting-started.html)

There's a `.mise.toml in this project root, so all you need to run is:

```sh
mise use node@20
node -v
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
