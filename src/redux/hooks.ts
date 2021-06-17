import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook // interface
} from 'react-redux';
import { RootState } from './store';

// 使用 interface 接口 TypedUseSelectorHook 将钩子 useSelector 重新定义

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// 套用 useSelector 并加上新的定义
// 防止组件和 store 深度绑定
