import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import LoadingPage from '../../pages/loading-page/loading-page';
import { HelmetProvider } from 'react-helmet-async';
import { City } from '../../mocks/city';
import { useAppSelector } from '../../hooks';

type AppProps = {
  offersCount: number;
  city: City;
};

function App({ offersCount, city }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isQuestionsDataLoading = useAppSelector(
    (state) => state.isQuestionsDataLoading
  );
  const offers = useAppSelector((state) => state.offers);

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isQuestionsDataLoading
  ) {
    return <LoadingPage />;
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                offersCount={offersCount}
                offers={offers}
                cities={CITIES}
                currentCity={city}
              />
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage offers={offers} />}
          />
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
