import { SortOption } from '../../features/sorting-offers-by-cities';
import { useAppSelector } from '../../store/hooks';
import { Offer } from '../../types/types';
import { getOffersForCurrentCityBySortOption } from '../../utils';
import PlaceCard from '../place-card/place-card';
import SortOptions from '../sort-options/sort-options';
import Map from '../map/map';

type PlacesListProps = {
  stateOffers: Offer[];
  onListOfferHover?: (id?: string) => void;
  selectedOffer: Offer | undefined;
  currentCity: string;
}

function ListOffers({stateOffers, onListOfferHover, selectedOffer, currentCity}: PlacesListProps): JSX.Element {

  const offersForCurrentCity = stateOffers.filter((item) => item.city.name === currentCity);
  const currentSortOption: SortOption = useAppSelector((state) => state.rental.sortOption);

  const offersForCurrentCityBySortOption: Offer[] = offersForCurrentCity;
  getOffersForCurrentCityBySortOption(currentSortOption, offersForCurrentCity, offersForCurrentCityBySortOption);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersForCurrentCity.length} place{offersForCurrentCity.length > 1 && 's'} to stay in {currentCity}</b>

          <SortOptions currentSortOption={currentSortOption} />

          <div className="cities__places-list places__list tabs__content">

            {offersForCurrentCity.length < 1 ? 'No places to stay available' :
              offersForCurrentCityBySortOption.map((item) => <PlaceCard onListOfferHover={onListOfferHover} key={item.id} offer={item} className='cities'/>)}

          </div>

        </section>
        <div className="cities__right-section">

          {offersForCurrentCity.length < 1 ? <section className="cities__map map"></section> :
            <Map city={offersForCurrentCity[0].city} offers={offersForCurrentCity} selectedOffer={selectedOffer} className='cities'/>}

        </div>
      </div>
    </div>
  );
}

export default ListOffers;

