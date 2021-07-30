const path = require("path")
const fs = require("fs")
const findPackageJson = require("find-package-json")
const { babel } = require("@rails/webpacker/package/rules")
const { nodeEnv } = require("@rails/webpacker/package/env")
const babelConfig = require("./babel.config")
const clonedRule = { ...babel }
delete clonedRule.exclude

Object.assign(
  clonedRule.use[0].options,
  babelConfig({
    env: (env) => (typeof env === "undefined" ? nodeEnv : nodeEnv === env),
  })
)

const pathsCache = []

function checkForEntdecPackage(filePath) {
  filePath = fs.realpathSync(filePath)

  if (filePathInCache()) {
    return true
  }

  finder = findPackageJson(filePath)

  const { value, done, filename } = finder.next()

  if (done) {
    return false
  }

  const description = typeof value.description === "string" ? value.description.toLowerCase() : ""
  const repo = typeof value.repository === "string" ? value.repository.toLowerCase() : ""
  const entDecPackage = description.indexOf("entdec") > -1 || repo.indexOf("git@code.entropydecelerator.com") > -1

  if (entDecPackage) {
    console.log(`Found entdec package ${value.name}`)
    pathsCache.push(path.dirname(filename))
  }

  function filePathInCache() {
    return pathsCache.find((path) => filePath.indexOf(path) > -1)
  }
}

clonedRule.include = checkForEntdecPackage

function configureWebpackerEnvironment(environment) {
  environment.loaders.append("entdecBabel", clonedRule)
  ;["sass", "moduleSass"]
    .map((name) => environment.loaders.get(name))
    .forEach((loader) => {
      loader.use[loader.use.length - 1].options.implementation = require("sass")
      loader.use.splice(loader.use.length - 1, 0, {
        loader: "resolve-url-loader",
      })
    })

  environment.config.merge({
    resolve: {
      alias: {
        jquery: "jquery/src/jquery",
        "jquery-chained": "jquery-chained/jquery.chained",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        ...require("./aliases"),
      },
      modules: [path.join(process.cwd(), "node_modules")],
    },
  })
}

module.exports = {
  configureWebpackerEnvironment,
}
