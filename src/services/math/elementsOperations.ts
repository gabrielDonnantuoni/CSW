import { adjPoints, sectionType, Idimensions } from '../structureMethods/elements';
import { NDArray } from 'vectorious/built';
import { array as MatrixOps } from 'vectorious/built/core/array';

export const dist = (cord: 'x' | 'y', points: adjPoints) => {
  return cord === 'x' ? (points[1].cordX - points[0].cordX)
    : (points[1].cordY - points[0].cordY);
};

export const calcL = (points: adjPoints) => {
  return ((dist('y', points) ** 2) + (dist('x', points) ** 2)) ** 0.5;
};

export const calcA = (section: sectionType, dimensions: Idimensions) => {
  const { A, height, base, diameter } = dimensions;
  let calcA = 0;
  switch(section) {
    case 'circ':
      if (diameter) calcA = Math.PI * (diameter ** 2) / (4 * (10 ** 4));
      break;
    case 'rect':
      if (height && base) calcA = base * height / (10 ** 4);
      break;
    default:
      if (A) calcA = A;
  }
  return calcA;
};

export const calcI = (section: sectionType, dimensions: Idimensions) => {
  const { I, height, base, diameter } = dimensions;
  let calcI = 0;
  switch(section) {
    case 'circ':
      if (diameter) calcI = Math.PI * (diameter ** 4) / (64 * (10 ** 8));
      break;
    case 'rect':
      if (height && base) calcI = base * (height ** 3) / (12 * (10 ** 8));
      break;
    default:
      if (I) calcI = I;
  }
  return calcI;
};

export const calcKeL = (A: number, E: number, I: number, L: number) => {
  const EAL = E * A / L;
  const EI12L3 = E * I * 12 / (L ** 3);
  const EI6L2 = E * I * 6 / (L ** 2);
  const EI4L = E * I * 4 / L;
  const EI2L = EI4L / 2;
  return new NDArray([
    [EAL, 0, 0, -EAL, 0, 0],
    [0, EI12L3, EI6L2, 0, -EI12L3, EI6L2],
    [0, EI6L2, EI4L, 0, -EI6L2, EI2L],
    [-EAL, 0, 0, EAL, 0, 0],
    [0, -EI12L3, -EI6L2, 0, EI12L3, -EI6L2],
    [0, EI6L2, EI2L, 0, -EI6L2, EI4L],
  ]);
};

export const calcT = (cos: number, sen: number, transpose: boolean) => {
  const auxForTransp = transpose ? -1 : 1;
  return new NDArray([
    [cos, sen * auxForTransp, 0, 0, 0, 0],
    [-sen * auxForTransp, cos, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, cos, -sen * auxForTransp, 0],
    [0, 0, 0, sen * auxForTransp, cos, 0],
    [0, 0, 0, 0, 0, 1],
  ]);
};

export const barRestrictions = (points: adjPoints): boolean[] => {
  const arrOfRest = points.map(({ restrictions }) => restrictions);
  return [...arrOfRest[0], ...arrOfRest[1]];
};

export const calcKeG = (TeT: NDArray, KeL: NDArray, Te: NDArray) => {
  return MatrixOps(TeT).multiply(KeL).multiply(Te);
};
