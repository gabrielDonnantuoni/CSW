import { InPointInput, PointListActions } from '../declarations';
import { ADD_POINT, REMOVE_POINT, EDIT_POINT, UNCLEAR_INPUTS_POINT,
  CLEAR_INPUTS_POINT } from '../consts';

interface State {
  points: InPointInput[];
  clearForm: boolean;
}

const initialState: State = {
  points: [],
  clearForm: false,
};

const points = (state = initialState, action: PointListActions) => {
  switch (action.type) {
    case ADD_POINT:
      return { ...state, points: [...state.points, action.payload] };
    case REMOVE_POINT:
      return { ...state,
        points: [...state.points
          .filter(({ id }) => id !== action.payload.id)] };
    case EDIT_POINT:
      return { ...state,
        points: [...state.points
          .map((point) => (point.id === action.payload.id ? action.payload : point))] };
    case CLEAR_INPUTS_POINT:
      return { ...state, clearForm: true };
    case UNCLEAR_INPUTS_POINT:
      return { ...state, clearForm: false };
    default:
      return state;
  }
};

export default points;
