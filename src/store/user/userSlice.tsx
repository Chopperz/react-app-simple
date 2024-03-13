import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUserInterface } from "@interfaces/auth.interface.tsx";
import { NetworkStatus } from "../../components/shared/enums/networkStatus.tsx";

const initialState = {
  user: {
    id: -1,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
  } satisfies AuthUserInterface as AuthUserInterface,
  status: NetworkStatus.init,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<AuthUserInterface>) => {
      state.user = action.payload;
    },
    resetUser: () => initialState,
    onChangedStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { fetchUser, resetUser, onChangedStatus } = userSlice.actions;

export default userSlice.reducer;
