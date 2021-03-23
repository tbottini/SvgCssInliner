const DefinitionCss = require("./definitionCss");

const REGEX_EXTRACTION = /(..*?){(.*?)}/gm;

class NodeCss {
  dict;
  body;

  constructor(body) {
    this.body = body;
    this.dict = {};

    this.parse();
  }

  //couple corp du css en differente definition de class
  parse() {
    console.log("parse CSS", this.body);
    var result = Array.from(this.body.matchAll(/(\..*?){(.*?)}/g))
      .map(r => {
        return { class: r[1].split(","), rules: r[2] };
      })
      .forEach(r => {
        r.class.forEach(cls => {
          if (!this.dict[cls]) this.dict[cls] = "";
          this.dict[cls] += r.rules;
        });
      });

    console.log("FINAL DICT", this.dict);
  }

  getClass(classCss) {
    return this.dict[classCss].getRules();
  }

  trad(html) {
    Object.entries(this.dict).forEach(entries => {
      html = html.replace(new RegExp(entries[0].substr(1), "gm"), entries[1]);
    });
    return html;
  }
}

module.exports = NodeCss;

//<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 250"><defs><style>.cls-1,.cls-2,.cls-3{stroke:#000;stroke-miterlimit:10;stroke-width:3px;}.cls-2{fill:none;}.cls-3{fill:#fff;}</style></defs><circle class="cls-1" cx="160.24" cy="124.58" r="30.24"/><circle class="cls-2" cx="160.24" cy="124.58" r="77.18"/><path class="cls-3" d="M160.25,34.34c-67.95,0-105.61,90.24-105.61,90.24s30.23,90.24,105.61,90.24,105.55-91.3,105.55-91.3S228.19,34.34,160.25,34.34Zm-.08,167.94c-64.95,0-89.65-77.77-89.65-77.77s31.1-77.63,89.65-77.63,89.74,76.72,89.74,76.72S225.13,202.28,160.17,202.28Z"/></svg>
