import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index.js';

// Define a type for the slice state
interface ErrorInterface {
    error: boolean,
}

// Define the initial state using that type
const initialState: ErrorInterface = {
    error: false,
}

export const errorHomeSlice = createSlice({
  name: 'errorHome',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setError: (state, action: PayloadAction<boolean>) => {
        state.error = action.payload;
    },
  },
})

export const { setError } = errorHomeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectError = (state: RootState) => state.errorHome.error;

export default errorHomeSlice.reducer;