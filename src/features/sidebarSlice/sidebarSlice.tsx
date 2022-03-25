import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index.js';

// Define a type for the slice state
interface SidebarInterface {
    show: boolean,
    categoryId: string,
}

// Define the initial state using that type
const initialState: SidebarInterface = {
    show: false,
    categoryId: 'none',
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
        state.show = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
        state.categoryId = action.payload;
    }
  },
})

export const { setShowSidebar, setCategoryId } = sidebarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShow = (state: RootState) => state.sidebar.show;
export const selectId = (state: RootState) => state.sidebar.categoryId;

export default sidebarSlice.reducer;