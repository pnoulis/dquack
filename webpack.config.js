import { join, parse } from 'node:path';

const 
projectRoot = parse(new URL(import.meta.url).pathname).dir.substring(1,)

export default {
    mode: 'development',
    target: ['node18', 'es2021'],
    entry: {
        main: join(projectRoot, 'src', 'index.js')
    },
    output: {
        filename: '[name].bundle.cjs',
        path: join(projectRoot, 'build'),
        clean: true
    },
    resolve: {
        modules: ['node_modules'],
        preferRelative: false
    }
}