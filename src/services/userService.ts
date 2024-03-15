import store from "@store/store";
import httpClient from "@services/httpService";
import { fetchUser, onChangedStatus } from "@store/user/userSlice.tsx";
import { NetworkStatus } from "../constants/enums/networkStatus";
import { AuthUserInterface } from "@interfaces/auth.interface.tsx";

export const userServices = {
  async getMe() {
    store.dispatch(onChangedStatus(NetworkStatus.loading));

    const token = localStorage.getItem("user-token");

    const res = await httpClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
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
