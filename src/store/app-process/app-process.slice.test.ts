import { describe } from 'vitest';
import {
  appProcess,
  setCardUnderMouse,
  setCity,
  setCurrentSort,
} from './app-process.slice';
import { AppProcess } from '../../types/state';
import { CITIES, SORT_OPTIONS } from '../../const';
import { random } from 'faker';
import { makeFakeOffer } from '../../utils/test-mocks';

describe('AppProcess slice', () => {
  const initialState: AppProcess = {
    currentSort: SORT_OPTIONS[0],
    currentCity: CITIES[0],
    cardUnderMouse: undefined,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = appProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set "currentSort" in state', () => {
    const expected = random.arrayElement(SORT_OPTIONS);

    const result = appProcess.reducer(undefined, setCurrentSort(expected));

    expect(result.currentSort).toBe(expected);
  });

  it('should set "city" in state', () => {
    const expected = random.arrayElement(CITIES);

    const result = appProcess.reducer(undefined, setCity(expected));

    expect(result.currentCity).toBe(expected);
  });

  it('should set "cardUnderMouse" in state', () => {
    const expected = makeFakeOffer().id;

    const result = appProcess.reducer(undefined, setCardUnderMouse(expected));

    expect(result.cardUnderMouse).toBe(expected);
  });
});
