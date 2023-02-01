import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IArticleItem } from "@/assets/interface/article";
import { getArticleListApi } from "@/service/request";
import { IArticleListRequest } from "@/assets/interface/article";

export interface IArticleListInitialState {
  articles?: Array<IArticleItem>;
  activeType: string;
  curPage: number;
  curSize: number;
  isLoading: boolean;
  label: string;
  subtab: string;
}
export const getArticlesAction = createAsyncThunk("articleList", async (data: IArticleListRequest) => {

  const res = await getArticleListApi(data);
  return res.data.list;
});
const articleList = createSlice({
  name: "articleList",
  initialState: {
    articles: [],

    activeType: "recommend",
    curPage: 1,
    curSize: 5,
    isLoading: false,
    label: "",
    subtab: ""
  } as IArticleListInitialState,
  reducers: {

    changePageAction(state) {
      state.curPage += 1;
    },
    changeActiveTypeAction(state, { payload }) {
      console.log(payload);
      if (state.activeType !== payload) {
        state.activeType = payload;
        state.curPage = 1;
      }
    },
    changeLabelAction(state, { payload }) {
      console.log(payload);
      if (state.label !== payload) {
        state.label = payload;
        state.curPage = 1;
      }
    },
    changeSubtabAction(state, { payload }) {
      if (state.subtab !== payload) {
        state.subtab = payload;
        state.curPage = 1;
      }
    },
    changeLoadingAction(state, { payload }) {
      console.log("loading", payload);
      state.isLoading = payload;

    },
    // removeArticleByIdAction(state, { payload }) {
    //   console.log('删除文章', payload)
    //   state.articles = state.articles?.filter(item => {
    //     return item.id !== payload
    //   })
    // }
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
        if (state.curPage === 1) {
          state.articles = payload;
        } else {
          state.articles = state.articles?.concat(payload);
        }
      });
  },
});


export const {
  changePageAction,
  changeActiveTypeAction,
  changeLoadingAction,
  changeLabelAction,
  changeSubtabAction, } = articleList.actions;

export default articleList.reducer;
