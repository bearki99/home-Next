import React from "react";
import { memo } from "react";
import { IArticleItem } from "@/assets/interface/article";
import { formatChangeTime } from "@/utils/formatTime";
import styles from "./articleListItem.module.less";

import { Divider, Image } from "antd";

interface IProps {
  article: IArticleItem
}


const ArticleListItem: React.FC<IProps> = (props) => {
  const { article } = props;  
  return (
    <div className={styles.articleListItem}>
      <div className={styles.artHead}>
        <span className={styles.author}>{article.author.username}</span>
        <Divider type="vertical" />
        <span>{formatChangeTime(article.time)}</span>
        <Divider type="vertical" />
        <span>{article.label}</span>
      </div>
      <div className={styles.artBody}>
        <div className={styles.artInfo}>
          <div className={styles.artTitle+" SgtextOms"}>
            {article.title}
          </div>
          <div className={styles.artContent + " textOms"}>
            {article.content}
          </div>
        </div>
        <div className={styles.artIMG}>
          {
            article.image && (<Image src={article.image} height={80} width={120} alt={article.title}></Image>)
          }
        </div>
      </div>
    </div>
  );
};

export default memo(ArticleListItem);
ArticleListItem.displayName = "ArticleListItem";