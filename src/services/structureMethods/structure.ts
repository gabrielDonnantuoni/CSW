import { NDArray } from 'vectorious';
import InBar from './InBar';
import { InPointInput, DFObj } from '../../declarations';
import { buildFAndDF, addParsedKes, solveSys } from '../math/structureOperations';

export default class Structure {
  f: number[];
  DFs: DFObj[];
  Ks: NDArray;
  u: NDArray;

  constructor(inPoints: InPointInput[], inBars: InBar[]) {
    [this.f, this.DFs] = buildFAndDF(inPoints);
    this.Ks = addParsedKes(this.DFs, inBars);
    this.u = solveSys(this.Ks, this.f);
  }
}
