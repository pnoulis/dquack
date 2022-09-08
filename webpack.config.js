import { join, parse } from 'node:path';
import Dotenv from 'dotenv-webpack';

let projectRoot = ''
switch (process.platform) {
    case 'win32':
        projectRoot = parse(new URL(import.meta.url).pathname).dir.substring(1,)
        break;
    case 'linux':
        projectRoot = parse(new URL(import.meta.url).pathname).dir
        break;
    default:
        throw `Unrecognized platform: ${process.platform}`
}

export default {
    mode: `${process.env.NODE_ENV}`,
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
    },
    plugins: [
        new Dotenv({
            // 1st be safe
            safe: join(projectRoot, 'config', '.env.example'),
            // 2nd load defaults
            defaults: join(projectRoot, 'config', '.env.dev.defaults'),
            // 3rd load secrets
            path: join(projectRoot, 'config', '.env.dev'),
            // 4th CL arguments trample all
            systemvars: true
        })
    ]
}
