import { configureStore, combineReducers } from "@reduxjs/toolkit";
import citiesSlice from "./cities-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loadingSlice from "./loading-slice";
import coordinatesSlice from "./coordinates-slice";
import statusSlice from "./status-slice";
import weatherSlice from "./weather-slice";

const appReducer = combineReducers({
  cities: citiesSlice.reducer,
  loading: loadingSlice.reducer,
  coordinates: coordinatesSlice.reducer,
  status: statusSlice.reducer,
  weather: weatherSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cities"],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
