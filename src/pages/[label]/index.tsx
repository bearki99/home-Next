import React, { ReactNode } from "react";
import { memo } from "react";
import wrapper from "@/store";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";

import styles from "./style.module.less";

import Subheader from "@/components/subheader/index";
import SubContent from "./[names]/index";

import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import { getAdvertiseData } from "@/components/advertise/service";
import {
  changeActiveTypeAction,
  getArticlesAction,
  changeLabelAction,
  changeSubtabAction,
} from "@/components/articleListBox/store/articleList";
import { getAuthorsAction } from "@/components/authorListBox/store/authorList";

interface IProps {
  children?: ReactNode;
  homeTags?: any;
  originHeader?: any;
  advertiseData?: any;
}
export interface IItem {
  id: number;
  labels: any[];
  name: string;
  url: string;
}
const MainContent: React.FC<IProps> = (props) => {
  const { homeTags, advertiseData, originHeader } = props;
  const urlArr = homeTags && homeTags.map((item: IItem) => item.url);
  const oriUrl =
    originHeader &&
    originHeader.data &&
    originHeader.data.map((item: any) => item.url);
  const router = useRouter();
  const { label = "" } = router.query;
  const flag =
    (urlArr && urlArr.indexOf(label) !== -1) ||
    label == "" ||
    label == "recommended";
  const nameArr = homeTags && homeTags.map((item: IItem) => item.name);
  const oriName =
    originHeader &&
    originHeader.data &&
    originHeader.data.map((item: any) => item.name);

  const idx = nameArr && urlArr.indexOf(label);
  const idx2 = oriUrl && oriUrl.indexOf("/" + label);

  let title = "推荐 - 文章 - 掘金";
  let title2;
  if (idx !== -1) title = nameArr[idx] + " - 掘金";
  if (idx2 !== 0) title2 = oriName[idx2] + " - 掘金";
  if(label === "") title = title2 = "稀土掘金";
  return flag ? (
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
      <Subheader homeTags={homeTags} />
      <SubContent advertiseData={advertiseData} homeTags={homeTags} />
    </>
  ) : (
    <>
      <Head>
        <title>{title2}</title>
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
      <div className={styles.mainBG}>
        <div className={styles.mainContent}></div>
      </div>
    </>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";

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
        store.dispatch(changeSubtabAction(""));
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
