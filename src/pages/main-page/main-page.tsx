import { Link } from 'react-router-dom';
import ListOffers from '../../components/list-offers/list-offers';
import { CITY_NAMES } from '../../const';
import { Offer } from '../../types/types';
import Map from '../../components/map/map';
import { useState } from 'react';
import { setCurrentCity, SortOption } from '../../features/sorting-offers-by-cities';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SortOptions from '../../components/sort-options/sort-options';
import { getOffersForCurrentCityBySortOption } from '../../utils';

type MainPageProps = {
  stateOffers: Offer[];
}

function MainPage({stateOffers}: MainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleListOfferHover = (id?: string) => {
    const currentOffer = stateOffers.find((point) => point.id === id);
    setSelectedOffer(currentOffer);
  };

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.rental.currentCity);
  const handleCityChange = (city: string) => {
    dispatch(setCurrentCity(city));
  };

  const offersForCurrentCity = stateOffers.filter((item) => item.city.name === currentCity);
  const currentSortOption: SortOption = useAppSelector((state) => state.rental.sortOption);

  const offersForCurrentCityBySortOption: Offer[] = offersForCurrentCity;
  getOffersForCurrentCityBySortOption(currentSortOption, offersForCurrentCity, offersForCurrentCityBySortOption);

  return (

    <div className="page page--gray page--main">

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
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersForCurrentCity.length} place{offersForCurrentCity.length > 1 && 's'} to stay in {currentCity}</b>

              <SortOptions currentSortOption={currentSortOption} />

              <ListOffers offers={offersForCurrentCityBySortOption} onListOfferHover={handleListOfferHover} />

            </section>
            <div className="cities__right-section">
              <Map city={offersForCurrentCity[0].city} offers={offersForCurrentCity} selectedOffer={selectedOffer} className='cities'/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

