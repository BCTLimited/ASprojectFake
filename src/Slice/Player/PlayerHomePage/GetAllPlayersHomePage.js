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
    filteredPlayersData: null,
    filteredClubPlayerData: null,
    recommendedPlayersData: null,
    topRatedPlayersData: null
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

  export const GetRecommendedApi = createAsyncThunk(
    "getRecommendedApi/userGetRecommendedApi",
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
        .get('players/recommend')
        .then(async (response) => {
            // console.log('recommended Players ',response.data)
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

  export const GetTopRatedPlayersApi = createAsyncThunk(
    "getTopRatedPlayersApi/userGetTopRatedPlayersApi",
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
        .get('players/top-rated')
        .then(async (response) => {
            console.log('top-rated Players ',response.data)
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
        .get('advance-search', {params: data})
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

  export const FilteredClubPlayerApi = createAsyncThunk(
    "filteredClubPlayerApi/userFilteredClubPlayerApi",
    async (details, { rejectWithValue }) => {
        console.log(details)
    
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .get("search-by-club-player",{params: details})
        .then(async (response) => {
            console.log('filtered club ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          // console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );


  export const GetAllPlayersHomePage = createSlice({
    name: "GetAllPlayersHomePage",
    initialState,
    reducers: {
      reset: (state) => {
        Object.assign(state, initialState);
      }
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
      .addCase(GetTopRatedPlayersApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetTopRatedPlayersApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.topRatedPlayersData = action.payload;        
      })
      .addCase(GetTopRatedPlayersApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetRecommendedApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetRecommendedApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.recommendedPlayersData = action.payload;        
      })
      .addCase(GetRecommendedApi.rejected, (state, action) => {
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
      .addCase(FilteredClubPlayerApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(FilteredClubPlayerApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.filteredClubPlayerData = action.payload;        
      })
      .addCase(FilteredClubPlayerApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetAllPlayersHomePage.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetAllPlayersHomePage;
  export default GetAllPlayersHomePage.reducer;
  