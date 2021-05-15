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

export interface MomentLoad {
  p: number;
  d1: number;
}

export interface SimpleLoad {
  px: number;
  py: number;
  d1: number;
}

export interface DistLoad extends SimpleLoad {
  d2: number;
}

export interface TriLoad extends DistLoad {
  maxValueSide: 'right' | 'left';
}

export interface VaryingTemperature {
  Ts: number;
  Ti: number;
}

export interface Loads {
  pointLoad?: SimpleLoad[];
  uniformDistLoad?: DistLoad[];
  triangularDistLoad?: TriLoad[];
  pointMoment?: MomentLoad[];
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

export interface InBarWithT2x2 extends InBarWithOutf0 {
  T2x2: NDArray;
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
