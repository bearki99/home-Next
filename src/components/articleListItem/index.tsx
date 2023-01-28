import React,{useState} from "react";
import { memo } from "react";
import { IArticleItem } from "@/assets/interface/article";
import { formatChangeTime } from "@/utils/formatTime";
import styles from "./articleListItem.module.less";
// import Router from "next/router";
import { Divider } from "antd";
import { Popover } from "antd";
import Image from "next/image";
import {
  CloseOutlined
} from "@ant-design/icons";
import AuthorListItem from "../authorListItem";


interface IProps {
  article: IArticleItem
}

const ArticleListItem: React.FC<IProps> = (props) => {
  const [isClosed,setIsClosed] = useState(false);
  const { article } = props;
  const content = (
    <div style={{ width: "250px" }}>
      <AuthorListItem author={article.author} />
    </div>
  );


  return (
    <div className={styles.articleListItem+` ${isClosed?styles.closed:""}`} onClick={()=>{window.open("/article/" + article.id);}}>
      <div className={styles.artHead}>
        <div className={styles.artHeadLeft}>
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
          {article.label && <Divider type="vertical" />}
          <span>{article.label}</span>
        </div>
        <div className={styles.artHeadRight} onClick={(e) => {e.stopPropagation();setIsClosed(true);}} >
          <CloseOutlined className={styles.artHeadClose}/>
        </div>
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
  );
};

export default memo(ArticleListItem);
ArticleListItem.displayName = "ArticleListItem";
