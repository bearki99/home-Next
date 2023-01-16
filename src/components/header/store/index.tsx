import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getHeaderTags } from "../service";
interface IHomeHeader {
  homeTags: any[];
  subTags: any[];
  initialIndex: number;
  initialSubIndex: number;
}
export const getHeaderDataAction = createAsyncThunk("header", async () => {
  const res = await getHeaderTags();
  return res;
});
const headerSlice = createSlice({
  name: "header",
  initialState: {
    homeTags: [],
    subTags: [],
    initialIndex: 0,
    initialSubIndex: 0,
  } as IHomeHeader,
  reducers: {
    changehomeTagsAction(state, { payload }) {
      state.homeTags = payload;
    },
    changesubTagsAction(state, { payload }) {
      state.subTags = payload;
    },
    changeinitialIndexAction(state, { payload }) {
      state.initialIndex = payload;
    },
    changeinitialSubIndexAction(state, { payload }) {
      state.initialSubIndex = payload;
    },
  },
  extraReducers(builder) {
    // HYDRATE操作，保证服务器端和客户端的数据一致性
    builder
      .addCase(HYDRATE, (state, action: any) => {
        // state -> initialState
        // action, payload -> rootState
        return {
          ...state,
          ...action.payload.header,
        };
      })
      .addCase(getHeaderDataAction.fulfilled, (state, { payload }) => {
        state.homeTags = payload;
      });
  },
});
export const {
  changehomeTagsAction,
  changesubTagsAction,
  changeinitialIndexAction,
  changeinitialSubIndexAction,
} = headerSlice.actions;
export default headerSlice.reducer;
