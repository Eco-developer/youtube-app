import videosReducer  from '../features/videos/videosSlice';
import categoriesReducer from '../features/catergories/categoriesSlice';
import sidebarReducer from '../features/sidebarSlice/sidebarSlice';
import ErrorHomeReducer from '../features/errorHomeSlice/errorHomeSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    categories: categoriesReducer,
    sidebar: sidebarReducer,
    errorHome: ErrorHomeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch