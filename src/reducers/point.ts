/* eslint-disable complexity */
const initialState = {
  id: '',
  cordX: 0,
  cordY: 0,
  f: [0, 0, 0],
  restrictions: [false, false, false],
};

interface Action {
  type: string,
  payload: {
    id: string,
    cordX: number;
    cordY: number;
    f0: number;
    f1: number;
    f2: number;
    r0: boolean;
    r1: boolean;
    r2: boolean;
  },
}

const point = (state = initialState, action: Action) => {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'ID':
      newState.id = payload.id;
      return { ...newState };
    case 'CORDX':
      newState.cordX = payload.cordX;
      return { ...newState };
    case 'CORDY':
      newState.cordY = payload.cordY;
      return { ...newState };
    case 'F0':
      newState.f[0] = payload.f0;
      return { ...newState };
    case 'F1':
      newState.f[1] = payload.f1;
      return { ...newState };
    case 'F2':
      newState.f[2] = payload.f2;
      return { ...newState };
    case 'R0':
      newState.restrictions[0] = payload.r0;
      return { ...newState };
    case 'R1':
      newState.restrictions[1] = payload.r1;
      return { ...newState };
    case 'R2':
      newState.restrictions[2] = payload.r2;
      return { ...newState };
    default:
      return state;
  }
};

export default point;
