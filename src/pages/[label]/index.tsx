import Subheader from "@/components/subheader";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
}

const MainContent: React.FC<IProps> = () => {
  const router = useRouter();
  const { label = "recommended" } = router.query;
  return (
    <div className={styles.mainBG}>
      {label === "recommended" && <Subheader />}
      <div className={styles.mainContent}>
        {label}
      </div>
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";
