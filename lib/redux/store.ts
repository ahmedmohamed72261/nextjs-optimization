import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import aboutReducer from "./slices/about-slice"

export const makeStore = () =>
  configureStore({
    reducer: {
      about: aboutReducer,
      // Add other reducers here as needed
    },
    devTools: process.env.NODE_ENV !== "production",
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const wrapper = createWrapper<AppStore>(makeStore)
