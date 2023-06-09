import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    gottenPlayerData: null,
    filteredPlayersData: null
  };

  export const GetPlayersApi = createAsyncThunk(
    "getPlayersApi/userGetPlayersApi",
    async (_, { rejectWithValue }) => {
        
    
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .get('players')
        .then(async (response) => {
            // console.log('gotten Players ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const FilteredPlayersApi = createAsyncThunk(
    "filteredPlayersApi/userFilteredPlayersApi",
    async (data, { rejectWithValue }) => {
        
    
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .get(`advance-search?min_age=${data?.min_age}&max_age=${data?.max_age}&country=${data?.country}&position=${data?.position}&min_price=${data?.min_price}&max_price=${data?.max_price}&height=${data?.height}&foot=${data?.foot}`)
        .then(async (response) => {
            console.log('filtered ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );


  export const GetAllPlayersHomePage = createSlice({
    name: "GetAllPlayersHomePage",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(GetPlayersApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetPlayersApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.gottenPlayerData = action.payload;        
      })
      .addCase(GetPlayersApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(FilteredPlayersApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(FilteredPlayersApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.filteredPlayersData = action.payload;        
      })
      .addCase(FilteredPlayersApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetAllPlayersHomePage.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetAllPlayersHomePage;
  export default GetAllPlayersHomePage.reducer;
  