import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import Layout from '../layout/layout';
import PageNotFound from '../page-not-found/page-not-found';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { PublicRoute } from '../public-route/public-route';
import { getAuthorizationStatus } from '../../authorization-status';
import { reviews } from '../../mocks/reviews';
import { useEffect } from 'react';
import { loadOffers } from '../../features/sorting-offers-by-cities';
import { fullOffers } from '../../mocks/full-offers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';


function App(): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);
  const stateOffers = useAppSelector((state) => state.rental.offers);
  const favorites = stateOffers.filter((item) => item.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout favoritesCount={favorites.length}/>} >
          <Route index element={
            < MainPage stateOffers={stateOffers}/>
          }
          />
          <Route path={AppRoute.Offer} element={
            <OfferPage fullOffers={fullOffers} reviews={reviews}/>
          }
          />
          <Route path={AppRoute.Login} element={
            <PublicRoute
              authorizationStatus={authorizationStatus}
            >
              <LoginPage />
            </PublicRoute>
          }
          />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesPage favorites={favorites}/>
            </PrivateRoute>
          }
          />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
