import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, logoutAction } from '../../store/api-actions';
import {
  getAuthorizationStatus,
  getCurrentUser,
} from '../../store/user-process/user-process.selectors';
import { getToken } from '../../services/token';

export default function HeaderUser(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentUser = useAppSelector(getCurrentUser);
  const token = getToken();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.Login}>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    );
  }

  if (!currentUser && token) {
    dispatch(checkAuthAction());
  }

  const handleSignoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            {currentUser?.email}
          </span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to={AppRoute.Main}
          onClick={handleSignoutClick}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}
