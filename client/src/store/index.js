import { configureStore } from "@reduxjs/toolkit";
import { transactionAPI } from "../services/transaction";

export const store = configureStore({
    reducer: {
        [transactionAPI.reducerPath]: transactionAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(transactionAPI.middleware)
})