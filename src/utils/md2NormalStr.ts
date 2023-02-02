import { marked } from "marked";
export default function md2NormalStr(str?:string):string{
  if(!str) return "";
  const articleContentList = str.split("\n");
  if (articleContentList[0] === "---") {
    for (let i = 1; i < articleContentList.length; i++) {
      if (articleContentList[i] === "---") {
        articleContentList.splice(0, i + 1);
      }
    }
  }
  let data = marked.parse(articleContentList.join("\n") || "");
  data = data.replace(/<\/?.+?>/gi,"");
  return data;
}