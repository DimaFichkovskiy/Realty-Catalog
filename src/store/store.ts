import {configureStore} from "@reduxjs/toolkit";
import {categoriesSlice} from "./categories.store";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer
    }
});

// export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;