import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import Link from "next/link";
// import Image from "next/image";
interface IProps {
  children?: ReactNode;
}
const Download: React.FC<IProps> = () => {
  return (
    <div className={styles.container}>
      <Link href="/app" className={styles.link}>
        {/* <Image
          src="/"
          alt="下载"
          className={styles.downloadImg}
          width={100}
          height={100}
        /> */}
        <div className={styles.right}>
          <div className={styles.headLine}>下载稀土掘金APP</div>
          <div className={styles.desc}>一个帮助开发者成长的社区</div>
        </div>
      </Link>
    </div>
  );
};
export default memo(Download);
Download.displayName = "Download";
