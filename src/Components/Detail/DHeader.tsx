import React from "react";
import { useNavigate } from "react-router-dom";

const DHeader = (props: any) => {
  // 路由操作
  const navigate = useNavigate();
  // 返回上一页
  const goBack = () => {
    navigate(-1);
  };
  // {`h_con`}
  return (
    <div className="detailHeader">
      <span
        className="left ct "
        onClick={() => {
          goBack();
        }}
      >
        <i className="iconfont icon-zuoce fs24"></i>
      </span>
      <div className={`h_con ${props.isfix}`}>
        <div className="topFix">
          <span className="img">
            <img src={props.auther?.avatar_url} alt="" />
          </span>
          <span className="txt">{props.auther?.loginname}</span>
        </div>
        <span className="gz cur">
          {!props.auther?.isfollow ? "+ 收藏" : "已收藏"}
        </span>
      </div>
      <span className="right ct ">
        <i className="iconfont icon-gengduo fs24"></i>
      </span>
    </div>
  );
};

export default DHeader;
