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
            const existingCharacter = state.favoriteItems.find((item) => item.id === action.payload.id);

            if (!existingCharacter) {
                state.favoriteItems.push(action.payload);
            }
        },

        removeFromFavorite: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;