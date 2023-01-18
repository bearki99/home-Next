import MainContent from "@/pages/[label]";
import wrapper from "@/store";
import { GetServerSideProps } from "next";
import { getHeaderDataAction } from "@/components/header/store";
export default function HomePage() {
  return (
    <>
      <MainContent />
    </>
  );
}
HomePage.displayName = "HomePage";
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async () => {
      await store.dispatch(getHeaderDataAction());
      return {
        props: {},
      };
    };
  });
