import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: localStorage.getItem('darkMode') === 'false' || true,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
    },
  }
})

export const { toggleDarkMode } = themeSlice.actions
export default themeSlice.reducer