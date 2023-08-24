import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import LoadingPage from '../../pages/loading-page/loading-page';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { selectIsOffersLoading } from '../../store/data-process/data-process.selectors';
import { useEffect } from 'react';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersLoading = useAppSelector(selectIsOffersLoading);

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <LoadingPage />;
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
