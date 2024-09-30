import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import reduxStorage from "./storage";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage: reduxStorage,
    whitelist: ["game"]
}

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST]
        }
    })
})

export const persistor = persistStore(store)