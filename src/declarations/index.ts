import { NDArray } from 'vectorious';

export interface InPointInput {
  id: string;
  cordX: number;
  cordY: number;
  f: [number, number, number];
  restrictions: [boolean, boolean, boolean];
}
export type AdjPoints = [InPointInput, InPointInput];
export type SectionTypes = 'circ' | 'rect' | 'other';
export interface SectionProps {
  A?: number,
  I?: number,
  height?: number,
  base?: number,
  diameter?: number,
}

export interface SimpleLoad {
  p: number;
  d1: number;
}

export interface ComplexLoad extends SimpleLoad {
  d2: number;
}

export interface VaryingLoad {
  p: number;
  point: 'start' | 'end';
}

export interface VaryingTemperature {
  Ts: number;
  Ti: number;
}

export interface Loads {
  pointLoadCrossAxis?: SimpleLoad[];
  pointLoadMainAxis?: SimpleLoad[];
  uniformDistLoad?: ComplexLoad[];
  varyingDistLoad?: VaryingLoad[];
  pointMoment?: SimpleLoad[];
  temperature?: VaryingTemperature;
}

export interface InBarInput {
  points: AdjPoints;
  type: 'beam' | 'pillar';
  name: string;
  section: SectionTypes;
  sectionProps: SectionProps;
  E: number;
  alpha: number;
  loads: Loads;
}

export interface InBarWithOutf0 {
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
}

export interface DFObj {
  id: string;
  idIndex: number;
  gIndex: number;
}

export interface Project {
  inputs: {
    points: InPointInput[],
    bars: InBarInput[],
  };
}

export interface StoreProject extends Project {
  tabIndex: number;
}
