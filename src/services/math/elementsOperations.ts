/* eslint-disable max-params */
/* eslint-disable no-magic-numbers */
import { NDArray } from 'vectorious';
import { AdjPoints, SectionTypes, SectionProps,
  InPointInput, InBarWithOutf0, InBarWithT2x2 } from '../../declarations';

export const dist = (axis: 'X' | 'Y', points: AdjPoints) => {
  const coord = `cord${axis}` as 'cordX' | 'cordY';
  return points[1][coord] - points[0][coord];
};

export const calcL = (points: AdjPoints) => {
  const dx2 = dist('X', points) ** 2;
  const dy2 = dist('Y', points) ** 2;
  return Math.sqrt(dx2 + dy2);
};

export const calcA = (section: SectionTypes, sectionProps: SectionProps) => {
  const { A, height, base, diameter } = sectionProps;
  let calcResult = 0;
  switch (section) {
    case 'circ':
      if (diameter) calcResult = (Math.PI * (diameter ** 2)) / (4 * (10 ** 4));
      break;
    case 'rect':
      if (height && base) calcResult = (base * height) / (10 ** 4);
      break;
    default:
      if (A) calcResult = A;
  }
  return calcResult;
};

export const calcI = (section: SectionTypes, sectionProps: SectionProps) => {
  const { I, height, base, diameter } = sectionProps;
  let calcResult = 0;
  switch (section) {
    case 'circ':
      if (diameter) calcResult = (Math.PI * (diameter ** 4)) / (64 * (10 ** 8));
      break;
    case 'rect':
      if (height && base) calcResult = (base * (height ** 3)) / (12 * (10 ** 8));
      break;
    default:
      if (I) calcResult = I;
  }
  return calcResult;
};

export const calcKeL = (A: number, E: number, I: number, L: number) => {
  const EAL = (E * A) / L;
  const EI12L3 = (E * I * 12) / (L ** 3);
  const EI6L2 = (E * I * 6) / (L ** 2);
  const EI4L = (E * I * 4) / L;
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
    [0, 0, 0, cos, sen * auxForTransp, 0],
    [0, 0, 0, -sen * auxForTransp, cos, 0],
    [0, 0, 0, 0, 0, 1],
  ]);
};

export const barRestrictions = (points: AdjPoints): boolean[] => {
  const arrOfRest = points.map(({ restrictions }) => restrictions);
  return [...arrOfRest[0], ...arrOfRest[1]];
};

export const calcKeG = (TeT: NDArray, KeL: NDArray, Te: NDArray) => (
  TeT.multiply(KeL).multiply(Te)
);

export const getHeight = ({ height, diameter }: SectionProps) => {
  if (height) return height / 100;
  if (diameter) return diameter / 100;
  return 1;
};

const generateLineEq = ([p1, p2]: AdjPoints) => {
  const a = (p2.cordY - p1.cordY) / (p2.cordX - p1.cordX);
  const b = p1.cordY - a * p1.cordX;
  return { a, b };
};

export const belongsToLineEq = ([pStart, pEnd]: AdjPoints, otherPoint: InPointInput) => {
  const coordsArr = ['cordX', 'cordY'] as ['cordX', 'cordY'];
  const checkRange = coordsArr.map((cord) => (pStart[cord] > pEnd[cord]
    ? otherPoint[cord] < pStart[cord] && otherPoint[cord] > pEnd[cord]
    : otherPoint[cord] > pStart[cord] && otherPoint[cord] < pEnd[cord]
  ));
  if (checkRange.some((check) => !check)) return false;

  const { a, b } = generateLineEq([pStart, pEnd]);
  return otherPoint.cordY === a * otherPoint.cordX + b;
};

const initf0Contribution = () => (new NDArray([0, 0, 0, 0, 0, 0], { shape: [6, 1] }));

const generatePointLoadContribution = (bar: InBarWithT2x2) => {
  const { loads: { pointLoad: arr }, L, T2x2 } = bar;
  const f0Contribution = initf0Contribution();
  if (!arr) return f0Contribution;
  return arr.reduce((acc, { px, py, d1 }) => {
    const globalPs = new NDArray([px, py], { shape: [2, 1] });
    const [qx, qy] = T2x2.multiply(globalPs).reshape(1, 2).toArray()[0] as number[];
    const [a, b] = [d1, L - d1];
    const Mstart = (qy * a * (b ** 2)) / (L ** 2);
    const Mend = (-qy * (a ** 2) * b) / (L ** 2);
    const Vstart = ((qy * b + Mstart + Mend) / L);
    const Vend = qy - Vstart;
    const Hstart = (-qx * b) / L;
    const Hend = (-qx * a) / L;
    const curContribution = new NDArray([Hstart, Vstart, Mstart, Hend, Vend, Mend],
      { shape: [6, 1] });
    return acc.add(curContribution);
  }, f0Contribution);
};

