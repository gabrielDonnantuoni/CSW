export type Matrix = number[][];

export const multiMatrix = (A: Matrix, B: Matrix) => {
  if (A[0].length !== B.length) throw new Error(
    'Number of columns of A must be equal to number of lines of B'
  );
  return A.reduce((accumulator: Matrix, line, index1) => {
    let newLine: number[] = [];
    for (let i = 0; i < B[index1].length; i += 1) {
      const Mmxi = line.reduce((acc, colA, index2) => acc + colA*B[index2][i], 0);
      newLine = [...newLine, Mmxi];
    }
    accumulator[index1] = newLine;
    return accumulator;
  }, []);
}

export const reduxMatrixByRestrictions = (M: Matrix, restrictions: boolean[]) => {
  if (M.length !== restrictions.length) throw new Error(
    'Number of lines of M must be equal to number of lines of restrictions'
  );
  const auxMatrix: Matrix = [];
  M.forEach((line, i) => {
      auxMatrix[i] = [...line];
  });

  restrictions.forEach((rest, index) => {
    if (rest) auxMatrix[index] = [NaN];
  });

  auxMatrix.forEach((line, iLine) => {
    if (line.length === M[0].length) {
      restrictions.forEach((rest, index) => {
        if (rest) auxMatrix[iLine][index] = NaN;
      });
    }
  });
  
  const newMatrix: Matrix = [[1]];
  let newLineIndex = 0;
  auxMatrix.forEach((line) => {
    if (line.length === M[0].length) {
      let newColumnIndex = 0;
      line.forEach((value) => {
        if (!newMatrix[newLineIndex]) newMatrix[newLineIndex] = [1];
        if (!isNaN(value)) {
          newMatrix[newLineIndex][newColumnIndex] = value;
          newColumnIndex += 1;
        }
      });
      newLineIndex += 1;
    }
  });

  return newMatrix;
}

export const addMatrixes = (A: Matrix, B: Matrix) => {
  const sizeTest = [
    (A.length !== B.length),
    (A[0].length !== B[0].length),
  ];
  if (sizeTest.includes(true)) throw new Error(
    'The size of lines and columns must be equal'
  );

  const nOfLines = A.length;
  const nOfColumns = A[0].length;
  const newMatrix = [[1]];

  for (let lineIndex = 0; lineIndex < nOfLines; lineIndex += 1) {
    for (let colIndex = 0; colIndex < nOfColumns; colIndex += 1) {
      if (!newMatrix[lineIndex]) newMatrix[lineIndex] = [1];
      newMatrix[lineIndex][colIndex] = A[lineIndex][colIndex] + B[lineIndex][colIndex];
    }
  }
  return newMatrix;
}

export const addArrOfMatrixes = (arr: Matrix[]): Matrix => {
  return arr.reduce((acc, curMatrix) => addMatrixes(acc, curMatrix));
}

// TESTES 
  // const t = [
  //   [11, 12, 13, 14, 15],
  //   [21, 22, 23, 24, 25],
  //   [31, 32, 33, 34, 35],
  //   [41, 42, 43, 44, 45],
  //   [51, 52, 53, 54, 55]
  // ];

  // const t2 = t.map((line) => line.map((value) => -1));
  // const t3 = t.map((line) => line.map((value) => -10));

  // console.log(addArrOfMatrixes([t,t2,t3]));

  // const res = [true, false, false, false, true];

  // console.log(reduxMatrixByRestrictions(t, res));
