import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import path from "path";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: "src/demo/index.tsx",
    output: {
      file: "libdemo/index.js",
    },
    plugins: [
      postcss({ extract: path.resolve("lib/demo/style/style.css") }),
      typescript({ tsconfig: "tsconfig.json", exclude: ["*.less"] }),
    ],
  },
];
