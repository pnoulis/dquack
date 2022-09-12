import { readdir } from 'node:fs/promises';

const list = async function listAvailableContainerizedServices(ID) {
    try {
       const dir = await readdir('./assets/services');
       return dir
    } catch (err) {
       console.log(err) 
    }
}

export default list;