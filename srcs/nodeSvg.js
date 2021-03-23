const REGEX_CLASS_EXTRACT = /class="(.*?)"/gm;
const REGEX_PATH_EXTRACT = /class="(.*?)"/gm;

class NodeSvg {
  path; //string
  childs; //nodeSvg

  constructor(body) {
    this.body = body;
    this.childs = [];
  }

  convertClassToInline(nodeCss) {
    this.body = nodeCss.trad(this.body);
    this.body = this.body.replace(RegExp("class=", "gm"), "style=");
  }

  construct() {
    return this.body;
  }
}

module.exports = NodeSvg;
