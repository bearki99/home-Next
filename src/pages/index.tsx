import MainContent from "@/pages/[label]";
import wrapper from "@/store";
import { GetServerSideProps } from "next";
import { getArticlesAction } from "@/pages/[label]/store/articleList";

export default function HomePage() {
  return (
    <>
      <MainContent />
    </>
  );
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    const { activeType, curPage, curSize } = store.getState().articleList;
    return async () => {
      await store.dispatch(getArticlesAction({ page: curPage, size: curSize, label: "", type: activeType }));
      return {
        props: {},
      };
    };
  });