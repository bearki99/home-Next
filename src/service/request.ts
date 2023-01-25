import request from "@/service/index";
import { IArticleListRequest } from "@/assets/interface/article";

export function getArticleListApi(data:IArticleListRequest){
  return request.get("/api/getArticles",data);
}
export function getAuthorListApi(){
  return request.get("/api/authorsRank");
}