import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { memo } from "react";

import wrapper from "@/store";
import { GetServerSideProps } from "next";
import { getArticlesAction } from "@/components/articleListBox/store/articleList";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Skeleton } from "antd";

import ArticleListBox from "../../components/articleListBox";
import AuthorListBox from "../../components/authorListBox";
import styles from "./recommended.module.less";
import { useSelector, useDispatch } from "react-redux";
import type { IAppDispatch, IAppState } from "@/store";
import { changeActiveTypeAction, changeLoadingAction, changeLabelAction, changeSubtabAction } from "@/components/articleListBox/store/articleList";
import { getAuthorsAction } from "@/components/authorListBox/store/authorList";

interface IProps {
  children?: ReactNode;
}

const MainContent: React.FC<IProps> = () => {
  const dispatch = useDispatch<IAppDispatch>();
  const router = useRouter();
  let baseUrl = router.asPath;
  if (router.asPath.indexOf("?") !== -1) {
    baseUrl = baseUrl.slice(0, router.asPath.indexOf("?"));
  }
  const { sort } = router.query;
  // 下拉选项
  const items: MenuProps["items"] = [
    {
      label: (
        <Link href={baseUrl + "?sort=three_days_hottest"}>
          3天内
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link href={baseUrl + "?sort=weekly_hottest"}>
          7天内
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link href={baseUrl + "?sort=monthly_hottest"}>
          30天内
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link href={baseUrl + "?sort=hottest"}>
          全部
        </Link>
      ),
      key: "3",
    },
  ];

  // 状态 from store
  const { activeType, isLoading } = useSelector((state: IAppState) => ({
    activeType: state.articleList.activeType,
    isLoading: state.articleList.isLoading,
  }));

  // 骨架屏
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  function handleRouteChange() {
    console.log("路由切换");
    dispatch(changeLoadingAction(true));
  }

  function isSortBy(): string {
    switch (sort) {
    case "three_days_hottest":
      return "3天内";
    case "weekly_hottest":
      return "7天内";
    case "monthly_hottest":
      return "30天内";
    case "hottest":
      return "全部";
    default:
      return "";
    }
  }

  return (
    <div className={styles.recommendedBox}>
      {/* MainContent:{label} */}
      <div className={styles.mainContent}>
        <div className={styles.left}>
          <div className={styles.artListHead}>
            <Link href={baseUrl}><span className={activeType === "" ? styles.activeType : ""}>推荐</span></Link>
            <Link href={baseUrl + "?sort=newest"}><span className={activeType === "newest" ? styles.activeType : ""}>最新</span></Link>
            <Link href={baseUrl + "?sort=three_days_hottest"}><span className={activeType.includes("hottest") ? styles.activeType : ""}>热榜</span></Link>
            {
              activeType.includes("hottest") && (
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {
                        isSortBy()
                      }
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )
            }
          </div>
          {isLoading ? <Skeleton active style={{ padding: "12px 20px" }} /> : <ArticleListBox />}
        </div>

        <div className={styles.right}>
          <div className={styles.author}>
            <AuthorListBox />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { activeType, curPage, curSize, label, subtab } = store.getState().articleList;
    const { authors } = store.getState().authorList;
    return async (context) => {
      const query = context.query;
      if (query.label && query.label[0] !== "/" && query.label[0] !== "/favicon.ico") {
        store.dispatch(changeActiveTypeAction(query.sort ? query.sort : ""));
        store.dispatch(changeLabelAction(query.label[0]));
        query.label[1] && store.dispatch(changeSubtabAction(query.label[1]));
        await store.dispatch(getArticlesAction({ page: curPage, size: curSize, label: label, type: activeType, subtab: subtab }));
      }
      if (authors?.length === 0) {
        await store.dispatch(getAuthorsAction());
      }
      return {
        props: {},
      };
    };
  });
