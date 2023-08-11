import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import LoadingPage from '../../pages/loading-page/loading-page';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import {
  getIsOffersLoading,
  getOffers,
} from '../../store/data-process/data-process.selectors';
import { useEffect } from 'react';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const offers = useAppSelector(getOffers);

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <LoadingPage />;
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offers={offers} cities={CITIES} />}
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
