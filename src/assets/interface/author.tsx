export interface Response {
  code: number;
  data: IAuthorList;
  msg: string;
}

export interface IAuthorList {
  list: IAuthor[];
}

/**
* 作者
*/
export interface IAuthor {
  article_count: string;
  /**
   * base64
   */
  avatar: string;
  description: string;
  id: number;
  username: string;
}
