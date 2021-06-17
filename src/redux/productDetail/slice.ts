import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
};

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    );
    return data;
    // 返回的是一个 Promise 函数, createAsyncThunk 会自动生成
    // pending fulfilled rejected 三个 action
  }
);

export const productDetailSlice = createSlice({
  name: 'productDetail', // '命名空间 / action'
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   return { ...state, loading: true };
    //   state.loading = true
    // }
    // fetchStart(state) {
    //   state.loading = true;
    // },
    // fetchSuccess: (state, action) => {
    //   state.data = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    // fetchFail: (state, action: PayloadAction<string | null>) => {
    //   const ddd = action.payload;
    //   state.loading = false;
    //   state.error = action.payload;
    // }
  },
  extraReducers: {
    [getProductDetail.pending.type](state) {
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// export const getProductDetail = createAsyncThunk(
//   'productDetail/getProductDetail',
//   async (touristRouteId: string, thunkAPI) => {
//     thunkAPI.dispatch(productDetailSlice.actions.fetchStart());
//     try {
//       const { data } = await axios.get(
//         `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
//       );
//       thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
//     } catch (error) {
//       thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error.message));
//     }
//   }
// );
