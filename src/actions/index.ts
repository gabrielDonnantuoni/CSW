import { InPointInput } from '../declarations';
import { ADD_POINT, REMOVE_POINT, EDIT_POINT } from '../reducers/pointsList';

export { updateNumeric, updateR, updateId } from './pointState';
export type { PointActions } from './pointState';

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
