import React from "react";
import { memo } from "react";
import { author } from "@/assets/interface/author";
import styles from "./authorListItem.module.less";

import { Image } from "antd";

interface IProps {
  author: author
}

const ArticleListItem: React.FC<IProps> = (props) => {
  const { author } = props;
  return (
    <div className={styles.authorListItem}>
      <Image src={author.avatar} className={styles.autAvatar} alt={author.username}></Image>
      <div className={styles.autInfo}>
        <div className="autName">{author.username}</div>
        <div className={styles.autDcp+" SgtextOms"}>{author.description}</div>
      </div>
    </div>
  );
};

export default memo(ArticleListItem);
ArticleListItem.displayName = "ArticleListItem";