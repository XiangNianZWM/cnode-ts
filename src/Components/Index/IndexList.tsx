import React, { useContext } from "react";
import { ListContext } from "../../pages/Index/IndexContext";
import { Link } from "react-router-dom";
// 工具函数
import { tabToChinaes, transTime } from "../../Utils/utils/utils";

const IndexList = () => {
  const { store } = useContext<any>(ListContext);
  return (
    <>
      {store?.map((item: any, index: number) => {
        return (
          <li key={index}>
            <Link to={{ pathname: `detail/${item.id}` }}>
              <h4 className="title">
                <span
                  className={`tag ${item.top ? "top" : ""}  ${
                    item.good ? "good" : ""
                  } `}
                >
                  {tabToChinaes(item.top, item.good, item.tab)}
                </span>
                <span className="nameInfo">
                  <i className="img">
                    <img
                      src={item?.author?.avatar_url}
                      alt={item?.author?.loginname}
                    />
                  </i>
                  <b className="name">{item?.author?.loginname}</b>
                </span>
                <span className="time">{transTime(item.create_at)}</span>
              </h4>
              <p className="descInfo">{item.title}</p>
              <h6 className="cell">
                <span className="readNum">
                  <i className="iconfont icon-yueduliang"></i>
                  {item.visit_count}
                </span>
                <span className="replyNum">
                  <i className="iconfont icon-pinglun3-copy"></i>
                  {item.reply_count}
                </span>
              </h6>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default IndexList;
