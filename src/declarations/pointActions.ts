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
  payload: { r0: boolean };
}

interface R1 {
  type: 'R1';
  payload: { r1: boolean };
}

interface R2 {
  type: 'R2';
  payload: { r2: boolean };
}

interface ResetPoint { type: 'RESET_POINT' }

type PointActions = UpdateId | CordX | CordY | F0
| F1 | F2 | R0 | R1 | R2 | ResetPoint;

export default PointActions;
