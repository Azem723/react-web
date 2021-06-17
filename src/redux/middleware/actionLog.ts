// redux中间件公式：
// const  middleware = (store) => (next) => (action) => { }
import { Middleware } from 'redux'; // 中间件的返回类型

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log('state 当前', store.getState());
  console.log('fire action', action);
  next(action);
  console.log('state 更新', store.getState());
};
