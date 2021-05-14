import { NDArray } from 'vectorious';
import { dist, calcL, calcA, calcI, calcKeL,
  calcT, calcKeG, getHeight, calcf0 } from '../math/elementsOperations';
import { InBarInput, AdjPoints, Loads, InBarWithOutf0 } from '../../declarations';

const N10_6 = 1000000;

export default class Bar {
  points: AdjPoints;
  id: string;
  type: 'beam' | 'pillar';
  name: string;
  alpha: number;
  A: number;
  E: number;
  I: number;
  L: number;
  H: number;
  loads: Loads;
  KeL: NDArray;
  cos: number;
  sen: number;
  Te: NDArray;
  TeT: NDArray;
  KeG: NDArray;
  f0: NDArray;

  constructor(inputs: InBarInput) {
    this.points = inputs.points;
    this.id = this.points[0].id.toString().replace('point-', 'bar-');
    this.type = inputs.type;
    this.name = inputs.name;
    this.alpha = inputs.alpha;
    this.loads = inputs.loads;
    this.L = calcL(inputs.points);
    this.E = inputs.E * (N10_6);
    this.A = calcA(inputs.section, inputs.sectionProps);
    this.I = calcI(inputs.section, inputs.sectionProps);
    this.H = getHeight(inputs.sectionProps);
    this.KeL = calcKeL(this.A, this.E, this.I, this.L);
    this.cos = dist('X', inputs.points) / this.L;
    this.sen = dist('Y', inputs.points) / this.L;
    this.Te = calcT(this.cos, this.sen, false);
    this.TeT = calcT(this.cos, this.sen, true);
    this.KeG = calcKeG(this.TeT, this.KeL, this.Te);
    this.f0 = calcf0(this as InBarWithOutf0);
  }
}
