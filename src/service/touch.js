import { readdir } from 'node:fs/promises';
import { resolve, parse, join } from 'node:path';

async function resolveAsset(ID) {
    const assets = resolve(parse(new URL(import.meta.url).pathname).dir, '../../assets/services');
    const dir = await readdir(assets);
    const asset = dir.find($_ => $_ === ID + '.Dockerfile');
    if (!asset) {
        throw new Error(`no such service: ${ID}`);
    }
    return join(`${assets}/` + asset)
}

async function resolveAssetImage(asset) {

}

const touch = async function checkAllContainerizedServiceDependenciesExist(ID) {
    const service = {};
    try {
        service.asset = await resolveAsset(ID);
        service.name = parse(service.asset).name
        return service;
    } catch (error) {
        return { err: error }
    }
}

export default touch;