import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import nodeExternals from "rollup-plugin-node-externals";
import { minify } from "rollup-plugin-esbuild";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [typescript(), nodeResolve(), nodeExternals(), minify()],
};
