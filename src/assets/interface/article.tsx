export interface Response {
  code: number;
  data: Data;
  msg: string;
}

export interface Data {
  list: IArticleItem[];
}

/**
* 首页列表内文章item
*/
export interface IArticleItem {
  /**
   * 作者用户名
   */
  author: {
    article_count: string;
    /**
     * base64
     */
    avatar: string;
    description: string;
    id: number;
    username: string;
  };
  /**
   * 评论数
   */
  comment_count: string;
  /**
   * 正文内容的前100字
   */
  content: string;
  /**
   * baae64
   */
  image?: string;
  /**
   * 标签（分区）
   */
  label: string;
  /**
   * 点赞数
   */
  like_count: string;
  /**
   * 时间戳
   */
  time: string;
  /**
   * 标题
   */
  title: string;
  id: number;
  /**
   * 阅读数
   */
  view_count: string;
}

/**
* 作者用户名
*
* 作者
*/
export interface author {
  article_count: string;
  /**
   * base64
   */
  avatar: string;
  description: string;
  id: string;
  username: string;
}

export interface IArticleListRequest {
  size:number,
  page:number,
  label:string,
  type:string,
  subtab:string
}
