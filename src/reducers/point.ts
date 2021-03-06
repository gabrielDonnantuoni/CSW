/* eslint-disable complexity */
import { PointActions } from '../declarations';

const initialState = {
  id: '',
  cordX: 0,
  cordY: 0,
  f: [0, 0, 0],
  restrictions: [false, false, false],
};

const point = (state = initialState, action: PointActions) => {
  switch (action.type) {
    case 'ID':
      return { ...state, ...action.payload };
    case 'CORDX':
      return { ...state, ...action.payload };
    case 'CORDY':
      return { ...state, ...action.payload };
    case 'F0':
      return { ...state, f: [action.payload.f0, state.f[1], state.f[2]] };
    case 'F1':
      return { ...state, f: [state.f[0], action.payload.f1, state.f[2]] };
    case 'F2':
      return { ...state, f: [state.f[0], state.f[1], action.payload.f2] };
    case 'R0':
      return { ...state,
        restrictions: [action.payload.r0,
          state.restrictions[1],
          state.restrictions[2]] };
    case 'R1':
      return { ...state,
        restrictions: [state.restrictions[0],
          action.payload.r1,
          state.restrictions[2]] };
    case 'R2':
      return { ...state,
        restrictions: [state.restrictions[0],
          state.restrictions[1], action.payload.r2] };
    case 'RESET_POINT':
      return { ...initialState };
    default:
      return state;
  }
};

export default point;
