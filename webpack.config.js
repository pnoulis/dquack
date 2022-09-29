import { resolve, parse } from 'node:path';
import EventHooksPlugin from 'event-hooks-webpack-plugin';
import { handlers } from './config/lib_webpack.js';

const projectRoot = parse(new URL(import.meta.url).pathname).dir;

export default {
  mode: `${process.env.NODE_ENV}`,
  entry: {
    main: resolve(projectRoot, 'src', 'index.js')
  },
  output: {
    filename: '[name].bundle.cjs',
    path: resolve(projectRoot, 'build'),
    clean: {
      keep: /var|public|share|etc|bin/
    }
  },
  resolve: {
    modules: ['node_modules'],
    preferRelative: false
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [
    new EventHooksPlugin({
      done: handlers.onDone
    })
  ]
}
