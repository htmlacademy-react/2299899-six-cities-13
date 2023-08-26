import { describe } from 'vitest';
import {
  AuthorizationStatus,
  CITIES,
  NameSpace,
  SORT_OPTIONS,
} from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import {
  selectAuthorizationStatus,
  selectCurrentUser,
} from './user-process.selectors';

describe('UserProcess selectors', () => {
  const offerTest: Offer = {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: ['Heating'],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    images: ['https://url-to-image/image.png'],
    maxAdults: 4,
    previewImage: 'https://url-to-image/image.png',
    children: 0,
  };
  const reviewTest: Review = {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  };
  const state = {
    [NameSpace.Data]: {
      offers: [offerTest],
      offer: null,
      reviews: [reviewTest],
      nearOffers: [offerTest],
      isOffersLoading: false,
      isOfferLoading: false,
      isPosted: false,
      favorites: [offerTest],
    },
    [NameSpace.App]: {
      currentSort: SORT_OPTIONS[0],
      city: CITIES[0],
      cardUnderMouse: undefined,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      currentUser: null,
    },
  };

  it('should return "authorizationStatus" from state', () => {
    const expected = AuthorizationStatus.Unknown;
    const result = selectAuthorizationStatus(state);
    expect(result).toEqual(expected);
  });

  it('should return isOffersLoading boolean status from state', () => {
    const expected = null;
    const result = selectCurrentUser(state);
    expect(result).toBe(expected);
  });
});
