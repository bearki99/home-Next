import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
}

const SubShow: React.FC<IProps> = () => {
  return <div className={styles.subshow}>SubShow</div>;
};
export default memo(SubShow);
SubShow.displayName = "SubShow";
