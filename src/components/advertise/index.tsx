import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
}

const Advertise: React.FC<IProps> = () => {
  return <div className={styles.content}>
    
  </div>;
};
export default memo(Advertise);
Advertise.displayName = "Advertise";
