import React, { useEffect, useRef, memo, useCallback } from "react";
import wrapper from "@/store";
import { getArticleByIdAction, IArticleInitialState } from "@/store/modules/article";
import Image from "next/image";
import styles from "@/styles/Article.module.less";
import Anchor from "@/components/anchor";
import Panel from "@/components/panel";
import { marked } from "marked";
import { toToc } from "@/components/anchor";
import { GetServerSideProps } from "next";
import MdViewer from "@/components/mdRender/mdViewer/index";
import { getOriginHeader } from "@/components/header/service";
import Head from "next/head";

interface IProps {
  article: IArticleInitialState,
  catalogContent: string,
  renderContent: string,
  articleTime: string,
}

const Article: React.FC<IProps> = (props: IProps) => {
  const { article, catalogContent, articleTime } = props;
  const articleRef = useRef<HTMLDivElement | null>(null);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const relatedArticleRef = useRef<HTMLDivElement | null>(null);
  const articleCatalogRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = useCallback(() => {
    const divList = articleRef.current?.getElementsByClassName("heading") as HTMLCollection;
    if (!divList || !articleCatalogRef.current) return;
    if (window.scrollY >= (relatedArticleRef.current ? relatedArticleRef.current.offsetHeight : 0) + 191) {
      (articleCatalogRef.current as HTMLDivElement).style.position = "fixed";
    } else {
      (articleCatalogRef.current as HTMLDivElement).style.position = "relative";
    }

    const titleList: Array<number> = [];
    for (let i = 0; i < divList.length; i++) {
      const child = divList[i] as HTMLElement;
      titleList.push(child.offsetTop);
    }
    titleList.push(2 * titleList[titleList.length - 1]);
    let i = 0;
    for (; i < titleList.length - 1; i++) {
      if (window.scrollY >= titleList[i] && window.scrollY < titleList[i + 1]) {
        break;
      }
    }
    const itemList = catalogRef.current?.getElementsByClassName("item") as HTMLCollection;
    for (let j = 0; j < itemList.length; j++) {
      const child = itemList[j];
      child.classList.remove("active");
      if (i === j) {
        child.classList.add("active");
      }
    }
  }, []);
  const routeChange = useCallback(() => {
    const itemList = catalogRef.current?.getElementsByClassName("item") as HTMLCollection;
    if (!itemList) return;
    for (let i = 0; i < itemList.length; i++) {
      const child = itemList[i];
      child.classList.remove("active");
      if (child.getAttribute("href") === location.hash) {
        child.classList.add("active");
      }
    }
    const divList = articleRef.current?.getElementsByClassName("heading") as HTMLCollection;
    for (let i = 0; i < divList.length; i++) {
      const child = divList[i] as HTMLElement;
      if ("#" + child.getAttribute("data-id") === location.hash) {
        window.scrollTo({
          top: child.offsetTop,
        });
        break;
      }
    }
  }, []);
  useEffect(() => {
    window.addEventListener("hashchange", routeChange);
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => routeChange(), 1000);
    return () => {
      window.removeEventListener("hashchange", routeChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta
          data-n-head="ssr"
          name="description"
          content={article.content}
        />
        <meta
          data-n-head="ssr"
          name="keywords"
          content={article.label}
        />
      </Head>
      <div className={styles.view_container}>
        <div className={styles.main_container}>
          <Panel article={article} />
          <div className={styles.column_view}>
            <div className={styles.article_area}>
              <article className={styles.article}>
                <h1 className={styles.article_title}>{article && article.title}</h1>
                <div className={styles.author_info_wrapper}>
                  {article && <Image
                    className={styles.author_img}
                    src={article.author.avatar}
                    alt="个人头像"
                    width="100"
                    height="100"
                  />}
                  <div className={styles.author_info_box}>
                    <div className={styles.author_name}>
                      <span>{article && article.author.username}</span>
                    </div>
                    <div className={styles.meta_box}>
                      <span className={styles.time}>{articleTime}</span>
                      <span className={styles.view_count}>
                        &nbsp;&nbsp;·&nbsp;&nbsp;阅读  {article.view_count}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.background_box}>
                  {article.image && <Image
                    className={styles.article_background}
                    src={article.image}
                    alt="文章背景"
                    width="400"
                    height="400"
                  />}
                </div>
                <div ref={articleRef}>
                  <MdViewer value={article.content} themeName={article.theme} />
                </div>
              </article>
            </div>
            <div className={styles.article_sidebar}>
              <div className={styles.author_block}>
                {article && <Image
                  className={styles.author_img}
                  src={article.author.avatar}
                  alt="个人头像"
                  width="100"
                  height="100"
                />}
                <div className={styles.info_box}>
                  <span className={styles.username}>
                    {article && article.author.username}
                  </span>
                  <span className={styles.description}>
                    {article && article.author.description}
                  </span>
                </div>
              </div>
              {article.related_articles.length !== 0 && <div className={styles.related_articles} ref={relatedArticleRef}>
                <div className={styles.block_title}>相关文章</div>
                <div className={styles.entry_list}>
                  {article.related_articles.map((article) => {
                    return (
                      <>
                        <div className={styles.item}>
                          <div className={styles.entry_title}>
                            {article.title}
                          </div>
                          <div className={styles.entry_meta_box}>
                            <span className={styles.entry_meta}>
                              {article.like_count}点赞
                            </span>
                            <span className={styles.entry_meta}>
                              &nbsp;·&nbsp;
                            </span>
                            <span className={styles.entry_meta}>
                              {article.comment_count}评论
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>}
              {catalogContent !== "" && <div ref={articleCatalogRef} className={styles.article_catalog}>
                <div className={styles.catalog_title}>目录</div>
                <div
                  ref={catalogRef}
                  className={styles.catalog}
                  onClick={routeChange}
                >
                  <Anchor catalogContent={catalogContent} />
                </div>
              </div>}
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async (context) => {
    await store.dispatch(getArticleByIdAction(+ (context.query.id as string)));
    const article = store.getState().article;
    const res = await getOriginHeader();
    const date = new Date(+ (article.time));
    const articleTime = `${date.getFullYear()}年${(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1)}月${date.getDate()}日 ${(date.getHours() + 1 < 10 ? "0" + (date.getHours() + 1) : date.getHours() + 1)}:${(date.getMinutes() + 1 < 10 ? "0" + (date.getMinutes() + 1) : date.getMinutes() + 1)}`;
    // 处理可能存在的meta data
    const articleContentList = article.content.split("\n");
    if (articleContentList[0] === "---") {
      for (let i = 1; i < articleContentList.length; i++) {
        if (articleContentList[i] === "---") {
          articleContentList.splice(0, i + 1);
        }
      }
    }
    let data = marked.parse(articleContentList.join("\n") || "");
    const toc = data.match(/<[hH][1-3].*?>.*?<\/[hH][1-3].*?>/g) as string[];
    toc?.forEach((item: string, index: number) => {
      let _toc = `<div data-id="heading-${index}">${item} </div>`;
      data = data.replace(item, _toc);
    });
    const catalogContent = toToc(toc);
    return {
      props: {
        article,
        catalogContent,
        renderContent: data,
        articleTime,
        originHeader: res || [],
      },
    };
  };
});

export default memo(Article);
Article.displayName = "Article";

