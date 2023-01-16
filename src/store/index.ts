import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import homeReducer from "./modules/home";

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

const wrapper = createWrapper(() => store);
export default wrapper;

// Dispatch函数的类型
export type IAppDispatch = typeof store.dispatch;
// 根的state
export type IAppState = ReturnType<typeof store.getState>;
