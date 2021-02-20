import { reduxMatrixByRestrictions } from '../math/matrixOperations';
import { dist, calcL, calcA, calcI, calcKeL, calcT, calcKeG, barRestrictions } from '../math/elementsOperations';

export interface inPoint {
  id: number;
  cordX: number;
  cordY: number;
  f: [number, number, number];
  restrictions: [boolean, boolean, boolean];
};
export type adjPoints = [inPoint, inPoint];
export type sectionType = 'circ' | 'rect' | 'other';
export interface Idimensions { 
  A?: number,
  I?: number,
  height?: number,
  base?: number,
  diameter?: number,
};

export interface inBarObj {
  points: adjPoints;
  type: 'viga' | 'pilar';
  name: string;
  section: sectionType;
  dimensions: Idimensions;
  E: number;
}

export class inBar {
  id: number;
  type: string;
  name: string;
  A: number;
  E: number;
  I: number;
  L: number;
  KeL: number[][];
  cos: number;
  sen: number;
  Te: number[][];
  TeT: number[][];
  KeG: number[][];
  KeGReduced: number[][];

  constructor(inputs: inBarObj) {
    this.id = inputs.points[0].id;
    this.type = inputs.type;
    this.name = inputs.name;
    this.L = calcL(inputs.points);
    this.E = inputs.E * (10 ** 6);
    this.A = calcA(inputs.section, inputs.dimensions);
    this.I = calcI(inputs.section, inputs.dimensions);
    this.KeL = calcKeL(this.A, this.E, this.I, this.L);
    this.cos = dist('x', inputs.points) / this.L;
    this.sen = dist('y', inputs.points) / this.L;
    this.Te = calcT(this.cos, this.sen, false);
    this.TeT = calcT(this.cos, this.sen, true);
    this.KeG = calcKeG(this.TeT, this.KeL, this.Te);
    this.KeGReduced = reduxMatrixByRestrictions(this.KeG, barRestrictions(inputs.points));
  }
}

const inPoint_1: inPoint = {
  id: 1,
  cordX: 0,
  cordY: 0,
  f: [0, 0, 0],
  restrictions: [true, true, true],
};

const inPoint_2: inPoint = {
  id: 2,
  cordX: 5,
  cordY: 0,
  f: [0, -50, 40],
  restrictions: [false, false, false],
};

const inBar_1_Obj: inBarObj = {
  points: [inPoint_1, inPoint_2],
  type: 'viga',
  name: 'V1',
  section: 'other',
  dimensions: { A: 0.078125, I: (1.627583 /1000) },
  E: 24,
}

const inBar_1 = new inBar(inBar_1_Obj);

console.log('EI: ', inBar_1.E * inBar_1.I);
console.log('EA: ', inBar_1.E * inBar_1.A);
console.log('E: ', inBar_1.E);
console.log('A: ', inBar_1.A);
console.log('I: ', inBar_1.I);
console.log('L: ', inBar_1.L, '\n');

console.log('KeL: ', inBar_1.KeL);
console.log('cos: ', inBar_1.cos);
console.log('sen: ', inBar_1.sen);
console.log('Te: ', inBar_1.Te);
console.log('TeT: ', inBar_1.TeT, '\n');

console.log('KeG: ', inBar_1.KeG);
console.log('KeReduced: ', inBar_1.KeGReduced, '\n');

console.log('KeG[3][1]: ', inBar_1.KeG[3][1]);
console.log('KeG[5][0]: ', inBar_1.KeG[5][0]);