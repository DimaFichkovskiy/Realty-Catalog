import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface Category {
    id: string;
    displayName: string;
}

interface CategoriesState {
    list: Category[];
    status: "idle" | "loading" | "succeeded" | "error"
    error?: string
}

const allCategories: Category = {
    id: "",
    displayName: "All categories"
}

const initialState: CategoriesState = {
    list: [allCategories],
    status: "idle",
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loadCategories.pending, (state,) => {
                state.status = "loading";
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.list = [allCategories, ...action.payload.map(transformCategory)]
            })
            .addCase(loadCategories.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message
            })
    }
})


export const selectAllCategory = (state: RootState) => state.categories.list

export const loadCategories = createAsyncThunk("categories/load", async () => {
    const res = await fetch("http://0.0.0.0:8000/realty/categories")
    return res.json()
})

function transformCategory(category: string): Category {
    return {
        id: category,
        displayName: category.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
    }
}