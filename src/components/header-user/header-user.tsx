import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import {
  selectAuthorizationStatus,
  selectCurrentUser,
} from '../../store/user-process/user-process.selectors';
import { selectFavorites } from '../../store/data-process/data-process.selectors';

export default function HeaderUser(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const currentUser = useAppSelector(selectCurrentUser);
  const favoritesCount = useAppSelector(selectFavorites).length;

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.Login}>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    );
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
          <span className="header__favorite-count">{favoritesCount}</span>
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
