export type AuthStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

export type NameCity = 'Paris' | 'Cologne' | 'Brussels'| 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: NameCity;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type FullOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export type userReview = {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}

export type userReviews = userReview[];

export type addReview = {
  comment: string;
  rating: number;
}

export type CardsByCityType = {
  [key: string]: Offer[];
}

export type SortOption = string;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export type AuthorizationUser = {
  email: string;
  token: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Message = {
  offerId: string | undefined;
  data: addReview;
};
