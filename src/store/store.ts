// import type {PreloadedState} from "@reduxjs/toolkit";
import {configureStore} from "@reduxjs/toolkit";
import {categoriesSlice} from "./categories.store";

// const rootReducer = combineReducers({
//     categories: categoriesSlice.reducer,
// })

export const store = configureStore({
    // return configureStore({
    //     reducer: rootReducer
    // })
    reducer: {
        categories: categoriesSlice.reducer
    }
});
console.log('store');
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.getState>;
// export type AppDispatch = AppStore['dispatch']