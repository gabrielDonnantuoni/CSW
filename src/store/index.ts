import { configureStore } from '@reduxjs/toolkit';

import point from '../slices/point';
import project from '../slices/project';

const store = configureStore({
  reducer: {
    point,
    project,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
