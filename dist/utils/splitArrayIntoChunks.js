"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitArrayIntoChunks = void 0;
function splitArrayIntoChunks(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}
exports.splitArrayIntoChunks = splitArrayIntoChunks;
