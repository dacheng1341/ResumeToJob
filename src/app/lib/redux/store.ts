import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "lib/redux/settingsSlice";
import resumeManagerReducer from "lib/redux/resumeManagerSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    resumeManager: resumeManagerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
