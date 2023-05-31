import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
  input: './js/editor.mjs', // Archivo de entrada de Rollup
  output: {
    file: './dist/js/editor.bundle.js', // Archivo de salida
    format: 'iife', // Formato de módulo deseado
    globals: {
      '@babel/runtime/helpers/extends': '_extends' // Nombre global para el módulo externo
    }
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled', // Utiliza los helpers de babel empaquetados
      exclude: 'node_modules/**' // Excluye la carpeta node_modules
    })
  ],
  external: ['@babel/runtime/helpers/extends'] // Marca el módulo externo como una dependencia externa
};
