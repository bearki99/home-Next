import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getHeaderTags } from "../service";
export interface IHomeHeader {
  homeTags: any[];
  currentsubTags: any[];
  initialIndex: number;
  initialSubIndex: number;
  isHide: boolean;
  showAll: boolean;
}
export const getHeaderDataAction = createAsyncThunk("header", async () => {
  const res = await getHeaderTags();
  return res.data.list;
});
const headerSlice = createSlice({
  name: "header",
  initialState: {
    homeTags: [],
    currentsubTags: [],
    initialIndex: 0,
    initialSubIndex: 0,
    isHide: false,
    showAll: false,
  } as IHomeHeader,
  reducers: {
    changehomeTagsAction(state, { payload }) {
      state.homeTags = payload;
    },
    changecurrentsubTagsAction(state, { payload }) {
      state.currentsubTags = payload;
    },
    changeinitialIndexAction(state, { payload }) {
      state.initialIndex = payload;
    },
    changeinitialSubIndexAction(state, { payload }) {
      state.initialSubIndex = payload;
    },
    changeIsHideAction(state, { payload }) {
      state.isHide = payload;
    },
    changeShowAllAction(state, { payload }) {
      state.showAll = payload;
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
  changecurrentsubTagsAction,
  changeinitialIndexAction,
  changeinitialSubIndexAction,
  changeIsHideAction,
  changeShowAllAction,
} = headerSlice.actions;
export default headerSlice.reducer;
