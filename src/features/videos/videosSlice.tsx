import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index.js';

// Define a type for the slice state
interface VideoState {
  value: string
}

// Define the initial state using that type
const initialState: VideoState = {
  value: 'video',
}

export const videoSlice = createSlice({
  name: 'video',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setVideo: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setVideo } = videoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.video.value

export default videoSlice.reducer