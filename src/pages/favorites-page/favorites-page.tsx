import { Helmet } from 'react-helmet-async';
import { OfferClick, OfferHover } from '../../types/offer.ts';
import StayPlaceCards from '../../components/stay-place-card/stay-place-cards.tsx';
import Header from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import { Cities } from '../../const.ts';

type FavoritesPageProps = {
  onOfferClick: OfferClick;
  onOfferHover: OfferHover;
}

function FavoritesPage({onOfferClick, onOfferHover}: FavoritesPageProps): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {
              favoriteOffers.length !== 0
                ? (
                  <ul className="favorites__list">
                    {
                      Object.values(Cities).map((city) => (
                        <li className="favorites__locations-items" key={city.name}>
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{city.name}</span>
                              </a>
                            </div>
                          </div>
                          <StayPlaceCards
                            offers={favoriteOffers.filter((offer) => offer.city.name === city.name)}
                            onOfferClick={onOfferClick}
                            onOfferHover={onOfferHover}
                            isFavoritePage
                          />
                        </li>
                      ))
                    }
                  </ul>
                )
                : ''
            }

          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
