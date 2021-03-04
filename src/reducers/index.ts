import { combineReducers } from 'redux';
import pointsList from './pointsList';
import point from './point';

const rootReducer = combineReducers({
  pointsList,
  point,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
