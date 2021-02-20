"use strict";
exports.__esModule = true;
var built_1 = require("vectorious/built");
var array_1 = require("vectorious/built/core/array");
// export const calcKeGParsed = (KeL: NDArray, restrictions: boolean[]) => {
// }
var A = new built_1.NDArray([[1, 2, 3]]);
var B = new built_1.NDArray([[1], [2], [3]]);
console.log(array_1.array(A).multiply(B));
console.log(array_1.array(A).add(B));
