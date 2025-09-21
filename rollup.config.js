import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const targets = [
  {
    input: 'src/surf.ts',
    output: 'scripts/surf.js'
  }
];

export default targets.map(({ input, output }) => ({
  input,
  output: {
    file: output,
    format: "esm",
  },
  external: ['cs_script/point_script'],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    nodeResolve(),
    commonjs()
  ],
}));