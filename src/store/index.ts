import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import articleReducer from "./modules/article";
import articleListReducer from "@/components/articleListBox/store/articleList";
import authorListReducer from "@/components/authorListBox/store/authorList";
import headerReducer from "@/components/header/store";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    header: headerReducer,
    articleList: articleListReducer,
    authorList: authorListReducer,
  },
});

const wrapper = createWrapper(() => store);
export default wrapper;

// Dispatch函数的类型
export type IAppDispatch = typeof store.dispatch;
// 根的state
export type IAppState = ReturnType<typeof store.getState>;
