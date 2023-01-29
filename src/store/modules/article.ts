import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleById } from "@/service/article";
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
  id: number;
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
  async (id: number) => {
    // const res = test;
    const res = await getArticleById(id);
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
