import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";


interface ScriptState {
  script: string;
}

const initialState: ScriptState = {
  script: "",
};


const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    setScript: (state, action: PayloadAction<string>) => {
      state.script = action.payload;
    },
    clearScript: (state) => {
      state.script = "";
    },
  },
});


export const { setScript, clearScript } = scriptSlice.actions;


const store = configureStore({
  reducer: {
    script: scriptSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
