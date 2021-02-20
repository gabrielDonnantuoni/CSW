import { NDArray } from 'vectorious/built';
import { array as MatrixOps } from 'vectorious/built/core/array';

// export const calcKeGParsed = (KeL: NDArray, restrictions: boolean[]) => {

// }

const A = new NDArray([[1,2,3]]);
const B = new NDArray([[1], [2], [3]]);

console.log(MatrixOps(A).multiply(B));
console.log(MatrixOps(A).add(B));
