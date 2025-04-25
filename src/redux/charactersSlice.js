import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const API_BASE = 'https://gateway.marvel.com:443/v1/public/';
const API_KEY = 'apikey=f55b2898f2deb959f89d9f8262aadbb0';


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
    characters: [],
    searchRequest: '',

    loading: false,
    error: null,
};

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setSearchRequest: (state, action) => {
            state.searchRequest = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //персонаж по ID
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = action.payload;
            })

            .addCase(fetchCharacters.rejected, (state) => {
                state.loading = false;
                state.error = 'Character loading error...';
            })
    },
});

export const { setSearchRequest } = characterSlice.actions;

export default characterSlice.reducer;