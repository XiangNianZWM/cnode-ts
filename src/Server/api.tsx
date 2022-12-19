import axiosInstance from "./axiosInstance";

import {
  ILogin,
  IUser,
  IResponse,
  ITopics,
  ITopicsDetail,
  ICollect,
  ILoginToken,
  IReplies
} from "./type.d";
// 接口
export const Login = (params: ILogin): Promise<IResponse> => {
  return axiosInstance.post("/user/login", params).then((res) => res.data);
};

export const getUserInfo = (params: IUser): Promise<IResponse> => {
  return axiosInstance.post("/user/getInfo", params).then((res) => res.data);
};

// 主题
export const getTopics = (params: ITopics): Promise<IResponse> => {
  return axiosInstance({
    url: "/topics",
    method: "GET",
    params: {
      ...params,
    },
  });
};

// 详情
export const getTopicsDetail = (params: ITopicsDetail): Promise<IResponse> => {
  console.log(params);
  return axiosInstance({
    url: "/topic/" + params.id,
    method: "GET",
  });
};

// 主题收藏
export const postCollect = (data: ICollect): Promise<IResponse> => {
  return axiosInstance({
    url: "/topic_collect/collect",
    method: "POST",
    data: {
      ...data,
    },
  });
};

// 登陆
export const postLoginToken = (data: ILoginToken) => {
  return axiosInstance({
    url: '/accesstoken',
    method: 'POST',
    data: {
      accesstoken: data.accesstoken
    }
  })
}

// 用户收藏的主题
export const getTopicCollect = (loginname: string): any => {
  return axiosInstance({
    url: `/topic_collect/${loginname }`
  })
}

// 新建评论
export const getRelies = (data: IReplies): Promise<IResponse> => {
  return axiosInstance({
    url: `/topic/${data.topic_id}/replies`,
    method:'POST',
    data: {
      ...data
    }
  })
}
