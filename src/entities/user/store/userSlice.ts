import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "../models/userRole";
import { RootState } from "../../../app/store/store";

type AuthTokens = {
  token: string | null;
};

type UserState = AuthTokens & {
  token: string | null;
  userId: string | null;
  role: string | null;
};

const initialState: UserState = {
  token: null,
  userId: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },

    updateTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.token = action.payload.token;
    },

    logout: (state) => {
      Object.assign(state, initialState);
    },

    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { login, logout, updateTokens, setUserRole, setUserId } =
  userSlice.actions;

export const isAuthSelector = (state: RootState) => !!state.user.token;
export const accessTokenSelector = (state: RootState) => state.user.token;
export const userRoleSelector = (state: RootState) => state.user.role;
export const userIdSelector = (state: RootState) => state.user.userId;

export default userSlice.reducer;
