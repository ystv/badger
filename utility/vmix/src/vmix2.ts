import { readFileSync } from "fs";
import { js2xml, xml2js } from "xml-js";

const data = readFileSync(__dirname + "/__testdata__/vmix.xml", {
  encoding: "utf-8",
});
const obj = xml2js(data, { compact: true });
console.log(JSON.stringify(obj, null, 2));
console.log(js2xml(obj, { compact: true }));
