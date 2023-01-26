export interface IHeader {
  id: string;
  /**
   * 提供显示那个红色的图标的内容
   */
  label: string;
  /**
   * 提供名字 如首页、沸点、直播、课程等
   */
  name: string;
  /**
   * 如/、/pins、/course等
   */
  url: string;
}

export interface ISubHeader {
    id: number;
    labels: articleTag[];
    name: string;
}

/**
 * 文章标签
 */
export  interface articleTag {
    id: number;
    label: string;
}
