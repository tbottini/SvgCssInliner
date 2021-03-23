const Converter = require("./srcs/converter");

async function main() {
  const converter = new Converter();

  await converter.convertFolder("./test");
  return 0;
}

main();
