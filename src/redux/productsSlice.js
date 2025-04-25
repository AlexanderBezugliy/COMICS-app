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

    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
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
            // ========== один комікс ==========
            // .addCase(fetchComicById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            //     state.selectedComic = null;
            // })

            // .addCase(fetchComicById.fulfilled, (state, action) => {
            //     state.selectedComic = action.payload;
            //     state.loading = false;
            // })

            // .addCase(fetchComicById.rejected, (state) => {
            //     state.loading = false;
            //     state.error = 'Error loading comic...';
            // });
    }
});

// export const { toggleCart } = productsSlice.actions;

export default productsSlice.reducer;