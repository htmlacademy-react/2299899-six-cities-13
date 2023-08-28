import { describe } from 'vitest';
import { NameSpace } from '../../const';
import {
  selectCardUnderMouse,
  selectCurrentCity,
  selectCurrentSort,
} from './app-process.selectors';
import { makeFakeState } from '../../utils/test-mocks';

describe('AppProcess selectors', () => {
  const state = makeFakeState();

  it('should return "currentSort" from state', () => {
    const expected = state[NameSpace.App].currentSort;

    const result = selectCurrentSort(state);

    expect(result).toBe(expected);
  });

  it('should return "currentCity" from state', () => {
    const expected = state[NameSpace.App].currentCity;

    const result = selectCurrentCity(state);

    expect(result).toBe(expected);
  });

  it('should return "cardUnderMouse" from state', () => {
    const expected = state[NameSpace.App].cardUnderMouse;

    const result = selectCardUnderMouse(state);

    expect(result).toBe(expected);
  });
});
