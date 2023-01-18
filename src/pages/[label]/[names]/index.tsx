import Subheader from "@/components/subheader";
import SubShow from "@/components/subshow";
import { IAppState } from "@/store";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.less";

interface IProps {
  children?: ReactNode;
}

const SubContent: React.FC<IProps> = () => {
  const router = useRouter();
  const { names } = router.query;
  const { homeTags, initialSubIndex } = useSelector((state: IAppState) => ({
    homeTags: state.header.homeTags,
    initialSubIndex: state.header.initialSubIndex,
  }));
  return (
    <>
      {names && <Subheader />}
      <div className={styles.mainBG}>
        <div className={styles.mainContent}>
          {homeTags && homeTags[initialSubIndex].labels.length > 0 && (
            <SubShow names={names} />
          )}
        </div>
      </div>
    </>
  );
};
export default memo(SubContent);
SubContent.displayName = "SubContent";
