import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import Link from "next/link";
interface IProps {
  children?: ReactNode;
}

const Download: React.FC<IProps> = () => {
  return <div className={styles.container}>
    <Link href="/app">下载</Link>
  </div>;
};
export default memo(Download);
Download.displayName = "Download";
