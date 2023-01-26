import React, { ReactNode } from "react";
import { memo } from "react";
import wrapper from "@/store";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import styles from "./style.module.less";

import Subheader from "@/components/subheader/index";
import SubContent from "./[names]/index";

import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import { getAdvertiseData } from "@/components/advertise/service";
import Head from "next/head";

interface IProps {
  children?: ReactNode;
  homeTags?: any;
  originHeader?: any;
  advertiseData?: any;
}
interface IItem {
  id: number;
  labels: any[];
  name: string;
  url: string;
}
const MainContent: React.FC<IProps> = (props) => {
  const { homeTags, advertiseData } = props;
  const urlArr = homeTags && homeTags.map((item: IItem) => item.url);
  const router = useRouter();
  const { label = "" } = router.query;
  const flag = urlArr.indexOf(label) !== -1 || label === "recommend";
  const nameArr = homeTags && homeTags.map((item: IItem) => item.name);
  const myIndex = urlArr.indexOf(label);
  return flag ? (
    <>
      <Head>
        <title>{nameArr[myIndex]} - 掘金</title>
        {/* <meta
          name="description"
          data-n-head="ssr"
          content="掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。"
        ></meta>
        <meta
          name="keywords"
          data-n-head="ssr"
          content="掘金,稀土,Vue.js,前端面试题,Kotlin,ReactNative,Python"
        ></meta> */}
      </Head>
      <Subheader homeTags={homeTags} />
      <SubContent advertiseData={advertiseData} homeTags={homeTags} />
    </>
  ) : (
    <>
      <Head>
        <title>{nameArr[myIndex]} - 掘金</title>
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
  wrapper.getServerSideProps(function () {
    return async () => {
      const res = await getOriginHeader();
      const subheader = await getHeaderTags();
      const advertiseData = await getAdvertiseData();
      return {
        props: {
          originHeader: res || [],
          homeTags: subheader.data || [],
          advertiseData: advertiseData.data || [],
        },
      };
    };
  });
