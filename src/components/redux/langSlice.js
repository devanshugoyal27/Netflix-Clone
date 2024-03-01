import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "multilang",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});
export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
