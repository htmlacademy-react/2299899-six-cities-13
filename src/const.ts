export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}

export const STARS = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export enum APIRoute {
  Offers = '/offers',
  Reviews = '/comments',
  NearOffers = '/nearby',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const SORT_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const DateTimeFormat = {
  COMMENT_DATE: 'MMMM YYYY',
};

export const PASSWORD_RULE = '^(?:[0-9]+[a-zA-Z]|[a-zA-Z]+[0-9])[0-9a-zA-Z]*$';

export enum ReviewDescriptionLimit {
  Min = 50,
  Max = 300,
}

export const OFFER_MAX_IMAGES_SHOWN = 6;

export const OFFER_MAX_REVIEWS_SHOWN = 10;

export const OFFER_MAX_NEARBY_OFFERS_SHOWN = 3;
