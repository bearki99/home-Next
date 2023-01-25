import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import Link from "next/link";
interface IProps {
  children?: ReactNode;
}
const iconUrl =
  "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png";
const Download: React.FC<IProps> = () => {
  return (
    <div className={styles.container}>
      <Link href="/app" className={styles.link}>
        <img src={iconUrl} alt="下载" className={styles.downloadImg} />
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
