import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectCurrentSort = (state: State): string =>
  state[NameSpace.App].currentSort;
export const selectCurrentCity = (state: State): string =>
  state[NameSpace.App].city;
export const selectCardUnderMouse = (state: State): string | undefined =>
  state[NameSpace.App].cardUnderMouse;
