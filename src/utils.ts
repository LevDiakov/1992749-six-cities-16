import { AppRoute, MONTHS } from './const';
import { Offer, CardsByCityType, userReview } from './types/types';

export const getCapitalLetter = (item: string) => `${item[0].toUpperCase()}${item.slice(1)}`;

export const getLayoutState = (pathname: AppRoute) => {
  let rootClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Main) {
    rootClassName = 'page--gray page--main';
    linkClassName = 'header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = 'page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter};
};

export const getOfferCardsByCity = (offerCards: Offer[]) => {
  const cardsByCity: CardsByCityType = {};

  for (const card of offerCards) {
    if (!cardsByCity[card.city.name]) {
      cardsByCity[card.city.name] = [];
    }

    cardsByCity[card.city.name].push(card);
  }

  return cardsByCity;
};

export const gethumanizeDate = (item: string) => {
  const date = new Date(item);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const getSortedByDates = (a: userReview, b: userReview) => (new Date(b.date).getTime()) - (new Date(a.date).getTime());

export const getPricesLowToHigh = (a: Offer, b: Offer) => (a.price - b.price);
export const getPricesHighToLow = (a: Offer, b: Offer) => (b.price - a.price);
export const getTopRatedFirst = (a: Offer, b: Offer) => (b.rating - a.rating);

export const getOffersForCurrentCityBySortOption =
(currentSortOption: string, offersForCurrentCity: Offer[], offersForCurrentCityBySortOption: Offer[]) => {

  if (currentSortOption === 'Price: low to high') {
    offersForCurrentCityBySortOption = offersForCurrentCity.sort(getPricesLowToHigh);
  } else
    if (currentSortOption === 'Price: high to low') {
      offersForCurrentCityBySortOption = offersForCurrentCity.sort(getPricesHighToLow);
    } else
      if (currentSortOption === 'Top rated first') {
        offersForCurrentCityBySortOption = offersForCurrentCity.sort(getTopRatedFirst);
      } else
        if (currentSortOption === 'Popular') {
          offersForCurrentCityBySortOption = offersForCurrentCity;
        }

  return offersForCurrentCityBySortOption;
};
