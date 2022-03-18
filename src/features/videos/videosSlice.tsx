import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index.js';
import { Video } from '../../interfaces/index';

// Define a type for the slice state
interface VideoState {
  data: Video[] | null,
}

// Define the initial state using that type
const initialState: VideoState = {
  data: null,
}

export const videosSlice = createSlice({
  name: 'videos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.data = action.payload
    },
  },
})

export const { setVideos } = videosSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectvideos = (state: RootState) => state.videos.data

export default videosSlice.reducer