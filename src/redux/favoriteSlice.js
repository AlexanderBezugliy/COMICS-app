// favoriteSlice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteItems: localStorage.getItem('favoriteItems') 
                    ? JSON.parse(localStorage.getItem('favoriteItems')) 
                    : [],

    loading: false,
    error: null,
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action) => {
            const existingCharacter = state.favoriteItems.find(i => i.id === action.payload.id);

            if (!existingCharacter) {
                state.favoriteItems.push(action.payload);
            }
        },

        removeFromFavorite: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter(i => i.id !== action.payload);
        },

        incQty: (state, action) => {
            const existingCharacter = state.favoriteItems.find(i => i.id === action.payload.id);

            if (existingCharacter) {
                existingCharacter.quantity += 1;
            }
        },

        decQty: (state, action) => {
            const existingCharacter = state.favoriteItems.find(i => i.id === action.payload);

            if (existingCharacter && existingCharacter.quantity > 1) {
                existingCharacter.quantity -= 1
            };
        },
    },
});

export const { addToFavorite, removeFromFavorite, incQty, decQty } = favoriteSlice.actions;

export default favoriteSlice.reducer;