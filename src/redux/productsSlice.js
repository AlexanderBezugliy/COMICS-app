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

const initialState = {
    products: [],
    searchRequest: '',

    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchComicsRequest: (state, action) => {
            state.searchRequest = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setSearchComicsRequest } = productsSlice.actions;

export default productsSlice.reducer;