/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
import { NDArray } from 'vectorious';
import { InPointInput, DFObj } from '../../declarations';
import Bar from '../structureMethods/Bar';

const toMatrix = (array: unknown) => (array as number[][]);

export const buildFAndDF = (inPoints: InPointInput[], bars: Bar[]) => {
  const result: [number[], DFObj[]] = [[], []];
  let resultIndex = 0;
  inPoints.forEach((point) => {
    point.restrictions.forEach((value, rIndex) => {
      if (!value) {
        const f0AtIndex = bars
          .filter(({ points }) => {
            const matchPoint = points.find((barPoint) => (barPoint.id === point.id));
            if (!matchPoint) return false;
            return true;
          })
          .map(({ f0: { global }, points }) => {
            const fg = global.reshape(1, 6).toArray()[0] as number[];
            const matchIdx = points.indexOf(point);
            return matchIdx === 0 ? fg[rIndex] : fg[rIndex + 3];
          })
          .reduce((acc, cur) => acc + cur);

        result[0][resultIndex] = point.f[rIndex] - f0AtIndex;
        result[1][resultIndex] = { id: point.id, idIndex: rIndex, gIndex: resultIndex };
        resultIndex += 1;
      }
    });
  });

  return result;
};

const initiateKs = (nDF: number) => {
  const result: number[] = [];
  for (let i = 0; i < nDF ** 2; i += 1) {
    result[i] = 0;
  }
  return new NDArray(result, { shape: [nDF, nDF] });
};

export const parseKes = (DFs: DFObj[], inBars: Bar[]) => {
  const parseds: NDArray[] = [];
  inBars.forEach(({ KeG, points }) => {
    const [{ id: id1 }, { id: id2 }] = points;
    const KEG = toMatrix(KeG.toArray());
    const DFsIndexs = DFs
      .filter(({ id }) => [id1, id2].includes(id))
      .reduce((acc: number[][], { id, idIndex, gIndex }, i) => {
        if (!acc[i]) acc[i] = [];
        acc[1][i] = gIndex;
        if (id === id1) acc[0][i] = idIndex;
        if (id === id2) acc[0][i] = idIndex + 3;
        return acc;
      }, []); // [[...idIndex], [...gIndex]]
    const newKeG = toMatrix(initiateKs(DFs.length).toArray());
    newKeG.forEach((row, iRow) => {
      const iRowMatch = DFsIndexs[1] ? DFsIndexs[1].indexOf(iRow) : -1;
      if (iRowMatch !== -1) {
        row.map((col, iCol) => {
          const iColMatch = DFsIndexs[1].indexOf(iCol);
          let newCol = 0;
          if (iColMatch !== -1) {
            const pickedRow = DFsIndexs[0][iRowMatch];
            const pickedCol = DFsIndexs[0][iColMatch];
            newCol = KEG[pickedRow][pickedCol];
          }
          return newCol;
        });
      }
    });
    parseds.push(new NDArray(newKeG));
  });
  return parseds;
};

export const addParsedKes = (DFs: DFObj[], inBars: Bar[]) => {
  const parsedKes = parseKes(DFs, inBars);
  return parsedKes.reduce((acc, cur) => acc.add(cur));
};

export const solveSys = (K: NDArray, f: number[]) => {
  const fMatrix = new NDArray(f, { shape: [f.length, 1] });
  return K.solve(fMatrix);
};
