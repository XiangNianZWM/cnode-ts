// App 全局共享对象
import { createContext } from "react";

// 创建token弹窗共享对象
export const AppContext = createContext({});
// 常量
export const UPDATE_STATUS = "UPDATE_STATUS"

// 创建弹窗共享函数
export const reducer = (state: boolean, action: any): any => {
  switch (action.type) {
    case UPDATE_STATUS:
      return action.status
    default:
      return state;
  }
};
