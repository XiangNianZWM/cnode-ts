import React from "react";
// 工具函数
import { transTime } from "../../Utils/utils/utils";
// 解析markdown
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const CommentList = (props: any) => {
    console.log(props)
  // 回复该用户

  return (
    <div className="commentList">
      <ul className="comUl">
        {props?.dataJson?.map((item: any, index: number): any => {
          return (
            <li key={index}>
              <span className="img">
                <img
                  src={item?.author?.avatar_url}
                  alt={item?.author?.loginname}
                />
              </span>
              <div className="txt">
                <h4>
                  {item?.author?.loginname}{" "}
                  <span className="time">{transTime(item.create_at)}</span>
                </h4>
                <div className="p">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {item.content}
                  </ReactMarkdown>
                </div>
                <div className="rightBtn">
                  <span className="thumbs">

                    <i className="iconfont icon-zan"></i>
                    {item?.ups?.length > 0 && item?.ups?.length}
                  </span>
                  <span className="comt" onClick = {() => {props.onGetChildItem(item)}}>
                    <i className="iconfont icon-pinglun3-copy"></i>
                  </span>
                </div>
                {/* <div className="toComt">
                  <ul className="tocUl">
                    <li>
                      <b>我是回复</b>:
                      沙发阿嘎嘎打个阿哥阿狗哥沙发阿嘎嘎打个阿哥阿狗哥沙发阿嘎嘎打个阿哥阿狗哥
                    </li>
                    <li>
                      <b>我是回复</b>: 沙发阿嘎嘎打个阿哥阿狗哥
                    </li>
                  </ul>
                  <span className="moreCom">全部14条回复{">"}</span>
                </div> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentList;
