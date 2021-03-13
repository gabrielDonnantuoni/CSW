import { createAction, createSlice } from '@reduxjs/toolkit';
import { InPointInput, InBarInput } from '../declarations';

export interface Project {
  name: string,
  inputs: {
    points: InPointInput[],
    bars: InBarInput[],
  },
}

export const addPoint = createAction<InPointInput>('add-point');
export const removePoint = createAction<string>('remove-point');
export const editPoint = createAction<InPointInput>('edit-point');
export const upTabIndex = createAction<number>('up-tab-index');
export const upName = createAction<string>('up-name');
export const upProject = createAction<Project>('up-project');

export interface ProjectState extends Project {
  tabIndex: number;
}

export const initialState: ProjectState = {
  tabIndex: 0,
  name: '',
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
      .addCase(upName, (state, action) => {
        state.name = action.payload;
      })
      .addCase(upProject, (state, action) => {
        state.tabIndex = 0;
        state.name = action.payload.name;
        state.inputs = action.payload.inputs;
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
