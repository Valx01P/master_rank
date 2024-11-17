import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    api: {
      output: '',
      loading: false,
      error: false
    }
  },
  reducers: {
    updateLoading: (state, action) => {
      state.api.loading = action.payload.loading
    },
    updateOutput: (state, action) => {
      state.api.output = action.payload.output
    },
    updateError: (state, action) => {
      state.api.error = action.payload.error
    }
  }
})

export const { updateLoading, updateOutput, updateError } = apiSlice.actions
export default apiSlice.reducer