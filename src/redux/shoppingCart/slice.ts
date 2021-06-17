import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
};

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/getShoppingCart',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`
        }
      }
    );
    return data.shoppingCartItems;
    // 返回的是一个 Promise 函数, createAsyncThunk 会自动生成
    // pending fulfilled rejected 三个 action
  }
);

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async (parameters: { jwt: any; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    );
    return data.shoppingCartItems;
    // 返回的是一个 Promise 函数, createAsyncThunk 会自动生成
    // pending fulfilled rejected 三个 action
  }
);

export const clearShoppingCartItem = createAsyncThunk(
  'shoppingCart/clearShoppingCartItem',
  async (parameters: { jwt: any; itemIds: number[] }, thunkAPI) => {
    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
        ','
      )})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    );
  }
);

export const checkout = createAsyncThunk(
  'shoppingCart/checkout',
  async (jwt: any, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`
        }
      }
    );
    return data;
    // 返回的是一个 Promise 函数, createAsyncThunk 会自动生成
    // pending fulfilled rejected 三个 action
  }
);

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart', // '命名空间 / action'
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type](state) {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addShoppingCartItem.pending.type](state) {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [clearShoppingCartItem.pending.type](state) {
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [clearShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [checkout.pending.type](state) {
      state.loading = true;
    },
    // checkout 返回当前订单的数据，数据处理在 orderSlice 中处理
    // 这里只情况购物车
    [checkout.fulfilled.type]: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [checkout.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
