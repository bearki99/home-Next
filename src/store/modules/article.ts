import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleById } from "@/service/article";
import { getAdvertisementById } from "@/service/article";
// import test from "@/assets/data/response.json";

export interface IArticleInitialState {
  author: IAuthorInitialState;
  comment_count: number;
  content: string;
  image?: string;
  label: string;
  like_count: number;
  time: string;
  theme: string;
  title: string;
  uid: string;
  view_count: number;
  id: string;
  related_articles: Array<Record<string, any>>;
}

export interface IArticleResponse {
  code: string;
  data: IArticleInitialState;
  msg: string;
}

export interface IAuthorInitialState {
  article_count: number;
  avatar: string;
  description: string;
  id: number;
  username: string;
}

export const getArticleByIdAction = createAsyncThunk(
  "article",
  async (id: string) => {
    let res;
    if (id.startsWith("art_")) {
      res = await getArticleById(parseInt(id.slice(id.indexOf("_") + 1)));
    } else if (id.startsWith("adv_")) {
      res = await getAdvertisementById(parseInt(id.slice(id.indexOf("_") + 1)));
    }
    // const res = test;
    return res.data;
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: {} as IArticleInitialState,
  reducers: {
    articleLoaded: (state, action) => {
      state = action.payload;
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getArticleByIdAction.fulfilled, (state, action) => {
      state = action.payload;
      return action.payload;
    });
  },
});

export const { articleLoaded } = articleSlice.actions;
export default articleSlice.reducer;
