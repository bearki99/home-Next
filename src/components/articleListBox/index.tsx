import React, { ReactNode, useEffect, useCallback, useState } from "react";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { IAppDispatch, IAppState } from "@/store";
import {
  getArticlesAction,
  changePageAction,
} from "@/components/articleListBox/store/articleList";
import isBottom from "@/utils/handleScrollBottom";
import { IAdvertisement } from "@/assets/interface/advertise";
import { IArticleItem } from "@/assets/interface/article";
import VirtualList from "./VirtualList";

interface IProps {
  children?: ReactNode;
  advertises?: Array<IAdvertisement>;
}

// 混入广告
function mixAdvertise(
  articles: Array<IArticleItem> = [],
  advertises: Array<IAdvertisement> = []
) {
  let mixDataId: Array<{
      isAdvertise: boolean;
      content: IAdvertisement | IArticleItem;
    }> = [],
    curIndex = 0;
  for (let i = 0; i < articles.length; i++) {
    if (i % 5 === 0) {
      if (curIndex < advertises.length) {
        mixDataId.push({ isAdvertise: true, content: advertises[curIndex] });
        curIndex++;
      }
    }
    mixDataId.push({ isAdvertise: false, content: articles[i] });
  }
  return mixDataId;
}
const ArticleListBox: React.FC<IProps> = (props) => {
  const dispatch = useDispatch<IAppDispatch>();
  const { articles, activeType, curPage, curSize, label, subtab} =
    useSelector((state: IAppState) => ({
      articles: state.articleList.articles,
      activeType: state.articleList.activeType,
      curPage: state.articleList.curPage,
      curSize: state.articleList.curSize,
      label: state.articleList.label,
      subtab: state.articleList.subtab,
      pageLoading: state.articleList.pageLoading,
    }));
  const { advertises } = props;
  let timeout: any;
  const handleScroll = useCallback(function handleScroll() {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      if (isBottom()) {
        document.removeEventListener("scroll", handleScroll);
        dispatch(changePageAction());
        document.addEventListener("scroll", handleScroll);
      }
    }, 300);
  }, []);

  // 监听滚动条触底
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (curPage === 1) return;
    dispatch(
      getArticlesAction({
        size: curSize,
        page: curPage,
        label: label,
        type: activeType,
        subtab: subtab,
      })
    );
  }, [curPage]);
  //
  const mixedData = mixAdvertise(articles, advertises);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(document.documentElement.scrollHeight);
  }, []);
  return (
    // 虚拟列表DOM结构
    <>
      <VirtualList
        height={height}
        itemCount={mixedData.length}
        itemSize={131}
        infoData={mixedData}
      />
    </>
  );
};
export default memo(ArticleListBox);
ArticleListBox.displayName = "ArticleListBox";
