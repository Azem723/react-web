import {
  CHANGE_LANGUAGE,
  ADD_LANGUAGE,
  languageActionTypes
} from './languageActions';

import i18n from 'i18next';

export interface languageState {
  language: 'en' | 'zh';
  languageList: { name: string; code: string }[];
}

const defaultState: languageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' }
  ]
};

// ES6 语法，函数默认参数：
// state 是 immutable 需要用展开操作符(...)创建新对象
// 用新对象替换数据，并销毁旧数据
// eslint-disable-next-line
export default (state = defaultState, action: languageActionTypes) => {
  // (previousState,action)
  // console.log(state, action);
  switch (action.type) {
    case CHANGE_LANGUAGE: // 避免在 case 中直接输入字符串
      i18n.changeLanguage(action.payload); // 不标准的处理，会产生副作用 redux 中应该是纯函数
      return { ...state, language: action.payload }; // ...展开操作符，表示只修改 language 其余不变
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload]
      };
    default:
      return state;
  }

  /** 
  if (action.type === 'change_language') {
    const newState = { ...state, language: action.payload };
    return newState;
  }
  if (action.type === 'add_language') {
    const newState = {
      ...state,
      languageList: [...state.languageList, action.payload]
    };
    return newState;
  }
  return state;
  */
};
