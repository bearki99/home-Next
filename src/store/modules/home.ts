import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IHomeInitialState {
  counter: number;
}

const homeSlice = createSlice({
  name: "home",
  initialState: {
    counter: 10,
  } as IHomeInitialState,
  reducers: {
    incrementAction(state, { payload }) {
      state.counter = payload;
    },
  },
  extraReducers(builder) {
    // HYDRATE操作，保证服务器端和客户端的数据一致性
    builder.addCase(HYDRATE, (state, action: any) => {
      // state -> initialState
      // action, payload -> rootState
      return {
        ...state,
        ...action.payload.home,
      };
    });
  },
});

export const { incrementAction } = homeSlice.actions;

export default homeSlice.reducer;
