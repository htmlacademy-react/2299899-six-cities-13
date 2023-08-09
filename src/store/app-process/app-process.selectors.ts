import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentSort = (state: State): string =>
  state[NameSpace.App].currentSort;
export const getCity = (state: State): string => state[NameSpace.App].city;
