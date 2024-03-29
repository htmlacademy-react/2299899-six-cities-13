import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { UserData } from './user-data';
import { Offer } from './offer';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  currentUser: UserData | null;
};

export type AppProcess = {
  currentSort: string;
  currentCity: string;
  cardUnderMouse: string | undefined;
};

export type DataProcess = {
  offers: Offer[];
  offer: Offer | null;
  reviews: Review[];
  nearOffers: Offer[];
  isLoading: boolean;
  isReviewPosting: boolean;
  isReviewPosted: boolean | null;
  favorites: Offer[];
};
