import { NetworkStatus } from "../../components/shared/enums/networkStatus";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: {
    username: "",
    password: "",
  },
  status: NetworkStatus.init,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    onUserNameChanged: (state, action: PayloadAction<string>) => {
      state.input.username = action.payload;
    },
    onPasswordChanged: (state, action: PayloadAction<string>) => {
      state.input.password = action.payload;
    },
    onForgotPassword: () => {
      /* Todos something if an user has forgot a password */
    },
    onLoginPending: (state) => {
      state.status = NetworkStatus.loading;
    },
    onLoginError: (state) => {
      state.status = NetworkStatus.error;
    },
    onLoginSuccess: (state, action: PayloadAction<() => void>) => {
      state.status = NetworkStatus.success;
      action.payload();
    },
    onStatusChanged: (state, action: PayloadAction<NetworkStatus>) => {
      state.status = action.payload;
    },
  },
});

export const {
  onUserNameChanged,
  onPasswordChanged,
  onForgotPassword,
  onLoginPending,
  onLoginError,
  onLoginSuccess,
  onStatusChanged,
} = loginSlice.actions;

export default loginSlice.reducer;
