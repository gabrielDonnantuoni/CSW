import { InPointInput } from '../declarations';
import { AppThunk } from '../store';
import { addPointAction, clearInputs, unClearInputs } from './pointList';

export { updateCordsAndFs, updateR, updateId, resetPointAction } from './pointState';

export const addPointAndResetForm = (point: InPointInput): AppThunk => (dispatch) => (
  Promise.resolve(dispatch(addPointAction(point)))
    .then(() => dispatch(clearInputs()))
    .then(() => dispatch(unClearInputs()))
);
