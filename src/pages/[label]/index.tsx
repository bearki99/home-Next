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
  const flag = urlArr && urlArr.indexOf(label) !== -1 || label == "" || label== "recommended";

  return flag ? (
    <>
      <Subheader homeTags={homeTags} />
      <SubContent advertiseData={advertiseData} homeTags={homeTags} />
    </>
  ) : (
    <div className={styles.mainBG}>
      <div className={styles.mainContent}></div>
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { activeType, curPage, curSize, label, subtab } =
      store.getState().articleList;
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
