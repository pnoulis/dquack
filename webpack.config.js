import { resolve, parse } from 'node:path';
import NodemonPlugin from 'nodemon-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const projectRoot = parse(new URL(import.meta.url).pathname).dir

export default {
  mode: `${process.env.NODE_ENV}`,
  entry: {
    main: resolve(projectRoot, 'src', 'index.js')
  },
  output: {
    filename: '[name].bundle.cjs',
    path: resolve(projectRoot, 'build'),
    clean: true
  },
  resolve: {
    modules: ['node_modules'],
    preferRelative: false
  },
  plugins: [
    new NodemonPlugin({
      script: resolve(projectRoot, 'build', 'main.bundle.cjs'),
      watch: resolve(projectRoot, 'build'),
      runOnChangeOnly: false,
      events: {
        start: "sleep 3; dquack.sh 2>&1"
      },
      env: {
        NODE_ENV: 'development',
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve(projectRoot, 'assets', 'services'), to: resolve(projectRoot, 'build', 'assets', 'services') }
      ]
    })
  ],
  experiments: {
    topLevelAwait: true
  }
}
