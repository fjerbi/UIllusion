import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

// Define the initial state
interface ScriptState {
  script: string;
}

const initialState: ScriptState = {
  script: "",
};

// Create a slice for the script state
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

// Export actions
export const { setScript, clearScript } = scriptSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    script: scriptSlice.reducer,
  },
});

// Infer types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
