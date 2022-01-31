# Contributing

We are not sure what contributing looks like yet, so for now it will be ad-hoc.

## Releases

Currently releases are managed by release-it and run locally from `main`.

- release-it: https://www.npmjs.com/package/release-it
- Configuration options: https://github.com/release-it/release-it/blob/HEAD/config/release-it.json

Automating canary releases would be nice.


```bash
yarn pub:canary
```

If we decide to cut a patch we can go for:

```bash
yarn pub:main
```
