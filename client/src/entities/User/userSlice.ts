import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = 'client' | 'admin' | null;

interface UserState {
    userType: UserType;
}

const initialState: UserState = {
    userType: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserType(state, action: PayloadAction<UserType>) {
            state.userType = action.payload;
        },
    },
});

export const { setUserType } = userSlice.actions;
export default userSlice.reducer;