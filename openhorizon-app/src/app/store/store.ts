import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import { placeApi } from "../../entities/place/api/placeApi";
import { userApi } from "../../entities/user/api/userApi";
import { userSlice } from "../../entities/user/store/userSlice";
import { favoritesApi } from "../../features/favorites/api/favoritesApi";
import { cityApi } from "../../entities/city/api/cityApi";
import { regionApi } from "../../entities/region/api/regionApi";
import { tagsApi } from "../../entities/tags/api/tagsApi";
import { filesApi } from "../../features/files/api/filesApi";
import { authApi } from "../../features/auth/api/authApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: persistReducer(
    { key: "authApi", storage },
    authApi.reducer
  ),
  [userApi.reducerPath]: persistReducer(
    { key: "userApi", storage },
    userApi.reducer
  ),
  [filesApi.reducerPath]: persistReducer(
    { key: "filesApi", storage },
    filesApi.reducer
  ),
  [favoritesApi.reducerPath]: persistReducer(
    { key: "favoritesApi", storage },
    favoritesApi.reducer
  ),
  [cityApi.reducerPath]: persistReducer(
    { key: "cityApi", storage },
    cityApi.reducer
  ),
  [regionApi.reducerPath]: persistReducer(
    { key: "regionApi", storage },
    regionApi.reducer
  ),
  [placeApi.reducerPath]: persistReducer(
    { key: "placeApi", storage },
    placeApi.reducer
  ),
  [tagsApi.reducerPath]: persistReducer(
    { key: "tagsApi", storage },
    tagsApi.reducer
  ),
  [userSlice.name]: persistReducer(
    {
      key: "user",
      storage,
      whitelist: ["token", "userId", "role"],
    },
    userSlice.reducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(favoritesApi.middleware)
      .concat(placeApi.middleware)
      .concat(regionApi.middleware)
      .concat(cityApi.middleware)
      .concat(tagsApi.middleware)
      .concat(filesApi.middleware)
      .concat(authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
