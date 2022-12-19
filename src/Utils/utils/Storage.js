/*
 * @Author: your name
 * @Date: 2021-07-07 14:19:40
 * @LastEditTime: 2021-07-08 16:41:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapcoded:\study\React项目\react_cnode\src\utils\storage.js
 */

// 封装sessionStorage和localStorage
// sessionStorage和localStorage区别：
// sessionStorage 一次会话
// localStorage 永久

const Storage = {
  // session
  // 获取session
  getSession: (name) => {
    if (!name) {
      return false
    }
    return JSON.parse(window.sessionStorage.getItem(name))
  },
  // 设置session
  setSession: (name, value) => {
    if (!name) {
      return false
    }
    if (value !== 'String') {
      value = JSON.stringify(value)
    }
    window.sessionStorage.setItem(name, value)
  },
  // 删除session
  delSession: (name) => {
    if (!name) {
      return false
    }
    return window.sessionStorage.removeItem(name)
  },
  // localStorage
  getLocal: (name) => {
    if (!name) {
      return false
    }
    return JSON.parse(window.localStorage.getItem(name))
  },
  setLocal: (name, value) => {
    if (!name) {
      return false
    }
    if (value !== 'String') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
  },
  delLocal: (name) => {
    if (!name) {
      return false
    }
    return window.localStorage.removeItem(name)
  }
}

export default Storage