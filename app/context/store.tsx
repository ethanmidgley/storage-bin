import { configureStore } from "@reduxjs/toolkit";
import { feedbackSlice } from "./feedback";

export const store = configureStore({
  reducer: { feedback: feedbackSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
