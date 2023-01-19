import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { useRouter } from "next/router";
import SubContent from "./[names]";
import { shallowEqual, useSelector } from "react-redux";
import Subheader from "@/components/subheader";
import { IHomeColumn } from "@/components/header/store";
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
  const nowTags = homeTags && homeTags.map((item: IHomeColumn) => item.id + "");
  if (!label || nowTags.includes(label)) {
    return (
      <>
        <Subheader />
        <SubContent />
      </>
    );
  } else {
    return (
      <div className={styles.mainBG}>
        <div className={styles.mainContent}></div>
      </div>
    );
  }
};
export default memo(MainContent);
MainContent.displayName = "MainContent";
