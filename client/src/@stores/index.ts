import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@entities/User/userSlice';
import orderReducer from '@entities/Order/orderSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;