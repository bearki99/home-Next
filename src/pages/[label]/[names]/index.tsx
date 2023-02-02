import React, { ReactNode, useEffect, useRef, useState } from "react";
import { memo } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import wrapper from "@/store";

import type { IAppDispatch, IAppState } from "@/store";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Skeleton } from "antd";

import styles from "./recommended.module.less";

import { throttle } from "lodash-es";
import { getScollTop } from "@/utils/getScrollTop";
import Subheader from "@/components/subheader";
import SubShow from "@/components/subshow";
import Advertise from "@/components/advertise";
import { getAdvertiseData } from "@/components/advertise/service";
import { getArticlesAction } from "@/components/articleListBox/store/articleList";
import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import ArticleListBox from "@/components/articleListBox";
import AuthorListBox from "@/components/authorListBox";
import {
  changeActiveTypeAction,
  changeLoadingAction,
  changeLabelAction,
  changeSubtabAction,
} from "@/components/articleListBox/store/articleList";
import { getAuthorsAction } from "@/components/authorListBox/store/authorList";
import AdvertiseV2 from "@/components/advertise-v2";
import { IItem } from "..";

interface IProps {
  children?: ReactNode;
  homeTags?: any[];
  advertiseData?: any[];
}

const SubContent: React.FC<IProps> = (props) => {
  const router = useRouter();
  const authorRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<IAppDispatch>();
  const { label = "", names } = router.query;
  const { homeTags, advertiseData } = props;
  const [sticky, setSticky] = useState(false);
  const labelTags = homeTags && homeTags.map((item: any) => item.url);
  let currentIndex = (labelTags && labelTags.indexOf(label)) || 0;
  if (label === "") currentIndex = 0;
  let baseUrl = router.asPath;
  let scrollTop = 0;
  if (router.asPath.indexOf("?") !== -1) {
    baseUrl = baseUrl.slice(0, router.asPath.indexOf("?"));
  }
  const urlArr = homeTags && homeTags.map((item: IItem) => item.url);
  const nameArr: any = homeTags && homeTags.map((item: IItem) => item.name);
  const idx: any = nameArr && urlArr?.indexOf(label as string);
  let title = "推荐 - 文章 - 掘金";
  if (idx !== -1) title = nameArr[idx] + " - 掘金";
  if (label == "") title = "稀土掘金";
  const { sort } = router.query;
  // 下拉选项
  const items: MenuProps["items"] = [
    {
      label: <Link href={baseUrl + "?sort=three_days_hottest"}>3天内</Link>,
      key: "0",
    },
    {
      label: <Link href={baseUrl + "?sort=weekly_hottest"}>7天内</Link>,
      key: "1",
    },
    {
      label: <Link href={baseUrl + "?sort=monthly_hottest"}>30天内</Link>,
      key: "2",
    },
    {
      label: <Link href={baseUrl + "?sort=hottest"}>全部</Link>,
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

  const handleScroll = () => {
    scrollTop = getScollTop();
    let myHeight: number;
    if (authorRef.current) {
      myHeight = authorRef.current.offsetTop + authorRef.current.offsetHeight;
      if (scrollTop > myHeight) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
  };

  const bindHandleScroll = React.useRef(throttle(handleScroll, 100)).current;
  useEffect(() => {
    window.addEventListener("scroll", bindHandleScroll);
    return () => {
      window.removeEventListener("scroll", bindHandleScroll);
    };
  }, [bindHandleScroll]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          data-n-head="ssr"
          name="description"
          content="掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。"
        />
        <meta
          data-n-head="ssr"
          name="keywords"
          content="掘金,稀土,Vue.js,前端面试题,Kotlin,ReactNative,Python"
        />
      </Head>
      {/* 次导航栏 */}
      {names && <Subheader homeTags={homeTags} />}

      <div className={styles.recommendedBox}>
        {/* MainContent:{label} */}

        <div className={styles.mainContent}>
          <div className={styles.topNav}>
            {currentIndex >= 0 &&
              homeTags &&
              label &&
              homeTags[currentIndex] &&
              homeTags[currentIndex]?.labels.length > 0 &&
              (
                <SubShow
                  currentsubTags={homeTags[currentIndex].labels}
                  homeTags={homeTags}
                />
              )}
          </div>

          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.artListHead}>
                <Link href={baseUrl}>
                  <span
                    className={
                      activeType === "recommend" ? styles.activeType : ""
                    }
                  >
                    推荐
                  </span>
                </Link>
                <Link href={baseUrl + "?sort=newest"}>
                  <span
                    className={activeType === "newest" ? styles.activeType : ""}
                  >
                    最新
                  </span>
                </Link>
                <Link href={baseUrl + "?sort=three_days_hottest"}>
                  <span
                    className={
                      activeType.includes("hottest") ? styles.activeType : ""
                    }
                  >
                    热榜
                  </span>
                </Link>
                {activeType.includes("hottest") && (
                  <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {isSortBy()}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </div>

              {isLoading ? (
                <Skeleton active className="skeleton" />
              ) : (
                <ArticleListBox advertises={advertiseData} />
              )}
            </div>

            <div className={styles.right}>
              <div className={styles.advertise}>
                <Advertise advertiseData={advertiseData} />
              </div>
              <div className={styles.advertise}>
                <AdvertiseV2 advertiseData={advertiseData} sticky={sticky} />
              </div>
              <div className={styles.author} ref={authorRef}>
                <AuthorListBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(SubContent);
SubContent.displayName = "SubContent";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { authors } = store.getState().authorList;
    return async (context) => {
      const query = context.query;
      const res = await getOriginHeader();
      const subheader = await getHeaderTags();
      const advertiseData = await getAdvertiseData();
      if (
        query.label &&
        query.label !== "/" &&
        query.label !== "/favicon.ico"
      ) {
        store.dispatch(
          changeActiveTypeAction(query.sort ? query.sort : "recommend")
        );
        store.dispatch(changeLabelAction(query.label));
        query.names && store.dispatch(changeSubtabAction(query.names));
        const { activeType, curPage, curSize, label, subtab } =
          store.getState().articleList;
        await store.dispatch(
          getArticlesAction({
            page: curPage,
            size: curSize,
            label: label,
            type: activeType,
            subtab: subtab,
          })
        );
      }
      if (authors?.length === 0) {
        await store.dispatch(getAuthorsAction());
      }
      return {
        props: {
          originHeader: res || [],
          homeTags: subheader.data || [],
          advertiseData: advertiseData.data || [],
        },
      };
    };
  });
