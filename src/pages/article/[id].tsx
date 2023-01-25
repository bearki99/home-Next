import React, { useEffect, useRef, memo } from "react";
import wrapper from "@/store";
import { getArticleByIdAction, IArticleInitialState } from "@/store/modules/article";
import Image from "next/image";
import styles from "@/styles/Article.module.less";
import Anchor from "@/components/anchor";
import Panel from "@/components/panel";
import { marked } from "marked";
import { toToc } from "@/components/anchor";
import { GetServerSideProps } from "next";
import DynamicThemeComponents from "@/styles/themes";
interface IProps {
  article: IArticleInitialState,
  catalogContent: string,
  renderContent: string,
  articleTime: string,
}
const Article: React.FC<IProps> = (props: IProps) => {
  const { article, catalogContent, renderContent, articleTime } = props;
  const articleRef = useRef<HTMLDivElement | null>(null);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const articleCatalogRef = useRef<HTMLDivElement | null>(null);
  const DynamicComponent = DynamicThemeComponents[article.theme];
  useEffect(() => {
    const routeChange = () => {
      const itemList = catalogRef.current?.getElementsByClassName(
        "item"
      ) as HTMLCollection;
      for (let i = 0; i < itemList.length; i++) {
        const child = itemList[i];
        child.classList.remove("active");
        if (child.getAttribute("href") === location.hash) {
          child.classList.add("active");
        }
      }
      const divList = articleRef.current?.getElementsByTagName(
        "div"
      ) as HTMLCollection;
      for (let i = 0; i < divList.length; i++) {
        const child = divList[i] as HTMLElement;
        if ("#" + child.getAttribute("data-id") === location.hash) {
          window.scrollTo({
            top: child.offsetTop,
          });
        }
      }
    };
    const handleScroll = () => {
      if (window.scrollY >= 560) {
        (articleCatalogRef.current as any).style.position = "fixed";
      } else {
        (articleCatalogRef.current as any).style.position = "relative";
      }
      const divList = articleRef.current?.getElementsByTagName(
        "div"
      ) as HTMLCollection;
      const titleList: Array<number> = [];
      for (let i = 0; i < divList.length; i++) {
        const child = divList[i] as HTMLElement;
        titleList.push(child.offsetTop);
      }
      titleList.push(2 * titleList[titleList.length - 1]);
      let i = 0;
      for (; i < titleList.length - 1; i++) {
        if (
          window.scrollY >= titleList[i] &&
          window.scrollY < titleList[i + 1]
        ) {
          break;
        }
      }
      const itemList = catalogRef.current?.getElementsByClassName(
        "item"
      ) as HTMLCollection;
      for (let j = 0; j < itemList.length; j++) {
        const child = itemList[j];
        child.classList.remove("active");
        if (i === j) {
          child.classList.add("active");
          location.hash = `#heading-${i}`;
        }
      }
    };
    window.addEventListener("hashchange", routeChange);
    window.addEventListener("scroll", handleScroll);
    routeChange();
    return () => {
      window.removeEventListener("hashchange", routeChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
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
              <div className="markdown-body">
                <DynamicComponent />
                <div
                  style={{ whiteSpace: "pre-line" }}
                  className={styles.article_content}
                  ref={articleRef}
                  dangerouslySetInnerHTML={{ __html: renderContent }}
                >
                </div>
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
            <div className={styles.related_articles}>
              <div className={styles.block_title}>相关文章</div>
              <div className={styles.entry_list}>
                {article && article.related_articles.map((article) => {
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
            </div>
            {catalogContent !== "" && <div ref={articleCatalogRef} className={styles.article_catalog}>
              <div className={styles.catalog_title}>目录</div>
              <div ref={catalogRef} className={styles.catalog}>
                <Anchor catalogContent={catalogContent} />
              </div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async (context: any) => {
    await store.dispatch(getArticleByIdAction(context.query.id));
    const article = store.getState().article;
    const articleTime = article.time.replace("-", "年").replace("-", "月").replace(" ", "日 ").substring(0, article.time.lastIndexOf(":") + 1);
    let data = marked.parse(article.content || "");
    const toc = data.match(/<[hH][1-6].*?>.*?<\/[hH][1-6].*?>/g) as string[];
    toc?.forEach((item: string, index: number) => {
      let _toc = `<div data-id="heading-${index}">${item} </div>`;
      data = data.replace(item, _toc);
    });
    const catalogContent = toToc(toc);
    return {
      props: { article, catalogContent, renderContent: data, articleTime },
    };
  };
});

export default memo(Article);
Article.displayName = "Article";
