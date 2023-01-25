import MainContent from "@/pages/[...label]";
import wrapper from "@/store";
import { GetServerSideProps } from "next";
import { changeActiveTypeAction, getArticlesAction, changeLabelAction } from "@/components/articleListBox/store/articleList";
import { getAuthorsAction } from "@/components/authorListBox/store/authorList";

export default function HomePage() {
  return (
    <>
      <MainContent />
    </>
  );
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { activeType, curSize, label, curPage } = store.getState().articleList;
    return async (context) => {
      // 当前type
      const query = context.query;
      store.dispatch(changeActiveTypeAction(query.sort ? query.sort : ""));
      // 当前label
      store.dispatch(changeLabelAction("recommended"));
      await store.dispatch(getArticlesAction({ page: curPage, size: curSize, label: label, type: activeType, subtab: "" }));
      await store.dispatch(getAuthorsAction());
      return {
        props: {},
      };
    };
  });