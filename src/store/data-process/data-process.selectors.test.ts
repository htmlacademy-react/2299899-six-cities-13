import { describe } from 'vitest';
import {
  selectFilteredOffers,
  selectGroupedFavorites,
  selectIsOffersLoading,
  selectOffer,
  selectOffers,
  selectReviews,
  selectSortedOffers,
} from './data-process.selectors';
import {
  AuthorizationStatus,
  CITIES,
  NameSpace,
  SORT_OPTIONS,
} from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

describe('DataProcess selectors', () => {
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
      currentSort: SORT_OPTIONS[1],
      currentCity: CITIES[0],
      cardUnderMouse: undefined,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      currentUser: null,
    },
  };

  it('should return "offers" from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = selectOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return "isOffersLoading" from state', () => {
    const { isOffersLoading } = state[NameSpace.Data];
    const result = selectIsOffersLoading(state);
    expect(result).toBe(isOffersLoading);
  });

  it('should return "offer" from state', () => {
    const { offer } = state[NameSpace.Data];
    const result = selectOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return "isOfferLoading" from state', () => {
    const { isOfferLoading } = state[NameSpace.Data];
    const result = selectIsOffersLoading(state);
    expect(result).toBe(isOfferLoading);
  });

  it('should return "reviews" from state', () => {
    const { reviews } = state[NameSpace.Data];
    const result = selectReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return "nearOffers" from state', () => {
    const { nearOffers } = state[NameSpace.Data];
    const result = selectOffers(state);
    expect(result).toEqual(nearOffers);
  });

  it('should return "isPosted" from state', () => {
    const { isPosted } = state[NameSpace.Data];
    const result = selectIsOffersLoading(state);
    expect(result).toBe(isPosted);
  });

  it('should return "favorites" from state', () => {
    const { favorites } = state[NameSpace.Data];
    const result = selectOffers(state);
    expect(result).toEqual(favorites);
  });

  it('should return "filteredOffers" based on "offers" and "currentCity" from state', () => {
    const expected: Offer[] = [];
    const result = selectFilteredOffers(state);
    expect(result).toEqual(expected);
  });

  it('should return "sortedOffers" based on "filteredOffers" and "currentSort" from state', () => {
    const modifiedState = { ...state };
    state[NameSpace.App].currentCity = 'Amsterdam';
    const expected = [offerTest];
    const result = selectSortedOffers(modifiedState);
    expect(result).toEqual(expected);
  });

  it('should return "groupedOffers" based on "favorites" from state', () => {
    const expected = {
      Amsterdam: [offerTest],
      Brussels: [],
      Cologne: [],
      Dusseldorf: [],
      Hamburg: [],
      Paris: [],
    };
    const result = selectGroupedFavorites(state);
    expect(result).toEqual(expected);
  });
});