const generatePointMomentContribution = (bar: InBarWithT2x2) => {
  const { loads: { pointMoment: arr }, L } = bar;
  const f0Contribution = initf0Contribution();
  if (!arr) return f0Contribution;
  return arr.reduce((acc, { p, d1 }) => {
    const [a, b] = [d1, L - d1];
    const Mstart = (p * b * (2 * a - b)) / (L ** 2);
    const Mend = (p * a * (2 * b - a)) / (L ** 2);
    const Vstart = (6 * p * a * b) / (L ** 2);
    const Vend = -Vstart;
    const curContribution = new NDArray([0, Vstart, Mstart, 0, Vend, Mend],
      { shape: [6, 1] });
    return acc.add(curContribution);
  }, f0Contribution);
};

const generateUniformDistLoadContribution = (bar: InBarWithT2x2) => {
  const { loads: { uniformDistLoad: arr }, L, T2x2 } = bar;
  const f0Contribution = initf0Contribution();
  if (!arr) return f0Contribution;
  return arr.reduce((acc, { px, py, d1, d2 }) => {
    const globalPs = new NDArray([px, py], { shape: [2, 1] });
    const [qx, qy] = T2x2.multiply(globalPs).reshape(1, 2).toArray()[0] as number[];
    const c = L - d1 - d2;
    const [a, b] = [d1 + (c / 2), d2 + (c / 2)];
    const Mstart = ((qy * c) / (12 * (L ** 2)))
      * (12 * a * (b ** 2) + (c ** 2) * (L - 3 * b));
    const Mend = -Mstart - (3 * qy * (c ** 3) * (b - a)) / (12 * (L ** 2));
    const Vstart = (qy * c * b + Mstart + Mend) / L;
    const Vend = qy * c - Vstart;
    const Hstart = (-qx * c * b) / L;
    const Hend = (-qx * c * a) / L;
    const curContribution = new NDArray([Hstart, Vstart, Mstart, Hend, Vend, Mend],
      { shape: [6, 1] });
    return acc.add(curContribution);
  }, f0Contribution);
};

const generateTriangularDistLoadContribution = (bar: InBarWithT2x2) => {
  const { loads: { triangularDistLoad: arr }, L, T2x2 } = bar;
  const f0Contribution = initf0Contribution();
  if (!arr) return f0Contribution;
  return arr.reduce((acc, { px, py, d1, d2, maxValueSide }) => {
    const globalPs = new NDArray([px, py], { shape: [2, 1] });
    const [qx, qy] = T2x2.multiply(globalPs).reshape(1, 2).toArray()[0] as number[];
    const c = L - d1 - d2;
    const [b, d] = [d1 + c, L - d1 - (2 * c) / 3];

    let Mstart = ((qy * c) / (2 * (L ** 2)))
      * ((d ** 2) * (d - L) + ((c ** 2) / 3) * ((L / 3) + ((17 * c) / 90) - (b / 2)));
    let Mend = ((-qy * c) / (2 * (L ** 2)))
    * (d * ((d - L) ** 2) + ((c ** 2) / 6) * ((L / 3) + ((17 * c) / 45) - b));
    let Vstart = ((qy * c) / (2 * (L ** 3)))
      * ((d ** 2) * (3 * L - 2 * d) - ((c ** 2) / 3) * ((L / 2) - b + ((17 * c) / 45)));
    let Vend = ((qy * c) / 2) - Vstart;
    let Hstart = (-qx * c * d) / (2 * L);
    let Hend = (-qx * c * (L - d)) / (2 * L);

    if (maxValueSide === 'left') {
      [Hstart, Vstart, Mstart,
        Hend, Vend, Mend] = [Hend, Vend, -Mend, Hstart, Vstart, -Mstart];
    }
    const curContribution = new NDArray([Hstart, Vstart, Mstart, Hend, Vend, Mend],
      { shape: [6, 1] });
    return acc.add(curContribution);
  }, f0Contribution);
};

const generateTemperatureLoadContribution = (bar: InBarWithT2x2) => {
  const { loads: { temperature: temps }, alpha, A, E, I, H } = bar;
  const f0Contribution = initf0Contribution();
  if (!temps) return f0Contribution;
  const { Ts, Ti } = temps;
  const dT = (Ts + Ti) / 2;
  const gT = (Ti - Ts) / H;
  const Hstart = alpha * E * A * dT;
  const Hend = -Hstart;
  const Mstart = alpha * E * I * gT;
  const Mend = -Mstart;
  return new NDArray([Hstart, 0, Mstart, Hend, 0, Mend], { shape: [6, 1] });
};

export const calcf0 = (bar: InBarWithOutf0) => {
  const { sen, cos, TeT } = bar;
  const T2x2 = new NDArray([[cos, sen], [-sen, cos]], { shape: [2, 2] });
  const Tbar = { ...bar, T2x2 };
  const f0Arr = [
    generatePointLoadContribution(Tbar),
    generatePointMomentContribution(Tbar),
    generateUniformDistLoadContribution(Tbar),
    generateTriangularDistLoadContribution(Tbar),
    generateTemperatureLoadContribution(Tbar),
  ];
  const f0 = f0Arr.reduce((acc, cur) => acc.add(cur));
  return {
    local: f0,
    global: TeT.multiply(f0),
  };
};
