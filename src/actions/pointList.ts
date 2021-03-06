import { ADD_POINT, REMOVE_POINT, EDIT_POINT, CLEAR_INPUTS_POINT,
  UNCLEAR_INPUTS_POINT } from '../consts';
import { InPointInput } from '../declarations';

export const addPointAction = (point: InPointInput) => ({
  type: ADD_POINT,
  payload: point,
});

export const removePointAction = (point: InPointInput) => ({
  type: REMOVE_POINT,
  payload: point,
});

export const editPointAction = (point: InPointInput) => ({
  type: EDIT_POINT,
  payload: point,
});

export const clearInputs = () => ({ type: CLEAR_INPUTS_POINT });

export const unClearInputs = () => ({ type: UNCLEAR_INPUTS_POINT });
