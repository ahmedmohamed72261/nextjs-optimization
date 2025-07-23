import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  const response = await fetch("https://wiz-deploy.onrender.com/about-us-page")
  return response.json()
})

interface AboutState {
  about: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AboutState = {
  about: null,
  status: "idle",
  error: null,
}

const aboutSlice = createSlice({
  name: "about",
  initialState,
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
        state.error = action.error.message || null
      })
  },
})

export default aboutSlice.reducer