# ssi2html

ssi, shtml to html tools.

## install

```bash
pnpm add -d ssi2html
```

## shtml to html

```bash
ssi2html -s src -d dist -e .html
```

usage `ssi2html -h`.

## live-server ssi middleware

```bash
SSI_DIR=src SSI_EXT=.shtml live-server --middleware=$PWD/node_modules/ssi2html/middleware.js src
```

or

```bash
SSI_DIR=src SSI_EXT=.shtml live-server-ssi src
```

- SSI_DIR: ssi file directory
- SSI_EXT: ssi file extension

## scripts

add to package.json

```js
{
  "scripts": {
    "dev": "SSI_DIR=src SSI_EXT=.shtml live-server-ssi src",
    "dev2": "SSI_DIR=src SSI_EXT=.shtml live-server --middleware=$PWD/node_modules/ssi2html/middleware.js src",
    "build": "ssi2html -s src -d dist -e .shtml"
  }
}
```
