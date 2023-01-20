import React, { ReactNode } from "react";
import { memo } from "react";
import AdItem from "./c-cpns/ad-item";
import Download from "./c-cpns/download";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
}

const Advertise: React.FC<IProps> = () => {
  return <div className={styles.content}>
    <AdItem/>
    <Download/>
  </div>;
};
export default memo(Advertise);
Advertise.displayName = "Advertise";
