import request from "./index";

export function getArticleById(id: number) {
  return request.get("/api/article", { id });
}

export function getAdvertisementById(id: number) {
  return request.get("/api/advertisement", { id });
}
