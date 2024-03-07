import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define initial state for user slice
const initialState = {
  isLoading: false,
  error: "",
  userInfo: null,
  isLoggedIn: false,
  accessToken: null,
};

// Create an async thunk for login functionality
export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("data returned: ", data);
      return data;
    } catch (error) {
        console.log('catching error from api: ', error)
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

// Create user slice with reducers and extraReducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add a reducer for logout if needed (optional)
    logout: (state) => {
      state.isLoading = false;
      state.error = "";
      state.userInfo = null;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('action on fulfilled state: ', action)
        state.isLoading = false
        if(action.payload.success){
            state.userInfo= action.payload.userInfo,
            state.isLoggedIn= true,
            state.accessToken= action.payload.access_token
        }else{
            state.error = action.payload
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log('action on rejected state: ', action)
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = userSlice.actions; // Optional logout action
export default userSlice.reducer;
