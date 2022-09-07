import { join, parse } from 'node:path';

const 
projectRoot = parse(new URL(import.meta.url).pathname).dir.substring(1,)

export default {
    mode: 'development',
    target: 'node',
    entry: {
        main: join(projectRoot, 'src', 'index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: join(projectRoot, 'build')
    },
    resolve: {
        modules: ['node_modules'],
        preferRelative: false
    }
}