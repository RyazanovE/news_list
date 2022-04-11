import { INews } from '../../types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InitialState {
  fetchArr: INews[]
  isLoading: boolean,
  error: string,
}

const initialState: InitialState = {
  fetchArr: [],
  isLoading: true,
  error: '',
}

export const fetchArrReducer= createSlice({
  name: 'fetchArrReducer',
  initialState, 
  reducers: {
    usersFetching(state)  {
        state.isLoading = true

    },
    usersFetchingSuccess(state, action: PayloadAction<INews[]>)  {
        state.isLoading = false
        state.fetchArr = action.payload
    },
    usersFetchingAddSuccess(state, action: PayloadAction<INews[]>)  {
        state.isLoading = false
        state.fetchArr = [...state.fetchArr, ...action.payload]
    },
    usersFetchingError(state, action: PayloadAction<string>)  {
        state.isLoading = false
        state.error = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { usersFetching, usersFetchingSuccess,  usersFetchingError, usersFetchingAddSuccess} = fetchArrReducer.actions

export default fetchArrReducer.reducer