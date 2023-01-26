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
  isHide: boolean;
  showAll: boolean;
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
    isHide: false,
    showAll: false,
  } as IHomeHeader,
  reducers: {
    changeIsHideAction(state, { payload }) {
      state.isHide = payload;
    },
    changeShowAllAction(state, { payload }) {
      state.showAll = payload;
    },
  },
  extraReducers(builder) {
    // HYDRATE操作，保证服务器端和客户端的数据一致性
    builder.addCase(HYDRATE, (state, action: any) => {
      // state -> initialState
      // action, payload -> rootState
      return {
        ...state,
        ...action.payload.header,
      };
    });
  },
});
export const {
  changeIsHideAction,
  changeShowAllAction,
} = headerSlice.actions;
export default headerSlice.reducer;
