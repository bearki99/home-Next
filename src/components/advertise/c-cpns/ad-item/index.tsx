import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
}

const ADItem: React.FC<IProps> = () => {
  return <div className={styles.adContent}>ADItem</div>;
};
export default memo(ADItem);
ADItem.displayName = "ADItem";
