export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
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
