import { AnyAction, createAction, createSlice } from '@reduxjs/toolkit';
import { InPointInput } from '../declarations';
import Bar from '../services/structureMethods/Bar';

export interface Project {
  name: string,
  inputs: {
    points: InPointInput[],
    bars: Bar[],
  },
}

export const addPoint = createAction<InPointInput>('add-point');
export const addBar = createAction<Bar>('add-bar');
export const removePoint = createAction<string>('remove-point');
export const removeBar = createAction<string>('remove-bar');
export const editPoint = createAction<InPointInput>('edit-point');
export const editBar = createAction<Bar>('edit-bar');
export const upTabIndex = createAction<number>('up-tab-index');
export const upName = createAction<string>('up-name');
export const upProject = createAction<Project>('up-project');

const isAddAction = (action: AnyAction): action is ReturnType<typeof addPoint>
| ReturnType<typeof addBar> => (action.type.includes('add-'));

const isRemoveAction = (action: AnyAction): action is ReturnType<typeof removePoint>
| ReturnType<typeof removeBar> => (action.type.includes('remove-'));

const isEditAction = (action: AnyAction): action is ReturnType<typeof editPoint>
| ReturnType<typeof editBar> => (action.type.includes('edit-'));

export interface ProjectState extends Project {
  tabIndex: number;
  language: string;
}

export const initialState: ProjectState = {
  tabIndex: 0,
  language: 'pt-br',
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
      // .addCase(addPoint, (state, action) => {
      //   state.inputs.points.push(action.payload);
      // })
      // .addCase(removePoint, (state, action) => {
      //   state.inputs.points = state.inputs.points
      //     .filter(({ id }) => id !== action.payload);
      // })
      // .addCase(editPoint, (state, action) => {
      //   state.inputs.points = state.inputs.points
      //     .map((point) => (point.id === action.payload.id ? action.payload : point));
      // })
      .addMatcher(isAddAction, (state, action) => {
        if (action.type.includes('-bar')) {
          state.inputs.bars.push(action.payload as Bar);
        } else state.inputs.points.push(action.payload as InPointInput);
      })
      .addMatcher(isRemoveAction, (state, action) => {
        if (action.type.includes('-bar')) {
          state.inputs.bars = state.inputs.bars
            .filter(({ id }) => id !== action.payload);
        } else {
          state.inputs.points = state.inputs.points
            .filter(({ id }) => id !== action.payload);
        }
      })
      .addMatcher(isEditAction, (state, action) => {
        if (action.type.includes('-bar')) {
          state.inputs.bars = state.inputs.bars
            .map((bar) => (bar.id === action.payload.id ? action.payload as Bar : bar));
        } else {
          state.inputs.points = state.inputs.points
            .map((point) => (point.id === action.payload.id
              ? action.payload as InPointInput : point));
        }
      });
  },
});

export default project.reducer;
