import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import userSlice from "./user/userSlice";
import loginSlice from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
