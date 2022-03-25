import { configureStore } from '@reduxjs/toolkit'
import videosReducer  from '../features/videos/videosSlice';
import categoriesReducer from '../features/catergories/categoriesSlice';
import sidebarReducer from '../features/sidebarSlice/sidebarSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    categories: categoriesReducer,
    sidebar: sidebarReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch