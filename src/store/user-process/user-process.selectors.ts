import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const selectAuthorizationStatus = (
  state: Pick<State, NameSpace.User>
): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectCurrentUser = (
  state: Pick<State, NameSpace.User>
): UserData | null => state[NameSpace.User].currentUser;
