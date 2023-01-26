import React from "react";
import { memo } from "react";
import { IAuthor } from "@/assets/interface/author";
import styles from "./authorListItem.module.less";

import Image from "next/image";

interface IProps {
  author: IAuthor
}

const ArticleListItem: React.FC<IProps> = (props) => {
  const { author } = props;
  return (
    <div className={styles.authorListItem}>
      <Image src={author.avatar} className={styles.autAvatar} alt={author.username} width={100} height={100}></Image>
      <div className={styles.autInfo}>
        <div className="autName">{author.username}</div>
        <div className={styles.autDcp+" SgtextOms"}>{author.description}</div>
      </div>
    </div>
  );
};

export default memo(ArticleListItem);
ArticleListItem.displayName = "ArticleListItem";