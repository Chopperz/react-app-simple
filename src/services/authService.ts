import { AxiosResponse } from "axios";
import AxiosInstance from "@components/axios/axios.tsx";
import store from "@store/store";

import {
  onLoginPending,
  onLoginSuccess,
  onLoginError,
} from "@store/slices/loginSlice.tsx";
import { resetUser } from "@store/user/userSlice.tsx";

interface AuthServiceType {
  username: string;
  password: string;
  onHomeNavigator: () => void;
}

export const authService = {
  async login({ username, password, onHomeNavigator }: AuthServiceType) {
    store.dispatch(onLoginPending());

    const userBody = JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 60,
    });
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res: AxiosResponse<any, any> = await AxiosInstance.post(
      "/auth/login",
      userBody,
      customConfig
    );

    if (res.status == 200) {
      localStorage.setItem("user-token", res.data["token"]);
      store.dispatch(onLoginSuccess(onHomeNavigator));
    } else {
      store.dispatch(onLoginError());
    }
  },

  async logout() {
    store.dispatch(resetUser());
  },
};
