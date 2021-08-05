import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/index.tsx",
  output: {
    file: "lib/index.js",
    format: "cjs",
  },
  plugins: [postcss(), typescript()],
};
