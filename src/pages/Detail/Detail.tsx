import React, { useRef, useEffect, useState, useContext } from "react";
// import { Link, Outlet, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

import { AppContext, UPDATE_STATUS } from "../../pages/App/AppContext";
// 工具函数
import { transTime, formatTime, isLogin } from "../../Utils/utils/utils";
// 头部
import DHeader from "../../Components/Detail/DHeader";
// 文章
// import ArticleList from "../../Components/Public/ArticleList";
// 评论
import CommentList from "../../Components/Detail/CommentList";
// 接口
import { ITopicsDetail, IResponse, ICollect, IReplies } from "../../Server/type.d";
// api
import { getTopicsDetail, postCollect, getRelies } from "../../Server/api";

// 解析markdown
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import Message from '../../Components/Message'


const Detail = () => {
  // ref 获取dom
  const detail = useRef<HTMLDivElement | null>(null);

  // 是否显示
  const [isShow, setShow] = useState<boolean>(false);
  // 数据
  const [detailData, setDetailData] = useState<any>({});
  // 用户数据
  const [userInfo] = useState(isLogin());

  // 是否收藏
  const [collectStatus, setCollectStatus] = useState<boolean>(false)

  // 评论
  const [textValue, setTextValue] = useState<string>('')
    
  const { store, dispatch } = useContext<any>(AppContext);
  // 获取路由传值
  const searchParams = useParams();

  // 请求详情页数据
  const getTopicsDetailData = async (params: ITopicsDetail) => {
    let res: IResponse = await getTopicsDetail(params);
    setDetailData({ ...res });
  };

  // 请求评论数据
  const getRepliesData = async (params: IReplies) => {
    let res: IResponse = await getRelies(params)
    console.log(res)
    if (res.success) {
      Message.success('评论成功!')
      // 重新加载数据
      getTopicsDetailData({
        id: searchParams.id,
      });

      // 清空输入项
      setTextValue('')
    }
  }


  // 评论帖子或者用户
  const submitRelies = () => {
    console.log('我点击了评论')
    console.log(userInfo.accesstoken, detailData?.id)
    if (userInfo?.accesstoken) {
      getRepliesData(
        {
          accesstoken: userInfo?.accesstoken,
          content: textValue,
          topic_id: detailData?.id,
          reply_id: childitem?.id
        }
      )
    } else {
      Message.error('您还尚未登录')
    }
    
  }

  // 接收子组件传的来值
  const [ childitem, getChildItem] = useState<any>('')
 
  console.log(childitem)
  useEffect(() => {
    setTextValue('@' + childitem?.author?.loginname + ' ')
  }, [childitem?.id])

  // 主题收藏
  const postCollectData = async () => {
    if (!store.islogin) {
      // 未登录
      console.log('我未登陆')
      dispatch({
        type: UPDATE_STATUS,
        status: {
          isLogin: false,
          visible: true
        },
      })
    } else {
      console.log(userInfo)
      // 已登录
      let params: ICollect = {
        accesstoken: userInfo?.accesstoken,
        topic_id: detailData?.id,
      };
      let res: IResponse = await postCollect(params);
      console.log(res);
      if (res.success) {
        Message.success('收藏成功！')
        setCollectStatus(true)
      } else {
        Message.info('您已经收藏过了')
        setCollectStatus(true)
      }
    }
  };

  // 请求
  const handleClick = () => {
    let top =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop;

    // setShow(true);
    // 滚动大于60就消失
    if (top > 60) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    getTopicsDetailData({
      id: searchParams.id,
    });
  }, [searchParams.id]);

  useEffect(() => {
    // 监听滚动事件
    setTimeout(() => {
      window.addEventListener("scroll", handleClick, true);
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleClick, true);
    };
  }, []);
  return (
    <div className="pageDetail" ref={detail}>
      <DHeader
        isfix={isShow ? "fix" : ""}
        auther={{
          ...detailData?.author,
          isfollow: detailData.is_collect,
        }}
      />
      <div className="detailCon">
        <h3>{detailData.title}</h3>
        <div className="author">
          <div className="left">
            <span className="img">
              <img
                src={detailData?.author?.avatar_url}
                alt={detailData?.author?.loginname}
              />
            </span>
            <div className="txt">
              <span className="name">{detailData?.author?.loginname}</span>
              <span className="time">
                {transTime(detailData.create_at)}· 阅读:
                {detailData.visit_count}
              </span>
            </div>
          </div>
          <div className="isgz">
            <span
              className="gz cur"
              onClick={() => {
                postCollectData();
              }}
            >
              {
                collectStatus ? 
                (
                  '已收藏'
                )
                :
                (
                  '+ 收藏'
                )
              }
              
            </span>
          </div>
        </div>
        <div className="pCon">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {detailData.content}
          </ReactMarkdown>
          <span className="newsUpTxt">
            本文更新于 {formatTime(detailData.last_reply_at)}
          </span>
        </div>
        {/* <Link to="/detail/login">测试</Link>
        <Outlet /> */}
      </div>
      {/* <div className="relevantArt">
        <h4 className="titlePub">相关文章</h4>
        <div className="con">
          <ArticleList></ArticleList>
        </div>
      </div> */}
      <div className='submitComment mt10 bgf pd15'>
        <h4>
          新增评论
        </h4>
        <textarea name="" id="" cols={30} rows={3} placeholder = '请输入评论...' value = {textValue} onChange = { e => {setTextValue(e.target.value)}} />
        <button onClick={ () => submitRelies()}>
          评论
        </button>
      </div>
      <div className="comment">
        <h4 className="titlePub">
          全部评论 {detailData.reply_count}
        </h4>
        <CommentList 
          dataJson={detailData.replies}
          onGetChildItem = {getChildItem}
          >
          </CommentList>
        <h6 className = 'noMore'>害点呢哥？这回真没有了~~~</h6>
      </div>
    </div>
  );
};

export default Detail;
