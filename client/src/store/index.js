import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu-slice";
import navbarReducer from "./navbar-slice";
import dropdownReducer from "./dropdown-slice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    navbar: navbarReducer,
    dropdown: dropdownReducer,
  },
});

export default store;
