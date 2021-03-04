/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
import { NDArray } from 'vectorious/built';
import { array as MatrixOps } from 'vectorious/built/core/array';
import { InPointInput, DFObj } from '../../declarations';
import InBar from '../structureMethods/InBar';

export const buildFAndDF = (inputs: InPointInput[]) => {
  const result: [number[], DFObj[]] = [[], []];
  let resultIndex = 0;
  inputs.forEach(({ id, f, restrictions }) => {
    restrictions.forEach((value, index) => {
      if (!value) {
        result[0][resultIndex] = f[index];
        result[1][resultIndex] = { id, idIndex: index, gIndex: resultIndex };
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

export const parseKes = (DFs: DFObj[], inBars: InBar[]) => {
  const parseds: NDArray[] = [];
  inBars.forEach(({ KeG, points }) => {
    const [{ id: id1 }, { id: id2 }] = points;
    const KEG = KeG.toArray();
    const DFsIndexs = DFs
      .filter(({ id }) => [id1, id2].includes(id))
      .reduce((acc: number[][], { id, idIndex, gIndex }, i) => {
        if (!acc[i]) acc[i] = [];
        acc[1][i] = gIndex;
        if (id === id1) acc[0][i] = idIndex;
        if (id === id2) acc[0][i] = idIndex + 3;
        return acc;
      }, []); // [[...idIndex], [...gIndex]]
    const newKeG = initiateKs(DFs.length).toArray();
    newKeG.forEach((row, iRow) => {
      const iRowMatch = DFsIndexs[1].indexOf(iRow);
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

export const addParsedKes = (DFs: DFObj[], inBars: InBar[]) => {
  const parsedKes = parseKes(DFs, inBars);
  return parsedKes.reduce((acc, cur) => MatrixOps(acc).add(cur));
};

export const solveSys = (K: NDArray, f: number[]) => {
  const fMatrix = new NDArray(f, { shape: [f.length, 1] });
  return MatrixOps(K).solve(fMatrix);
};
