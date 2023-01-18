import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IAppDispatch, IAppState } from "../index";
import { getArticleById } from "@/service/article";
export interface IArticleInitialState {
  author: IAuthorInitialState;
  comment_count: string;
  content: string;
  image?: string;
  label: string;
  like_count: string;
  time: string;
  title: string;
  uid: string;
  view_count: string;
  id: string;
  related_articles: Array<Record<string, any>>;
}

export interface IArticleResponse {
  code: string;
  data: IArticleInitialState;
  msg: string;
}

export interface IAuthorInitialState {
  article_count: string;
  avatar: string;
  description: string;
  uid: string;
  username: string;
}
// 外部的 thunk creator 函数
export const getArticle = async (id: string, dispatch: IAppDispatch) => {
  try {
    // thunk 内发起异步数据请求
    const res = await getArticleById(id);
    // 但数据响应完成后 dispatch 一个 action
    dispatch(articleLoaded(res.data));
  } catch (err) {
    // 如果过程出错，在这里处理
    console.log(err);
  }
};

const articleSlice = createSlice({
  name: "article",
  initialState: {} as IArticleInitialState,
  reducers: {
    articleLoaded: (state, action) => {
      return action.payload;
    },
  },
});

export const { articleLoaded } = articleSlice.actions;
export default articleSlice.reducer;
