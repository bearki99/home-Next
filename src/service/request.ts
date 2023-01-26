// import request from "@/service/index"; //正式数据时候用这个，下面记得换成request

import { testRequest } from "@/service/index"; //pr时的测试

import { IArticleListRequest } from "@/assets/interface/article";

export function getArticleListApi(data: IArticleListRequest) {
  return testRequest.get("api/getArticles", data);
}
export function getAuthorListApi() {
  return testRequest.get("api/authorsRank");
}
