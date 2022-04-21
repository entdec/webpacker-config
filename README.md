# What is it

This package goal is to patch a Webpacker configuration to support compilation of EntDec packages

Goto https://github.com/settings/tokens and create personal access token "npmrc - packages" with the following scopes: delete:packages, repo, write:packages.
Add this token in the below .npmrc at [TOKEN]

**.npmrc**

```
//npm.pkg.github.com/:_authToken=[TOKEN]
@entdec:registry=https://npm.pkg.github.com
```

**package.json** - add to `"dependencies"`

```json
    "@entdec/webpacker-config": "git+ssh://git@github.com/entdec/webpacker-config.git#0.3.2",
```

**config/webpack/environment.js**

```javascript
const { configureWebpackerEnvironment } = require("@entdec/webpacker-config")
const { environment } = require("@rails/webpacker")

configureWebpackerEnvironment(environment)
```

# Troubleshooting

This _only_ works when webpacker says "Found entdec package" for your component. If it doesn't check this repo's aliases.js and check that it's in there.
