import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index.js';
import { Category } from '../../interfaces/index';

// Define a type for the slice state
interface CategoriesInterface {
  data: Category[] | null,
}

// Define the initial state using that type
const initialState: CategoriesInterface = {
  data: null,
}

export const catergoriesSlice = createSlice({
  name: 'categories',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.data = action.payload
    },
  },
})

export const { setCategories } = catergoriesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategories = (state: RootState) => state.categories.data;

export default catergoriesSlice.reducer;