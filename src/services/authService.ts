import axios, { AxiosResponse } from "axios";
import store from "../store/store.tsx";

import {
  onLoginPending,
  onLoginSuccess,
  onLoginError,
} from "../store/slices/loginSlice";
import { resetUser } from "../store/user/userSlice.tsx";
import environment from "../environments/environment.tsx";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface AuthServiceType {
  username: string;
  password: string;
  onHomeNavigator: () => void;
}

export const authService = {
  async login({ username, password, onHomeNavigator }: AuthServiceType) {
    store.dispatch(onLoginPending());

    const url = environment.MOCK_SERVICE_URL + "/auth/login";
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

    const res: AxiosResponse<any, any> = await axios.post(
      url,
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
