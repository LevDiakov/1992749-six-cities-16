import { Link } from 'react-router-dom';
import ListOffers from '../../components/list-offers/list-offers';
import { CITY_NAMES } from '../../const';
import { Offer } from '../../types/types';
import { useState } from 'react';
import { setCurrentCity } from '../../features/sorting-offers-by-cities';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type MainPageProps = {
  stateOffers: Offer[];
}

function MainPage({stateOffers}: MainPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleListOfferHover = (id?: string) => {
    const currentOffer = stateOffers.find((point) => point.id === id);
    setSelectedOffer(currentOffer);
  };

  const currentCity = useAppSelector((state) => state.rental.currentCity);
  const handleCityChange = (city: string) => {
    dispatch(setCurrentCity(city));
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITY_NAMES.map((item) => (
              <li className="locations__item" key={item} onClick={() => handleCityChange(item)}>
                <Link className={`locations__item-link tabs__item ${(item === currentCity) ? 'tabs__item--active' : ''}`} to="#">
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ListOffers
        currentCity={currentCity}
        onListOfferHover={handleListOfferHover}
        selectedOffer={selectedOffer}
        stateOffers={stateOffers}
      />
    </main>
  );
}

export default MainPage;

