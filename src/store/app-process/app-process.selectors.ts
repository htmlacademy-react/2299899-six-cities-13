import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectCurrentSort = (state: Pick<State, NameSpace.App>): string =>
  state[NameSpace.App].currentSort;
export const selectCurrentCity = (state: Pick<State, NameSpace.App>): string =>
  state[NameSpace.App].currentCity;
export const selectCardUnderMouse = (
  state: Pick<State, NameSpace.App>
): string | undefined => state[NameSpace.App].cardUnderMouse;
