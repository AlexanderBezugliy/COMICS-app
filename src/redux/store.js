import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice';
import charactersReducer from './charactersSlice';
import favoriteReducer from './favoriteSlice';


const store = configureStore({
    reducer: {
       products: productsReducer,
       characters: charactersReducer,
       favorite: favoriteReducer,
    }
});

export default store;