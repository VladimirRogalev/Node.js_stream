"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
function compareFiles(path1, path2) {
    let res = true;
    let done = false;
    const input1 = (0, node_fs_1.createReadStream)(path1);
    const input2 = (0, node_fs_1.createReadStream)(path2);
    while (!done) {
        const b1 = input1.read(1);
        const b2 = input2.read(1);
        res = (b1 === b2);
        done = (b1 === null);
    }
    return res;
}
exports.default = compareFiles;
// compareFiles(process.argv[2], process.argv[2]);
