import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const API_BASE = 'https://gateway.marvel.com:443/v1/public/';
const API_KEY = 'apikey=f55b2898f2deb959f89d9f8262aadbb0';

//получение комиксов
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch(`${API_BASE}comics?limit=100&${API_KEY}`);

        const data = await response.json();

        return data.data.results;
    }
);

//получение перс.
export const fetchCharacters = createAsyncThunk(
    'character/fetchCharacters',
    async () => {
        const response = await fetch(`${API_BASE}characters?limit=100&${API_KEY}`);
        const data = await response.json();

        return data.data.results;
    }
);

const initialState = {
    comics: [],
    characters: [],
    searchRequest: '',

    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchRequest: (state, action) => {
            state.searchRequest = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //получение комиксов
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.comics = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = 'Comics loading error...';
            })

            //получение персонажей
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.loading = false;
                state.error = 'Character loading error...';
            })
    }
});

export const { setSearchRequest } = productsSlice.actions;

export default productsSlice.reducer;