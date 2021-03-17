const { babel } = require('@rails/webpacker');

module.exports = {
  patchEnvironment: function (env) {
    const clonedRule = { ...babel };
    delete clonedRule.exclude;
    clonedRule.include = /node_modules\/@components/;
  
  
    env.config.rules.push(clonedRule);
  
    console.log(env.config.rules);
  }
};