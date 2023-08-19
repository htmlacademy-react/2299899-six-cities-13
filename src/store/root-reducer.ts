import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcess } from './data-process/data-process.slice';
import { appProcess } from './app-process/app-process.slice';
import { userProcess } from './user-process/user-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
