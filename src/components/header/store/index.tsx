import { getAdvertiseData } from "@/components/advertise/service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getHeaderTags, getOriginHeader } from "../service";
export interface IHomeColumn {
  id: number;
  labels: ISubTags[];
  name: string;
}

export interface ISubTags {
  id: number;
  label: string;
}
export interface IHomeHeader {
  homeTags: IHomeColumn[];
  currentsubTags: ISubTags[];
  initialIndex: number;
  initialSubIndex: number;
  isHide: boolean;
  showAll: boolean;
  isDark: boolean;
  advertiseContent: any;
  originHeader: any;
}
export const getHeaderDataAction = createAsyncThunk("header", async () => {
  const res = await getHeaderTags();
  return res.data.list;
});
export const getAdvertiseDataAction = createAsyncThunk(
  "advertise",
  async () => {
    const res = await getAdvertiseData();
    return res.data.list;
  }
);
export const getOriginHeaderDataAction = createAsyncThunk(
  "originHeader",
  async () => {
    const res = await getOriginHeader();
    return res;
  }
);
const headerSlice = createSlice({
  name: "header",
  initialState: {
    originHeader: [],
    homeTags: [],
    currentsubTags: [],
    initialIndex: 0,
    initialSubIndex: 0,
    isHide: false,
    showAll: false,
    isDark: false,
    advertiseContent: [],
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
    changeIsDarkAction(state, { payload }) {
      state.isDark = payload;
    },
    changeAdvertiseContent(state, { payload }) {
      state.advertiseContent = payload;
    },
    changeOriginHeaderAction(state, { payload }) {
      state.originHeader = payload;
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
      })
      .addCase(getAdvertiseDataAction.fulfilled, (state, { payload }) => {
        state.advertiseContent = payload;
      })
      .addCase(getOriginHeaderDataAction.fulfilled, (state, { payload }) => {
        state.originHeader = payload;
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
  changeIsDarkAction,
  changeAdvertiseContent,
  changeOriginHeaderAction
} = headerSlice.actions;
export default headerSlice.reducer;
