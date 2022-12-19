import React, { useEffect, useState } from 'react'

import { isLogin } from '../../Utils/utils/utils'

// 头部
import DHeader from "../../Components/Detail/DHeader";

import ArticleList from '../../Components/Public/ArticleList'

// api
import { getTopicCollect } from '../../Server/api'

// 共享
import { CollectContext } from '../../Store/Collect/CollectContext'
import Message from '../../Components/Message'

const Collect = () => {

    // 获取登录态
    const [login] = useState(isLogin())

    // 组件数据
    const [datajson, setdatajson] = useState([])

    // 请求用户收藏数据
    const getTopicCollectData = async ( params: string) => {
        let res = await getTopicCollect(params)
        console.log(res)
        if (res) {
            setdatajson(res)
        }
        
    }

    useEffect(() => {
        getTopicCollectData(login?.loginname)
    }, [login?.loginname])

    return (
        <div className = 'pageDetail'>
            <DHeader />
            <div className="collect">
                <div className="imgbg">
                    <h6>我的收藏</h6>
                    <div className="username" onClick={() => 
        Message.info('我是提示')}>
                        {
                            login?.id ? (
                                <>
                                    <img src={login.avatar_url} alt="" />
                                    <em>{login.loginname}</em>
                                </>
                            ) : ''

                        }
                        
                    </div>
                    <img src={require('../../static/images/sc.jpg')} className = 'bg' alt="" />
                </div>
                <div className="relevantArt">
                    <div className="con">
                        <CollectContext.Provider value = {datajson}>
                            <ArticleList />
                        </CollectContext.Provider>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Collect