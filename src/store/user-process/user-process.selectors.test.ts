import { describe } from 'vitest';
import { NameSpace } from '../../const';
import {
  selectAuthorizationStatus,
  selectCurrentUser,
} from './user-process.selectors';
import { makeFakeState } from '../../utils/test-mocks';

describe('UserProcess selectors', () => {
  const state = makeFakeState();

  it('should return "authorizationStatus" from state', () => {
    const expected = state[NameSpace.User].authorizationStatus;

    const result = selectAuthorizationStatus(state);

    expect(result).toEqual(expected);
  });

  it('should return isOffersLoading boolean status from state', () => {
    const expected = state[NameSpace.User].currentUser;

    const result = selectCurrentUser(state);

    expect(result).toBe(expected);
  });
});
