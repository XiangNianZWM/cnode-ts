import React, { useContext, useState } from "react";


// 全局展示登陆弹窗
import { AppContext, UPDATE_STATUS } from "../../pages/App/AppContext";

// 跳转页面
import { useNavigate  } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()

  // 登陆相关
  const { store, dispatch } = useContext<any>(AppContext)

  // 个人中心是否显示
  const [ isShow, setShow ] = useState<boolean>(false)

  console.log(store)
  // 用户是否登陆

  // 跳转页面
  const navigatorUrl = (url: string): void => {
    console.log(url)
    if (url === 'collect') {
      // 收藏
      navigate('/collect')
    } else if (url === 'logout') {
      // 可以退出
      localStorage.removeItem('userInfo')
      dispatch({
        type: UPDATE_STATUS,
        status: {
          islogin: false,
          visible: false
        }
      })
    }
    
  }

  return (
    <div className="header">
      <span className="logo mr20">
        <i className="iconfont icon-logo fs32 c1d71ef"></i>
      </span>
      <div className="search">
        <input type="text" placeholder="请输入关键字" />
        <i className="iconfont icon-search"></i>
      </div>
      <span className="fr">
        {
          !store.islogin ? 
          (
          <span className="user mr10" onClick = {() => dispatch({
            type: UPDATE_STATUS,
            status: {
              islogin: store.islogin,
              visible: true
            }
          })}>
            <i className="iconfont icon-yonghu1 fs24 c666"></i>
          </span>
          )
          : 
          (
          <div className = 'rightMenu'>
            <span className="menu" onClick = {() => setShow(!isShow)}>
              <i className="iconfont icon-gengduo fs24 c666"></i>
            </span>
            {
              isShow ? 
              (
                <ul>
                  <li onClick={() => navigatorUrl('collect')}>我的收藏</li>
                  <li>我的消息</li>
                  <li>关于我</li>
                  <li onClick = {() => navigatorUrl('logout')}>退出登陆</li>
                </ul>
              )
              :
              (
                ''
              )
            }
            
            
          </div>
          )
        }
      </span>
    </div>
  );
};

export default Header;
