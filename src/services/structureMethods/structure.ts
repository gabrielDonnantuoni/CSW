import { inBar } from './elements';
import { addArrOfMatrixes } from '../math/matrixOperations';

export class structure {
  f: number[];
  nodes: number;
  arrOfKeGReduced: number[][][];
  KReduced: number[][];

  constructor(f: number[], ...inputs: inBar[]) {
    this.nodes = inputs.length + 1;
    this.f = f;
    this.arrOfKeGReduced = inputs.map(({ KeGReduced }) => KeGReduced);
    this.KReduced = addArrOfMatrixes(this.arrOfKeGReduced);
  }
}
