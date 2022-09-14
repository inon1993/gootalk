import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "./menu-slice";
import settingsReducer from "./settings-slice"
import navbarReducer from "./navbar-slice";
import dropdownReducer from "./dropdown-slice";
import userReducer from "./user-slice";
import accessTokenReducer from "./access-token-slice"

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["accessToken"]
};

const rootReducer = combineReducers({
  menu: menuReducer,
  navbar: navbarReducer,
  dropdown: dropdownReducer,
  user: userReducer,
  accessToken: accessTokenReducer,
  settings: settingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)
