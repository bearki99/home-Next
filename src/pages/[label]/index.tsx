import React, { ReactNode, useEffect, useState } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import Subheader from "@/components/subheader/index";
import SubContent from "./[names]/index";
interface IProps {
  children?: ReactNode;
}
const MainContent: React.FC<IProps> = () => {
  const routes = useRouter();
  const { label } = routes.query;
  const { homeTags } = useSelector(
    (state: any) => ({
      homeTags: state.header.homeTags,
    }),
    shallowEqual
  );
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    const nowTags = homeTags && homeTags.map((item: any) => item.id + "");
    if (!label || nowTags.includes(label)) setFlag(true);
    else setFlag(false);
  }, [homeTags, label]);
  return flag ? (
    <>
      <Subheader />
      <SubContent />
    </>
  ) : (
    <div className={styles.mainBG}>
      <div className={styles.mainContent}></div>
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(function (store) {
//     return async () => {
//       await store.dispatch(getHeaderDataAction());
//       // await store.dispatch(getAdvertiseDataAction());
//       return {
//         props: {},
//       };
//     };
//   });
