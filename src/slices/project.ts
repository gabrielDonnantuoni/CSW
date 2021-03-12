import { createAction, createSlice } from '@reduxjs/toolkit';
import { InPointInput, InBarInput } from '../declarations';

export const addPoint = createAction<InPointInput>('add-point');
export const removePoint = createAction<string>('remove-point');
export const editPoint = createAction<InPointInput>('edit-point');
export const upTabIndex = createAction<number>('up-tab-index');

interface Project {
  tabIndex: number,
  inputs: {
    points: InPointInput[],
    bars: InBarInput[],
  },
}

const initialState: Project = {
  tabIndex: 0,
  inputs: {
    points: [],
    bars: [],
  },
};

const project = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upTabIndex, (state, action) => {
        state.tabIndex = action.payload;
      })
      .addCase(addPoint, (state, action) => {
        state.inputs.points.push(action.payload);
      })
      .addCase(removePoint, (state, action) => {
        state.inputs.points.filter(({ id }) => id !== action.payload);
      })
      .addCase(editPoint, (state, action) => {
        state.inputs.points.map((point) => (point.id === action.payload.id
          ? action.payload
          : point));
      });
  },
});

export default project.reducer;
