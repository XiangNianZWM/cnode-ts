import { useEffect } from "react";

export const useScrollToBottomHook = (
  listDomRef: any,
  callback: () => void,
  reactionDistance: number = 0
) => {
  useEffect(() => {
    // 拿到dom
    const currentDom = listDomRef.current;

    // useCallback 缓存方法
    const handleScroll = (e: any) => {
      if (
        e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight <=
        reactionDistance
      ) {
        callback();
      }
    };

    //
    currentDom!.addEventListener("scroll", handleScroll);
    return () => {
      // 离开时清除
      currentDom!.removeEventListener("scroll", handleScroll);
    };
  }, [callback, reactionDistance, listDomRef]);
};
