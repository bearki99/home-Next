import myRequest from "@/service/index";
/**
 * 类别column
 */
export interface HeadType {
  id: string;
  labels?: articleTags[];
  name: string;
}

/**
 * 文章标签
 */

export interface articleTags {
  id: string;
  label: string;
}

export const getHeaderTags = () => {
  return myRequest.get("/api/column");
};
export const getOriginHeader = () => {
  return myRequest.get("/api/getroutes");
};
