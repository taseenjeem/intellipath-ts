import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import userInfoReducer from "./slices/UserInfoSlice";
import editProfileInfoReducer from "./slices/profileInfoSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null); // Always resolves to null
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value); // Always resolves to the value passed
    },
    removeItem(_key: any) {
      return Promise.resolve(); // Always resolves with no action
    },
  };
};

// Determine storage type based on environment (window object availability)
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo"],
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  editProfileInfo: editProfileInfoReducer,
});

// Create a persisted reducer using the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific actions for serialization
      },
    }),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for using typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
