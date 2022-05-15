import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {userData:{}, ridesData:[], places_obj:{}, pastRidesData_arr:[],  upcomingRidesData_arr:[], all_city_names: []}
const apiDataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData(state, action) {
        state.userData = action.payload.userData;
        state.ridesData = action.payload.ridesData;
        state.places_obj = action.payload.places_obj;
        state.upcomingRidesData_arr = action.payload.upcomingRidesData_arr;
        state.pastRidesData_arr = action.payload.pastRidesData_arr;
        state.all_city_names = action.payload.all_city_names;
    }
  }
})

const store = configureStore({
    reducer: apiDataSlice.reducer
})

export const apiDataActions = apiDataSlice.actions
export default store