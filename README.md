# https://seankrail.dev/

## One time setup

Install pnpm [using corepack](https://pnpm.io/installation#using-corepack):

```sh
corepack enable pnpm
```

Install dependencies

```sh
pnpm install
```

## Development cycle

`--host` is optional, but allows you to view the build over your LAN.

```sh
pnpm run dev --host
```

(Optional) Preview production build

```sh
pnpm run build --mode development
# or
pnpm run build
# then
pnpm run preview --host
```

## Updating packages

```sh
pnpm update --interactive
# or
pnpm update --interactive --latest
```
