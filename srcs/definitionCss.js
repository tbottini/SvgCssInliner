//une class Css interpret√©
class DefinitionCss {
  rules;

  //rules String
  constructor(rules) {
    this.rules = rules;
  }

  addRules(rules) {
    this.rules += rules;
  }

  getRules() {
    return this.rules;
  }
}

module.exports = DefinitionCss;
