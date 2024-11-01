import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    id: string;
    phone: string;
    street: string;
    home: string;
    date: string;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'dateCreated'>>) => {
            const newOrder = {
                ...action.payload,
                id: Math.random().toString(36).substring(2, 9),
                dateCreated: new Date().toLocaleString(),
            };
            state.orders.push(newOrder);
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
    },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;