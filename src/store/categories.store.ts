import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Category {
    name_en: string;
    name_urk: string;
}


interface CategoriesState {
    categories: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    status: 'idle',
    error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('http://0.0.0.0:8000/realty/categories');
    return response.data.categories;
});

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch categories';
            });
    },
});

