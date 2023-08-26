import { beforeEach, describe } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeAuthData,
  makeFakeOffer,
  makeFakeReview,
  makeFakeState,
} from '../utils/test-mocks';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { APIRoute, NameSpace } from '../const';
import {
  checkAuthAction,
  fetchFavoritesAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  loginAction,
  logoutAction,
  postNewCommentAction,
  toggleFavoriteAction,
} from './api-actions';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';
import { datatype } from 'faker';

describe('Api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const state = makeFakeState();
  const authDataTest = makeFakeAuthData();

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled" with server response 200', async () => {
      const mockData = state[NameSpace.Data].offers;
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockData);

      await store.dispatch(fetchOffersAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" with server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled" with server response 200', async () => {
      const mockData = state[NameSpace.Data].offer;
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/{offerId}`)
        .reply(200, mockData);

      await store.dispatch(fetchOfferAction('{offerId}'));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOfferAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
      expect(fetchOfferActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOffersAction.rejected" with server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/{offerId}`).reply(404);

      await store.dispatch(fetchOfferAction('{offerId}'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled" with server response 200', async () => {
      const mockData = state[NameSpace.Data].reviews;
      mockAxiosAdapter
        .onGet(`${APIRoute.Reviews}/{offerId}`)
        .reply(200, mockData);

      await store.dispatch(fetchReviewsAction('{offerId}'));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviewsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
      expect(fetchReviewsActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" with server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/{offerId}`).reply(404);

      await store.dispatch(fetchReviewsAction('{offerId}'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearOffersAction', () => {
    it('should dispatch "fetchNearOffersAction.pending", "fetchNearOffersAction.fulfilled" with server response 200', async () => {
      const mockData = state[NameSpace.Data].nearOffers;
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/{offerId}/nearby`)
        .reply(200, mockData);

      await store.dispatch(fetchNearOffersAction('{offerId}'));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearOffersActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchNearOffersAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchNearOffersAction.pending.type,
        fetchNearOffersAction.fulfilled.type,
      ]);
      expect(fetchNearOffersActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchNearOffersAction.pending", "fetchNearOffersAction.rejected" with server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/{offerId}/nearby`).reply(404);

      await store.dispatch(fetchNearOffersAction('{offerId}'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearOffersAction.pending.type,
        fetchNearOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled" with server response 200', async () => {
      const mockData = state[NameSpace.Data].favorites;
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockData);

      await store.dispatch(fetchFavoritesAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFavoritesAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" with server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(401);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('toggleFavoriteAction', () => {
    const mockData = makeFakeOffer();
    const serverReplyTest = {
      ...mockData,
      isFavorite: !mockData.isFavorite,
    };
    const favoriteStatus = Number(serverReplyTest.isFavorite);
    const mockRequest = {
      offerId: '{offerId}',
      status: favoriteStatus,
    };

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.fulfilled",  when server response 200', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/{offerId}/${favoriteStatus}`)
        .reply(200, serverReplyTest);

      await store.dispatch(toggleFavoriteAction(mockRequest));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const toggleFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof toggleFavoriteAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.fulfilled.type,
      ]);
      expect(toggleFavoriteActionFulfilled.payload).toEqual(serverReplyTest);
    });

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.fulfilled",  when server response 201', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/{offerId}/${favoriteStatus}`)
        .reply(201, serverReplyTest);

      await store.dispatch(toggleFavoriteAction(mockRequest));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const toggleFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof toggleFavoriteAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.fulfilled.type,
      ]);
      expect(toggleFavoriteActionFulfilled.payload).toEqual(serverReplyTest);
    });

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.rejected" with server response 400', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/{offerId}/${favoriteStatus}`)
        .reply(400);

      await store.dispatch(toggleFavoriteAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.rejected.type,
      ]);
    });

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.rejected" with server response 401', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/{offerId}/${favoriteStatus}`)
        .reply(401);

      await store.dispatch(toggleFavoriteAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.rejected.type,
      ]);
    });

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.rejected" with server response 404', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/{offerId}/${favoriteStatus}`)
        .reply(404);

      await store.dispatch(toggleFavoriteAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.rejected.type,
      ]);
    });

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.rejected" with server response 409', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/{offerId}/${favoriteStatus}`)
        .reply(409);

      await store.dispatch(toggleFavoriteAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending", "checkAuthAction.fulfilled" with server response 200"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending", "checkAuthAction.rejected" with server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "checkAuthAction.pending", "fetchOffersAction.pending", "fetchFavoritesAction.pending", "redirectToRoute", "loginAction.fulfilled",  when server response 200', async () => {
      const serverReplyTest = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, serverReplyTest);

      await store.dispatch(loginAction(authDataTest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        checkAuthAction.pending.type,
        fetchOffersAction.pending.type,
        fetchFavoritesAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the recieved token', async () => {
      const serverReplyTest = { token: 'topSecret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, serverReplyTest);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(authDataTest));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(serverReplyTest.token);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected",  when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(authDataTest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "fetchOffersAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        fetchOffersAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should call "dropToken" once with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('postNewCommentAction', () => {
    const serverReplyTest = makeFakeReview();
    const mockRequest = {
      offerId: '{offerId}',
      comment: serverReplyTest.comment,
      rating: datatype.number({ min: 1, max: 5 }),
    };

    it('should dispatch "postNewCommentAction.pending", "postNewCommentAction.fulfilled",  when server response 201', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Reviews}/{offerId}`)
        .reply(201, serverReplyTest);

      await store.dispatch(postNewCommentAction(mockRequest));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postNewCommentActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof postNewCommentAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        postNewCommentAction.pending.type,
        postNewCommentAction.fulfilled.type,
      ]);
      expect(postNewCommentActionFulfilled.payload).toEqual(serverReplyTest);
    });

    it('should dispatch "postNewCommentAction.pending", "postNewCommentAction.rejected" with server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/{offerId}`).reply(400);

      await store.dispatch(postNewCommentAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postNewCommentAction.pending.type,
        postNewCommentAction.rejected.type,
      ]);
    });

    it('should dispatch "postNewCommentAction.pending", "postNewCommentAction.rejected" with server response 401', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/{offerId}`).reply(401);

      await store.dispatch(postNewCommentAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postNewCommentAction.pending.type,
        postNewCommentAction.rejected.type,
      ]);
    });

    it('should dispatch "postNewCommentAction.pending", "postNewCommentAction.rejected" with server response 404', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/{offerId}`).reply(404);

      await store.dispatch(postNewCommentAction(mockRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postNewCommentAction.pending.type,
        postNewCommentAction.rejected.type,
      ]);
    });
  });
});
