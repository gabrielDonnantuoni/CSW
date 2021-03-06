export const updateId = (value: string) => ({
  type: 'ID',
  payload: { id: value },
});

const cordx = (value: number) => ({
  type: 'CORDX',
  payload: { cordX: value },
});

const cordy = (value: number) => ({
  type: 'CORDY',
  payload: { cordY: value },
});

const f0 = (value: number) => ({
  type: 'F0',
  payload: { f0: value },
});

const f1 = (value: number) => ({
  type: 'F1',
  payload: { f1: value },
});

const f2 = (value: number) => ({
  type: 'F2',
  payload: { f2: value },
});

const r0 = (value: boolean) => ({
  type: 'R0',
  payload: { r0: value },
});

const r1 = (value: boolean) => ({
  type: 'R1',
  payload: { r1: value },
});

const r2 = (value: boolean) => ({
  type: 'R2',
  payload: { r2: value },
});

export const updateNumeric = (name: string, value: number) => {
  switch (name) {
    case 'cordx':
      return cordx(value);
    case 'cordy':
      return cordy(value);
    case 'f0':
      return f0(value);
    case 'f1':
      return f1(value);
    case 'f2':
      return f2(value);
    default:
      return { type: 'none' };
  }
};

export const updateR = (name: string, value: boolean) => {
  switch (name) {
    case 'r0':
      return r0(value);
    case 'r1':
      return r1(value);
    case 'r2':
      return r2(value);
    default:
      return { type: 'none' };
  }
};

interface UpdateId {
  type: 'ID';
  payload: { id: string };
}

interface CordX {
  type: 'CORDX';
  payload: { cordX: number };
}

interface CordY {
  type: 'CORDY';
  payload: { cordY: number };
}

interface F0 {
  type: 'F0';
  payload: { f0: number };
}

interface F1 {
  type: 'F1';
  payload: { f1: number };
}

interface F2 {
  type: 'F2';
  payload: { f2: number };
}

interface R0 {
  type: 'R0';
  payload: { r0: number };
}

interface R1 {
  type: 'R1';
  payload: { r1: number };
}

interface R2 {
  type: 'R2';
  payload: { r2: number };
}

export type PointActions = UpdateId | CordX | CordY | F0 | F1 | F2 | R0 | R1 | R2;
