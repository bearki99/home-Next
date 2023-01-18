import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IArticleItem } from "@/assets/interface/article";
import { getArticleListApi } from "@/service/request";
import { IArticleListRequest } from "@/assets/interface/article";

export interface IArticleListInitialState {
  articles?: Array<IArticleItem>;
  activeType: string;
  curPage: string;
  curSize: string;
}
export const getArticlesAction = createAsyncThunk("articleList", async (data: IArticleListRequest) => {
  const res = await getArticleListApi(data);
  return res.data.list;
});
const articleList = createSlice({
  name: "articleList",
  initialState: {
    articles: [],
    activeType: "推荐",
    curPage: "1",
    curSize: "20",
  } as IArticleListInitialState,
  reducers: {
    changePageAction(state,{payload}) {
      state.curPage = payload;
    },
    changeActiveTypeAction(state, { payload }) {
      if (state.activeType !== payload) {
        state.activeType = payload;
        state.curPage = "1";
      }
    },
  },
  extraReducers(builder) {
    // HYDRATE操作，保证服务器端和客户端的数据一致性
    builder.addCase(HYDRATE, (state, action: any) => {
      // state -> initialState
      // action, payload -> rootState
      return {
        ...state,
        ...action.payload.articleList,
      };
    })
      .addCase(getArticlesAction.fulfilled, (state, { payload }) => {
        if(state.curPage==="1"){
          state.articles = payload;
        } else {
          state.articles = state.articles?.concat(payload);
        }
      });
  },
});

export const { changePageAction, changeActiveTypeAction } = articleList.actions;

export default articleList.reducer;