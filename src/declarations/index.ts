export interface InPointInput {
  id: string;
  cordX: number;
  cordY: number;
  f: [number, number, number];
  restrictions: [boolean, boolean, boolean];
}
export type AdjPoints = [InPointInput, InPointInput];
export type SectionTypes = 'circ' | 'rect' | 'other';
export interface Dimensions {
  A?: number,
  I?: number,
  height?: number,
  base?: number,
  diameter?: number,
}
export interface InBarInput {
  points: AdjPoints;
  type: 'beam' | 'pillar';
  name: string;
  section: SectionTypes;
  dimensions: Dimensions;
  E: number;
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
