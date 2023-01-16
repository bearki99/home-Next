import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import homeReducer from "./modules/home";
import headerReducer from "@/components/header/store";
const store = configureStore({
  reducer: {
    home: homeReducer,
    header: headerReducer,
  },
});

const wrapper = createWrapper(() => store);
export default wrapper;

// Dispatch函数的类型
export type IAppDispatch = typeof store.dispatch;
// 根的state
export type IAppState = ReturnType<typeof store.getState>;
