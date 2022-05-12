import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu-slice";
import navbarReducer from "./navbar-slice"

const store = configureStore({
    reducer: {
        menu: menuReducer,
        navbar: navbarReducer
    }
});

export default store;