
const initialState = {
    fetchArr: []
}

const SET_ARR="SET_ARR"


export const fetchArrReducer = (state = initialState, action) => {

   switch (action.type) {

    case SET_ARR:
        return {fetchArr: [...action.payload]};

    default:
        return state
   }

}
export const setFetchArr = (Arr) => ({type: SET_ARR, payload: Arr})