# What is it #

This package goal is to patch a Webpacker configuration to support compilation of EntDec packages

**.npmrc**
```
@components:registry=https://code.entropydecelerator.com/api/v4/packages/npm/
```

**package.json** - add to `"dependencies"`
```json
"@components/webpacker-config": "x"
```

**config/webpack/environment.js**
```javascript
const { configureWebpackerEnvironment } = require('@components/webpacker-config');
const { environment } = require('@rails/webpacker');

configureWebpackerEnvironment(environment);
```
