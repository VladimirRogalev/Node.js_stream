import {createReadStream} from 'node:fs';

function compareFiles(path1: string, path2: string): boolean {
    let res = true;
    let done = false;
    const input1 = createReadStream(path1);
    const input2 = createReadStream(path2);

    while (!done) {
        const b1 = input1.read(1);
        const b2 = input2.read(1);
        res = (b1 === b2);
        done = (b1 === null);
    }


    return res;
}
export default compareFiles;
// compareFiles(process.argv[2], process.argv[2]);