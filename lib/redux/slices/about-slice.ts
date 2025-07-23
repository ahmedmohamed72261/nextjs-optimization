import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  const response = await fetch("https://wiz-deploy.onrender.com/about-us-page")
  return response.json()
})

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    about: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.about = action.payload
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default aboutSlice.reducer
