import React, { useEffect, useReducer, useState } from "react";
// 顶部
import Header from "../../Components/Header/Header";
// 中间tab卡
import IndexMenu from "../../Components/Index/IndexMenu";
// 中间列表
import IndexList from "../../Components/Index/IndexList";
// 加载
import Loading from "../../Components/Public/Loading";
// 共享
// 父传子
import { IndexContext, reducer, ListContext } from "./IndexContext";

// 接口
import { ITopics, IResponse } from "../../Server/type.d";
import { getTopics } from "../../Server/api";

// 请求
const Index = (props: any) => {
  // 首页内容
  // loading是否显示
  const [isLoading, setLoading] = useState<boolean>(false);
  // tab
  const [tabName] = useState<string>("all");
  // 首页内容
  const [listData, setListData] = useState<any>([]);
  // tab共享
  const [store, dispatch] = useReducer<any>(reducer, tabName);
  // 请求首页数据
  const getTopicsData = async (params: ITopics) => {
    setLoading(true);
    let res: IResponse = await getTopics(params);
    if (res) {
      setTimeout(() => {
        setLoading(false);
        setListData(res);
      }, 3000);
    }
  };
  useEffect(() => {
    getTopicsData({
      page: 1,
      tab: store,
      limit: 30,
    });
  }, [store]);
  return (
    <div className="main">
      <IndexContext.Provider value={{ store, dispatch }}>
        <Header />
        <IndexMenu />
        <div className="content">
          <ul className="listLi">
            {isLoading ? (
              <Loading />
            ) : (
              <ListContext.Provider value={{ store: listData }}>
                <IndexList />
              </ListContext.Provider>
            )}
          </ul>
        </div>
      </IndexContext.Provider>
    </div>
  );
};

export default Index;
