import React, {useContext} from "react";

// 共享
import { CollectContext } from '../../Store/Collect/CollectContext'

// 工具函数
import { transTime } from "../../Utils/utils/utils";

// router
import { Link } from "react-router-dom";

const ArticleList = (props: any) => {
  const datajson = useContext<any>(CollectContext)
  console.log(datajson)
  return (
    <>
    {datajson?.map((item: any, index: any) => {
      return (
        <div className="liItem" key = {index}>
          <Link to = {{pathname: `/detail/${item.id}`}}>
            <h5>
              {item && item.title}
            </h5>
            <p>{item.visit_count} 点赞 · {item.reply_count} 评论 · {transTime(item?.create_at)}</p>
          </Link>
        </div>
      )
    })}
    </>
  );
};

export default ArticleList;
