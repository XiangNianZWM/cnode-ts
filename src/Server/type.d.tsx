// 登录
export interface ILogin {
  username: string;
  password: string;
}

// userid
export interface IUser {
  userId: string;
}

// 返回接口
export interface IResponse {
  data?: any[];
  success?: boolean;
  code?: number;
}

// 获取主题
export interface ITopics {
  // 页码
  // page?: number;
  // // 主题分类, all, ask, share, job, good
  // tab?: string;
  // // 每一页数量
  // limit?: number;
  // // 是否渲染markdown格式文本
  // mdrender?: boolean;
}

// 获取主题详情
export type ITopicsDetail = {
  id: string | any;
};

// 点赞
export type ICollect = {
  accesstoken?: string;
  topic_id?: string | number;
};

// 登录
export type ILoginToken = {
  accesstoken: string;
}

// 新建评论
export type IReplies = {
  accesstoken: string
  content: string
  topic_id: string
  reply_id?: string
}