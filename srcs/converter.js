const glob = require("glob-promise");
const FileSvg = require("./fileSvg");

class Converter {
  constructor() {}

  convertFile(pathFile) {
    const file = new FileSvg(pathFile);

    if (!file.invalid) file.write();
  }

  async convertFolder(folderPath, recursively = true) {
    var folder = await this.readFolder(folderPath);
    folder.forEach((file, i) => {
      this.convertFile(file);
    });
  }

  async readFolder(folderPath) {
    var files = await glob.sync("**/*.svg");

    return files;
  }
}

module.exports = Converter;
