import { InPointInput } from '../declarations';

export const ADD_POINT = 'ADD_POINT';
export const REMOVE_POINT = 'REMOVE_POINT';
export const EDIT_POINT = 'EDIT_POINT';

interface Action {
  type: string,
  payload: InPointInput,
}

const points = (state: InPointInput[] = [], action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POINT:
      return [
        ...state,
        payload,
      ];
    case REMOVE_POINT:
      return [...state.filter(({ id }) => id !== payload.id)];
    case EDIT_POINT:
      return [...state.map((point) => (point.id === payload.id ? payload : point))];
    default:
      return state;
  }
};

export default points;
