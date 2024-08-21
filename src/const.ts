import { City } from './types/types';

export enum AppRoute {
  Main = '/',
  Offer = '/offer/:id',
  Login = '/login',
  Favorites = '/favorites',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITY_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const REVIEWS_RATING = [{title: 'perfect', rank: 5}, {title: 'good', rank: 4}, {title: 'not bad', rank: 3},{title: 'badly', rank: 2},{title: 'terribly', rank: 1}];

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const CITY: City = {
  name: 'Paris',
  'location': {
    'latitude': 48.85661,
    'longitude': 2.351499,
    'zoom': 13
  }
};

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';

export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export enum NumericalValues {
  Zero = 0,
  Three = 3,
  Four = 4,
  Twenty = 20,
}

export const sortOptions: string[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite',
}

export const COMMENT_LENGTH = {
  min: 50,
  max: 300,
};
