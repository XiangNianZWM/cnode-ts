import React, { useContext } from "react";
import { UPDATE_TAG, IndexContext } from "../../pages/Index/IndexContext";
const tabList = [
  {
    name: "全部",
    alis: "all",
  },
  {
    name: "精华",
    alis: "good",
  },
  {
    name: "分享",
    alis: "share",
  },
  {
    name: "问答",
    alis: "ask",
  },
  {
    name: "招聘",
    alis: "job",
  },
  {
    name: "客户端测试",
    alis: "test",
  },
];

const IndexMenu = () => {
  const { store, dispatch } = useContext<any>(IndexContext);
  return (
    <div className="indexMenu">
      {/* {menu} */}
      {tabList.map((item, index) => {
        return (
          <span
            className={`fs14 mr15 ${store === item.alis ? "cur" : ""}`}
            key={index}
            onClick={() => {
              dispatch({ type: UPDATE_TAG, alis: item.alis });
            }}
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

export default IndexMenu;
