import React from "react";
import { memo } from "react";
import { IArticleItem } from "@/assets/interface/article";
import { formatChangeTime } from "@/utils/formatTime";
import styles from "./articleListItem.module.less";

import Link from "next/link";
import { Divider } from "antd";
import { Popover } from "antd";
import Image from "next/image";
import AuthorListItem from "../authorListItem";

interface IProps {
  article: IArticleItem
}

const ArticleListItem: React.FC<IProps> = (props) => {
  const { article } = props;
  const content = (
    <div style={{ width: "250px" }}>
      <AuthorListItem author={article.author} />
    </div>
  );

  return (
    <Link href={"/article/" + article.id} style={{textDecoration:"none"}}>
      <div className={styles.articleListItem}>
        <div className={styles.artHead}>
          <span className={styles.pcAuthor}>
            <Popover content={content} trigger="hover">
              <span className={styles.author}>{article.author.username}</span>
            </Popover>
          </span>
          <span className={styles.mobileAuthor}>
            <span className={styles.author}>{article.author.username}</span>
          </span>
          <Divider type="vertical" />
          <span>{formatChangeTime(article.time)}</span>
          <Divider type="vertical" />
          <span>{article.label}</span>
        </div>
        <div className={styles.artBody}>
          <div className={styles.artInfo}>
            <div className={styles.artTitle + " SgtextOms"} title={article.title}>
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
    </Link>
  );
};

export default memo(ArticleListItem);
ArticleListItem.displayName = "ArticleListItem";