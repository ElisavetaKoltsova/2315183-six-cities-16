import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page.tsx';
import { AppRoute } from '../../const.ts';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/offer.ts';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { closeSorts } from '../../store/sort-process/sort-process.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const [currentOffer, setCurrentOffer] = useState<Offer>({} as Offer);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const offerClickHandler = (offer: Offer) => {
    dispatch(closeSorts());
    setCurrentOffer({
      ...currentOffer,
      id: offer.id
    });
  };

  const offerHoverHandler = (offerElement: Offer) => {
    const currentPoint = offerElement;
    setSelectedOffer(currentPoint);
  };

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainPage
              onOfferClick={offerClickHandler}
              onOfferHover={offerHoverHandler}
              selectedOffer={selectedOffer}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesPage
                onOfferClick={offerClickHandler}
                onOfferHover={offerHoverHandler}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
        >
          <Route
            path={AppRoute.OfferId}
            element={
              <OfferPage
                onOfferClick={offerClickHandler}
                onOfferHover={offerHoverHandler}
                selectedOffer={selectedOffer}
              />
            }
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
