import { NDArray } from 'vectorious';
import Bar from './Bar';
import { InPointInput, DFObj } from '../../declarations';
import { buildFAndDF, addParsedKes, solveSys } from '../math/structureOperations';

export default class Structure {
  f: number[];
  DFs: DFObj[];
  Ks: NDArray;
  u: NDArray;

  constructor(points: InPointInput[], bars: Bar[]) {
    [this.f, this.DFs] = buildFAndDF(points, bars);
    this.Ks = addParsedKes(this.DFs, bars);
    this.u = solveSys(this.Ks, this.f);
  }
}
