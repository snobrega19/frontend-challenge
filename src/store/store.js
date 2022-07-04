import { configureStore, combineReducers } from "@reduxjs/toolkit";
import weatherSlice from "./weather-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loadingSlice from "./loading-slice";
import forecastWeatherSlice from "./forecast-weather-slice";

const appReducer = combineReducers({
  weather: weatherSlice.reducer,
  loading: loadingSlice.reducer,
  forecast: forecastWeatherSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["weather"],
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
