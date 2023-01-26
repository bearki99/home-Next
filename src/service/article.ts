import request from "./index";

export function getArticleById(id: string) {
  return request.get("/api/article", { id });
}
