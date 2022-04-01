import { fetchArrReducer } from "./reducers/fetchArrReducer";
import {createStore, combineReducers} from 'redux'



 export const rootReducer = combineReducers({
    fetchArrReducer,
  });


  export const store = createStore(rootReducer)

  export type RootState = ReturnType<typeof rootReducer>