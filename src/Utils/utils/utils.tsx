// 公用工具函数库
import Storage from "./Storage";

// 根据tab类型转换中文
// top 是否置顶， good是否精华, value值
export const tabToChinaes = (
  top: boolean,
  good: boolean,
  value: string
): string => {
  let type = "";
  if (top) {
    type = "置顶";
  } else if (good) {
    type = "精华";
  } else {
    switch (value) {
      case "all":
        type = "全部";
        break;
      case "good":
        type = "精华";
        break;
      case "share":
        type = "分享";
        break;
      case "ask":
        type = "问答";
        break;
      case "job":
        type = "招聘";
        break;
      case "dev":
        break;
      default:
        type = "";
    }
  }
  return type;
};

// 转换时间
export const transTime = (time: string): string => {
  let text = "";
  if (!time) {
    return "";
  }

  // 先定义1分钟，1小时，1天，1年
  // 1分钟
  const min: number = 60 * 1000;
  // 1小时
  const hour: number = 60 * min;
  // 1天
  const day: number = 24 * hour;
  // 1个月
  const month: number = 30 * day;
  // 1年
  const year: number = 12 * month;
  // 转换一下时间
  let t: any = new Date(time);

  // 现在的时间 - 以前的时间 = 差值
  let diff: number = new Date().getTime() - t;

  // 转换
  if (diff > year) {
    let n: number = Math.floor(diff / year);
    text = `${n}年前`;
  } else if (diff > month) {
    let n: number = Math.floor(diff / month);
    text = `${n}个月前`;
  } else if (diff > day) {
    let n: number = Math.floor(diff / day);
    text = `${n}天前`;
  } else if (diff > hour) {
    let n: number = Math.floor(diff / hour);
    text = `${n}小时前`;
  } else if (diff > min) {
    let n: number = Math.floor(diff / min);
    text = `${n}分钟前`;
  } else {
    text = "刚刚";
  }
  return text;
};

// yyyy-mm-dd 转换时间
export const formatTime = (time: string): string => {
  // 拿到秒数
  const date = new Date(time);
  // 年
  const Y = date.getFullYear() + "-";
  // 月
  const M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1) + "-"
      : date.getMonth() + 1 + "-";
  // 日
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  // 时
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  // 分
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  // 秒
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  //

  return Y + M + D + h + m + s;
};

// 检测是否登录
export const isLogin = () => {
  if (!Storage.getLocal("userInfo")) {
    return false;
  } else {
    return Storage.getLocal("userInfo");
  }
};
