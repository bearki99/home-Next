import Subheader from "@/components/subheader";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
}

const MainContent: React.FC<IProps> = () => {
  const router = useRouter();
  const { homeTags } = useSelector((state: any) => ({
    homeTags: state.header.homeTags,
  }));
  const currentIDs = homeTags && homeTags.map((item: any) => item.id);
  const { label = "recommended" } = router.query;
  const flag = currentIDs.includes(label);
  return (
    <div className={styles.mainBG}>
      {(flag || label == "recommended") && <Subheader />}
      <div className={styles.mainContent}>{label}</div>
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";
