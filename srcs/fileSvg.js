const NodeSvg = require("./nodeSvg");
const NodeCss = require("./nodeCss");
const fs = require("fs");

const EXTRACT_CSS = /<style>(=?.*)<\/style>/gm;
const EXTRACT_SVG = /<\/defs>(<.*?)<\/svg>/gm;

class FileSvg {
  body;
  path;
  cssStyle;
  nodeCss;
  nodeSvg;
  invalid;

  constructor(path) {
    console.log("File SVG : ", path);
    this.path = path;
    this.body = fs.readFileSync(path).toString();
    //console.log("init file\n", this.body);
    this.parse();
  }

  parse() {
    //regex pour extraire les données svg;

    var r = /<style>(=?.*)<\/style>/gm.exec(this.body);
    var bodyCss = "";
    if (!r) {
      this.invalid = true;
      return console.error("No css body found in file :", this.path);
    }
    bodyCss = r[1];

    r = /<\/defs>(<.*?)<\/svg>/gm.exec(this.body);
    if (!r) {
      this.invalid = true;
      return console.error("No svg body found in file : ", this.path);
    }
    const bodySvg = r[1];

    this.nodeSvg = new NodeSvg(bodySvg);
    this.nodeCss = new NodeCss(bodyCss);
  }

  construct() {
    if (this.invalid) return;
    this.nodeSvg.convertClassToInline(this.nodeCss);
    return `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 250">${this.nodeSvg.construct()}</svg>`;
  }

  write() {
    if (this.invalid) return;
    fs.writeFileSync(this.path, this.construct());
    console.log("SVG file update : ", this.path);
  }
}

module.exports = FileSvg;
