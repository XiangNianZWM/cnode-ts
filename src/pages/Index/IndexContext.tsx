import { createContext } from "react";

// 常量
export const UPDATE_TAG = "UPDATE_TAG";
// 创建首页tab共享对象
export const IndexContext = createContext({});
// 创建首页listdata数据对象
export const ListContext = createContext({});

// 创建首页reducer
export const reducer = (state: string, action: any) => {
  switch (action.type) {
    case UPDATE_TAG:
      return action.alis;
    default:
      return state;
  }
};
