import MainContent from "@/pages/[label]";
import wrapper from "@/store";
import { GetServerSideProps } from "next";
import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import { getAdvertiseData } from "@/components/advertise/service";
import {
  changeActiveTypeAction,
  getArticlesAction,
  changeLabelAction,
} from "@/components/articleListBox/store/articleList";
import { getAuthorsAction } from "@/components/authorListBox/store/authorList";
interface IProps {
  homeTags: any[];
  advertiseData: any[];
}
export default function HomePage(props: IProps) {
  const { homeTags, advertiseData } = props;
  return (
    <>
      <MainContent homeTags={homeTags} advertiseData={advertiseData} />
    </>
  );
}
HomePage.displayName = "HomePage";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { activeType, curSize, label, curPage } =
      store.getState().articleList;
    return async (context) => {
      const res = await getOriginHeader();
      const homeTags = await getHeaderTags();
      const advertiseData = await getAdvertiseData();
      const query = context.query;
      store.dispatch(changeActiveTypeAction(query.sort ? query.sort : ""));
      // 当前label
      store.dispatch(changeLabelAction("recommended"));
      await store.dispatch(
        getArticlesAction({
          page: curPage,
          size: curSize,
          label: label,
          type: activeType,
          subtab: "",
        })
      );
      await store.dispatch(getAuthorsAction());
      return {
        props: {
          originHeader: res || [],
          homeTags: homeTags.data || [],
          advertiseData: advertiseData.data || [],
        },
      };
    };
  });
