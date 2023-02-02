import React from "react";
import { memo } from "react";
import { IAdvertisement } from "@/assets/interface/advertise";
import { formatChangeTime } from "@/utils/formatTime";
import styles from "./advertiseListItem.module.less";

import { Divider } from "antd";
import { Popover } from "antd";
import Image from "next/image";
import AuthorListItem from "../authorListItem";
import md2NormalStr from "@/utils/md2NormalStr";


interface IProps {
  advertise: IAdvertisement
}

const AdvertiseListItem: React.FC<IProps> = (props) => {
  const { advertise } = props;
  const content = (
    <div style={{ width: "250px" }}>
      <AuthorListItem author={advertise.author} />
    </div>
  );

  return (
    <div className={styles.articleListItem} onClick={() => { window.open("/article/adv_" + advertise.id); }}>
      <div className={styles.artHead}>
        <div className={styles.artHeadLeft}>
          <span className={styles.pcAuthor}>
            <Popover content={content} trigger="hover">
              <span className={styles.author}>{advertise.author.username}</span>
            </Popover>
          </span>
          <span className={styles.mobileAuthor}>
            <span className={styles.author}>{advertise.author.username}</span>
          </span>
          <Divider type="vertical" />
          <span>{formatChangeTime(advertise.time)}</span>
        </div>
        <div className={styles.artHeadRight}>
          广告
        </div>
      </div>
      <div className={styles.artBody}>
        <div className={styles.artInfo}>
          <div className={styles.artTitle + " SgtextOms"} title={advertise.title}>
            {advertise.title}
          </div>
          <div className={styles.artContent + " textOms"}>
            {md2NormalStr(advertise.content)}
          </div>
        </div>
        <div className={styles.artIMG}>
          {
            advertise.image && (<Image src={advertise.image} height={80} width={120} alt={advertise.title}></Image>)
          }
        </div>
      </div>
    </div>
  );
};

export default memo(AdvertiseListItem);
AdvertiseListItem.displayName = "AdvertiseListItem";
