import { configureStore, combineReducers } from "@reduxjs/toolkit";
import weatherSlice from "./weather-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loadingSlice from "./loading-slice";

const rootReducer = combineReducers({
  weather: weatherSlice.reducer,
  loading: loadingSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["weather"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
