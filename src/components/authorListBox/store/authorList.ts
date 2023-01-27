import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IAuthor } from "@/assets/interface/author";
import { getAuthorListApi } from "@/service/request";

export interface IAuthorListInitialState {
  authors?: Array<IAuthor>;
}
export const getAuthorsAction = createAsyncThunk("authorList", async () => {
  const res = await getAuthorListApi();

  // mock与实际api结构不一致
  return res.data.list ? res.data.list : res.data;
});

const authorList = createSlice({
  name: "authorList",
  initialState: {
    authors: [],
  } as IAuthorListInitialState,
  reducers: {
  },
  extraReducers(builder) {
    // HYDRATE操作，保证服务器端和客户端的数据一致性
    builder.addCase(HYDRATE, (state, action: any) => {
      // state -> initialState
      // action, payload -> rootState
      return {
        ...state,
        ...action.payload.authorList,
      };
    })
      .addCase(getAuthorsAction.fulfilled, (state, { payload }) => {
        state.authors = payload;
      });
  },
});

// export const { } = authorList.actions;

export default authorList.reducer;
