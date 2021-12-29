import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
};

export const signIn = createAsyncThunk(
  'user/signIn',
  async (paramaters: { email: string; password: string }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
      email: paramaters.email,
      password: paramaters.password
    });
    return data.token;
  }
);

// 返回的是一个 Promise 函数, createAsyncThunk 会自动生成
// pending fulfilled rejected 三个 action
// 直接通过 signIn.pending 这样对象的形式访问

export const UserSlice = createSlice({
  name: 'user', // '命名空间 / action'
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: {
    [signIn.pending.type](state) {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
