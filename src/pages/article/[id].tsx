import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { getArticle } from "@/store/modules/article";
import { store } from "@/store";
import { IArticleInitialState } from "@/store/modules/article";
import { IAppDispatch } from "@/store";
import Image from "next/image";
import styles from "@/styles/Article.module.less";
import Anchor from "@/components/anchor";
import Panel from "@/components/panel";
import { marked } from "marked";
import { toToc } from "@/components/anchor";
import _ from "lodash";
import { nextTick } from "process";
const Article: React.FC = () => {
  const [article, setArticle] = useState<IArticleInitialState>({} as IArticleInitialState);
  const catalogContent = useRef<string>("");
  const renderContent = useRef<string>("");
  const articleRef = useRef<HTMLDivElement | null>(null);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const articleCatalogRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<IAppDispatch>();
  useEffect(() => {
    // useEffect响应两次 优化 todo
    if (!router.isReady || renderContent.current || catalogContent.current) return;
    const getData = async () => {
      await getArticle(router.query.id as string, dispatch);
      setArticle({ ...store.getState().article, content: '# 阿瑟 \n 阿瑟多回家看看坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷 \n # 阿瑟 撒谎的健康坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷看看·' });
      let data = marked.parse(article.content || "");
      const toc = data.match(/<[hH][1-6].*?>.*?<\/[hH][1-6].*?>/g) as string[];
      toc?.forEach((item: string, index: number) => {
        let _toc = `<div data-id="heading-${index}">${item} </div>`;
        data = data.replace(item, _toc);
      });
      catalogContent.current = toToc(toc);
      renderContent.current = data;
    };
    const routeChange = () => {
      console.log("~~~~~~~~~~~~~~~~~~~")
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
          console.log(location.hash, child.offsetTop)
          window.scrollTo({
            top: child.offsetTop,
          });
        }
      }
    };
    const handleScroll = (e: any) => {
      if (e.path[1].pageYOffset >= 560) {
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
          e.path[1].pageYOffset >= titleList[i] &&
          e.path[1].pageYOffset < titleList[i + 1]
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
        }
      }
    };
    nextTick(() => {
      getData();
      // 初始化监控hash todo
      routeChange();
    });
    window.addEventListener("hashchange", routeChange);
    window.addEventListener("scroll", _.throttle(handleScroll, 0));
    return () => {
      // 移除监听 todo
    };
  }, [router.isReady, article, dispatch, router.query.id]);
  return (
    <div className={styles.view_container}>
      <div className={styles.main_container}>
        <Panel article={article} />
        <div className={styles.column_view}>
          <div className={styles.article_area}>
            <article className={styles.article}>
              <h1 className={styles.article_title}>{article.title}</h1>
              <div className={styles.author_info_wrapper}>
                {article.author?.avatar && <Image
                  className={styles.author_img}
                  src={article.author?.avatar || ''}
                  alt="个人头像"
                  width="100"
                  height="100"
                />}
                <div className={styles.author_info_box}>
                  <div className={styles.author_name}>
                    <span>{article.author?.username}</span>
                  </div>
                  <div className={styles.meta_box}>
                    <span className={styles.time}>{article.time}</span>
                    <span className={styles.view_count}>
                      {" "}
                      阅读 {article.view_count}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.background_box}>
                {article?.image && <Image
                  className={styles.article_background}
                  src={article?.image || ''}
                  alt="文章背景"
                  width="400"
                  height="400"
                />}
              </div>
              <div
                style={{ whiteSpace: "pre-line" }}
                className={styles.article_content}
                ref={articleRef}
                dangerouslySetInnerHTML={{ __html: renderContent.current }}
              ></div>
            </article>
          </div>
          <div className={styles.article_sidebar}>
            <div className={styles.author_block}>
              {article.author?.avatar && <Image
                className={styles.author_img}
                src={article.author?.avatar || ''}
                alt="个人头像"
                width="100"
                height="100"
              />}
              <div className={styles.info_box}>
                <span className={styles.username}>
                  {article.author?.username}
                </span>
                <span className={styles.description}>
                  {article.author?.description}
                </span>
              </div>
            </div>
            <div className={styles.related_articles}>
              <div className={styles.block_title}>相关文章</div>
              <div className={styles.entry_list}>
                {article.related_articles?.map((article) => {
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
            <div ref={articleCatalogRef} className={styles.article_catalog}>
              <div className={styles.catalog_title}>目录</div>
              <div ref={catalogRef} className={styles.catalog}>
                {/* todo Anchor 组件 */}
                <Anchor catalogContent={catalogContent.current} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Article);
