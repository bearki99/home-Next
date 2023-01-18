// import { useRouter } from "next/router";
import React, { ReactNode, Suspense } from "react";
import { memo } from "react";

import ArticleListBox from "./articleListBox";
import AuthorListBox from "./authorListBox";
import styles from "./recommended.module.less";
import { useSelector, useDispatch } from "react-redux";
import type { IAppDispatch, IAppState } from "@/store";
import { changeActiveTypeAction } from "@/pages/[label]/store/articleList";
import { Skeleton } from "antd";

interface IProps {
  children?: ReactNode;
}

const MainContent: React.FC<IProps> = () => {
  // const router = useRouter();
  // const { label = "recommended" } = router.query;
  const dispatch = useDispatch<IAppDispatch>();
  const { activeType } = useSelector((state: IAppState) => ({
    activeType: state.articleList.activeType,
  }));
  function changeType(e: any) {
    if (e.target.localName === "span") {
      dispatch(changeActiveTypeAction(e.target.innerText));
    }
  }
  return <div className={styles.recommendedBox}>
    {/* MainContent:{label} */}

    <div className={styles.left}>
      <div className={styles.artListHead} onClick={changeType}>
        <span className={activeType === "推荐" ? styles.activeType : ""}>推荐</span>
        <span className={activeType === "最新" ? styles.activeType : ""}>最新</span>
        <span className={activeType === "热榜" ? styles.activeType : ""}>热榜</span>
      </div>
      <Suspense fallback={<Skeleton active />}>
        <ArticleListBox />
      </Suspense>
    </div>

    <div className={styles.right}>
      <Suspense fallback={<Skeleton active />}>
        <AuthorListBox />
      </Suspense>
    </div>
  </div>;
};
export default memo(MainContent);
MainContent.displayName = "MainContent";
