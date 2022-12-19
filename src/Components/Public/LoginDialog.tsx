// 登录弹窗
import React, { useContext, useState } from "react";
import { AppContext, UPDATE_STATUS } from "../../pages/App/AppContext";

// 登陆api
import { postLoginToken } from '../../Server/api'

import { ILoginToken } from '../../Server/type.d'

const LoginDialog = (props: any) => {
  // 拿到弹窗状态
  const { store, dispatch } = useContext<any>(AppContext);
  // 绑定默认值
  const [ inputValue, setInputValue ] = useState<string>('')

  // 用户登陆
  const loginUser = () => {
    if (!inputValue) {
      alert('token不能为空')
    } else {
      postLogin({accesstoken: inputValue})
    }
  }

  // 用户登陆
  const postLogin = async (params: ILoginToken): Promise<void> => {
    const result = await postLoginToken(params)
    console.log(result)
    if (result && result.success) {
      // 正确
      localStorage.setItem('userInfo', JSON.stringify({
        id: result?.id,
        loginname: result?.loginname,
        avatar_url: result?.avatar_url,
        accesstoken: inputValue
      }))

      // 登陆成功
      dispatch({
        type: UPDATE_STATUS,
        status: {
          islogin: true,
          visible: false
        },
      });
      // input设置默认值
      setInputValue('')

    }
  }

  return (
    <>
      {store.visible ? (
        <div className="loginDialog">
          <div className="bg"></div>
          <div className="login">
            <h4>
              请输入您的accessToken代码
              <span
                className="close"
                onClick={() => {
                  dispatch({
                    type: UPDATE_STATUS,
                    status: {
                      islogin: store.islogin,
                      visible: false
                    }
                  });
                }}
              >
                <i className="iconfont icon-guanbi"></i>
              </span>
            </h4>
            <p>
              <input type="text" placeholder="accessToken" value = {inputValue} onChange = { e => setInputValue(e.target.value)} />
            </p>
            <h6>
              如何获取 accessToken? 用户登录后，在设置页面可以看到自己的
              accessToken
            </h6>
            <button onClick = {() => loginUser()}>登录</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginDialog;
