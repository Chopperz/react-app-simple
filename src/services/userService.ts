import axios from "axios";
import store from "../store/store.tsx";

import {
  fetchUser,
  resetUser,
  onChangedStatus,
} from "../store/user/userSlice.tsx";
import { NetworkStatus } from "@components/shared/enums/networkStatus.tsx";
import environment from "../environments/environment.tsx";
import { AuthUserInterface } from "@interfaces/auth.interface.tsx";

export const userServices = {
  async getMe() {
    const url = environment.MOCK_SERVICE_URL + "/auth/me";
    store.dispatch(onChangedStatus(NetworkStatus.loading));

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });

    if (res.status == 200) {
      const userData: AuthUserInterface = res.data;
      store.dispatch(
        onChangedStatus(NetworkStatus.success),
        fetchUser(userData)
      );
    } else {
      store.dispatch(onChangedStatus(NetworkStatus.error));
    }
  },
};
