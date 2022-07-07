import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import citiesSlice from "./cities-slice";
import statusSlice from "./status-slice";
import weatherSlice from "./weather-slice";

const appReducer = combineReducers({
  status: statusSlice.reducer,
  weather: weatherSlice.reducer,
  cities: citiesSlice.reducer,
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
