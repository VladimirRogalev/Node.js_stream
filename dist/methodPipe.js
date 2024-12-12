"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const compareFiles_1 = __importDefault(require("./compareFiles"));
function copyPhoto(copiesNum, index) {
    index = index !== null && index !== void 0 ? index : 0;
    const photo = fs.createReadStream(`images/labrador-retriever${index}.png`);
    const photoCopy = photo.pipe(fs.createWriteStream(`images/labrador-retriever${index + 1}.png`));
    // photoCopy.on('finish', () => (index<copiesNum)&& copyPhoto(copiesNum, index+1));
    photoCopy.on('finish', () => {
        const areEqual = ((0, compareFiles_1.default)(`images/labrador-retriever${index}.png`, `images/labrador-retriever${index + 1}.png`));
        console.log(`Files ${index} and ${index + 1} ${areEqual ? 'are equal' : 'are not equal'}`);
        if (index < copiesNum) {
            copyPhoto(copiesNum, index + 1);
        }
    });
}
const readStream = fs.createReadStream('images/labrador-retriever.png');
const writeStream = fs.createWriteStream(`images/labrador-retriever0.png`);
readStream.pipe(writeStream).on('finish', () => {
    copyPhoto(10);
});
