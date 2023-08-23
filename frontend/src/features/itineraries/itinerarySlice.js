import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itineraryService from "./itineraryService";

const initialState = {
    itineraries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  
// Create new goal
export const createItinerary = createAsyncThunk('itineraries/create', async(itineraryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itineraryService.createItinerary(itineraryData, token)
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user itineraries 
export const getItineraries = createAsyncThunk('itineraries/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itineraryService.getItineraries(token)
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user itinerary
export const deleteItinerary = createAsyncThunk('itinerary/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itineraryService.deleteItinerary(id, token)
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update user itinerary
export const updateItinerary = createAsyncThunk('itinerary/update', async ({id, Data},thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await itineraryService.updateItinerary(id, Data, token)
  } catch (error) {
      const message =
      (error.response &&
      error.response.data &&
      error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createItinerary.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createItinerary.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.itineraries.push(action.payload)
        })
        .addCase(createItinerary.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getItineraries.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getItineraries.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.itineraries = action.payload
        })
        .addCase(getItineraries.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteItinerary.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteItinerary.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.itineraries = state.itineraries.filter(
            (itinerary) => itinerary._id !== action.payload.id
          )
        })
        .addCase(deleteItinerary.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(updateItinerary.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateItinerary.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.itineraries = state.itineraries.map(itinerary =>
            itinerary._id === action.payload._id ? action.payload : itinerary
          );
        })
        .addCase(updateItinerary.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })

export const { reset } = itinerarySlice.actions
export default itinerarySlice.reducer