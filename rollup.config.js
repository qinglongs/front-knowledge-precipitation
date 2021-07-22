
import typescript from 'rollup-plugin-typescript2';
import tslint from "rollup-plugin-tslint";
module.exports = {

  // ...

  plugins: [
    // ...
    tslint(),
    typescript(),
  ],
}