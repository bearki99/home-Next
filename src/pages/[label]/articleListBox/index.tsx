import React, { ReactNode, useEffect } from "react";
import { memo } from "react";

import ArticleListItem from "@/components/articleListItem";
import { useSelector, useDispatch } from "react-redux";
import type { IAppDispatch, IAppState } from "@/store";
import { getArticlesAction, changePageAction } from "@/pages/[label]/store/articleList";
import isBottom from "@/utils/handleScrollBottom";

interface IProps {
  children?: ReactNode;
}

const ArticleListBox: React.FC<IProps> = () => {
  const dispatch = useDispatch<IAppDispatch>();
  const { articles, activeType, curPage, curSize } = useSelector((state: IAppState) => ({
    articles: state.articleList.articles,
    activeType: state.articleList.activeType,
    curPage: state.articleList.curPage,
    curSize: state.articleList.curSize
  }));

  // 获取文章
  useEffect(() => {
    console.log(curPage);
    document.removeEventListener("scroll", handleScroll);
    dispatch(getArticlesAction({ size: curSize, page: curPage, label: "1", type: activeType }));
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [curPage, activeType,curSize]);

  let timeout: any;
  function handleScroll() {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      if (isBottom()) {
        document.removeEventListener("scroll", handleScroll);
        dispatch(changePageAction(String(Number(curPage) + 1)));
        document.addEventListener("scroll", handleScroll);
      }
    }, 300);
  }

  return (
    <div>
      <div className="articleList">
        {
          articles && articles.map((item: any) => {
            return (
              <ArticleListItem article={item} key={item.uid}></ArticleListItem>
            );
          })
        }
      </div>
    </div>
  );
};
export default memo(ArticleListBox);
ArticleListBox.displayName = "ArticleListBox";