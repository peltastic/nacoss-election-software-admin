import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import persistReducer from "redux-persist/lib/persistReducer";
import userSlice from "./slices/userSlice";
import { votersApi } from "./features/voters";
import { officeApi } from "./features/offices";
import { candidateApi } from "./features/candidate";
import { overviewApi } from "./features/overview";

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: {
    persistedState: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [votersApi.reducerPath]: votersApi.reducer,
    [officeApi.reducerPath]: officeApi.reducer,
    [candidateApi.reducerPath]: candidateApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      votersApi.middleware,
      officeApi.middleware,
      candidateApi.middleware,
      overviewApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
