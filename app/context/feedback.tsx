import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FeedbackState = {
  message: string;
  description: string;
  status: "success" | "error" | "info";
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {} as FeedbackState,
  reducers: {
    display: (state, action: PayloadAction<FeedbackState>) => {},
  },
});

export const { display } = feedbackSlice.actions;
export default feedbackSlice.reducer;
