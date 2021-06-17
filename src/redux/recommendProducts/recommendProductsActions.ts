import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START'; // 正在调用推荐信息 api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  'FETCH_RECOMMEND_PRODUCTS_SUCCESS'; // 推荐信息 api 调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL'; // 推荐信息 api 调用失败

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}
interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}
interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductsAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction;

export const fetchRecommendProductStartActionCreator =
  (): FetchRecommendProductStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START
    };
  };

export const fetchRecommendProductSuccessActionCreator = (
  data
): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data
  };
};

export const fetchRecommendProductFailActionCreator = (
  error
): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error
  };
};

// thunk 可以返回一个函数，而不一定是一个 js 对象
// 在一个 thunk action 中可以完成一系列连续的 action 操作
// 并且可以处理异步逻辑
// 业务逻辑可以从 ui 层面剥离出来，移动到这里，代码分层会更清晰

// R 第一个参数，当前函数的返回值 类型：void
// S 第二个参数，Store 的 State， Store 的类型：RootState
// E 第三个参数, Extra 额外的参数
// A 第四个参数, Action，类型：RecommendProductsAction
// giveMeDataActionCreator 返回的不是一个对象，而是返回一个函数,函数的类型就是ThunkAction的类型
export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductsAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator());
    try {
      const { data } = await axios.get(
        'http://123.56.149.216:8080/api/productCollections'
      );
      dispatch(fetchRecommendProductSuccessActionCreator(data));
    } catch (error) {
      dispatch(fetchRecommendProductFailActionCreator(error));
    }
  };

/**
    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    }

    const thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;

    export default thunk;
*/
