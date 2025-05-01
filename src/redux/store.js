import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice';
import favoriteReducer from './favoriteSlice';


const store = configureStore({
    reducer: {
       products: productsReducer,
       favorite: favoriteReducer,
    }
});

export default store;