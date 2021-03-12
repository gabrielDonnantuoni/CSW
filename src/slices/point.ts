import { createAction, createSlice, AnyAction } from '@reduxjs/toolkit';
import { InPointInput } from '../declarations';

export const upId = createAction<string>('up-id');
export const upCordX = createAction<number>('up-cordx');
export const upCordY = createAction<number>('up-cordy');
export const upFs = createAction('up-fs',
  (value: number, position: number) => ({
    payload: { value, position },
  }));
export const upRs = createAction('up-rs',
  (value: boolean, position: number) => ({
    payload: { value, position },
  }));
export const resetForm = createAction('reset-form');
export const unResetForm = createAction('unreset-form');

interface HandleFormAction {
  type: 'reset-form' | 'unreset-form';
}

function isHandleFormAction(action: AnyAction): action is HandleFormAction {
  return action.type.endsWith('form');
}

interface Point {
  point: InPointInput,
  shouldReset: boolean,
}

const initialState: Point = {
  point: {
    id: '',
    cordX: 0,
    cordY: 0,
    f: [0, 0, 0],
    restrictions: [false, false, false],
  },
  shouldReset: false,
};

const point = createSlice({
  name: 'point',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upId, (state, action) => {
        state.point.id = action.payload;
      })
      .addCase(upCordX, (state, action) => {
        state.point.cordX = action.payload;
      })
      .addCase(upCordY, (state, action) => {
        state.point.cordY = action.payload;
      })
      .addCase(upFs, (state, action) => {
        state.point.f[action.payload.position] = action.payload.value;
      })
      .addCase(upRs, (state, action) => {
        state.point.restrictions[action.payload.position] = action.payload.value;
      })
      .addMatcher(isHandleFormAction, (state, action) => {
        if (action.type === 'reset-form') state.shouldReset = true;
        else state.shouldReset = false;
      });
  },
});

export default point.reducer;
