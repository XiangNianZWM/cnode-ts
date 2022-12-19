import { useRoutes } from "react-router-dom";
import { routes } from "../../Router/index";
import React, { useReducer, useState } from "react";
import LoginDialog from "../../Components/Public/LoginDialog";

// 保存状态
import { isLogin } from '../../Utils/utils/utils'

// 共享数据
import { AppContext, reducer } from "./AppContext";

const App = () => {
  const elements = useRoutes(routes);
  return elements;
};

const Index = () => {

  // 获取登录态
  const [login] = useState(isLogin())
  console.log(login)

  // 弹窗默认是否开启
  const [ loginStoreInit ] = useState<any>({
    islogin: login?.id ? true : false,
    visible: false
  });
  // 弹窗状态共享出去
  const [store, dispatch] = useReducer<any>(reducer, loginStoreInit);
  return (
    <>
      <AppContext.Provider value={{store, dispatch}}>
        <App />
        <LoginDialog />
      </AppContext.Provider>
    </>
  );
};

export default Index;
