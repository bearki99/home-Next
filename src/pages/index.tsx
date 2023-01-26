import wrapper from "@/store";
import { GetServerSideProps } from "next";

import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import { getAdvertiseData } from "@/components/advertise/service";

import MainContent from "@/pages/[label]";
import {
  changeActiveTypeAction,
  getArticlesAction,
  changeLabelAction,
  changeSubtabAction,
} from "@/components/articleListBox/store/articleList";
import { getAuthorsAction } from "@/components/authorListBox/store/authorList";
import Head from "next/head";

interface IProps {
  homeTags: any[];
  advertiseData: any[];
}
export default function HomePage(props: IProps) {
  const { homeTags, advertiseData } = props;
  return (
    <>
      <Head>
        <title>main-page</title>
      </Head>
      <MainContent homeTags={homeTags} advertiseData={advertiseData} />
    </>
  );
}
HomePage.displayName = "HomePage";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { activeType, curPage, curSize, label, subtab } =
      store.getState().articleList;
    const { authors } = store.getState().authorList;
    return async (context) => {
      const res = await getOriginHeader();
      const homeTags = await getHeaderTags();
      const advertiseData = await getAdvertiseData();
      const query = context.query;
      store.dispatch(changeActiveTypeAction(query.sort ? query.sort : "recommend"));
      store.dispatch(changeLabelAction("recommended"));
      query.names && store.dispatch(changeSubtabAction(""));
      await store.dispatch(
        getArticlesAction({
          page: curPage,
          size: curSize,
          label: label,
          type: activeType,
          subtab: subtab,
        })
      );
      if (authors?.length === 0) {
        await store.dispatch(getAuthorsAction());
      }
      return {
        props: {
          originHeader: res || [],
          homeTags: homeTags.data || [],
          advertiseData: advertiseData.data || [],
        },
      };
    };
  });
