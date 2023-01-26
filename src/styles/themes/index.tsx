import dynamic from "next/dynamic";
const list: Record<string, any> = {
  "github": dynamic(() => import("./github"), { ssr: true }),
  "juejin": dynamic(() => import("./juejin"), { ssr: true }),
  "vuepress": dynamic(() => import("./vuepress"), { ssr: true }),
  "smartblue": dynamic(() => import("./smartblue"), { ssr: true }),
  "condensed-night-purple": dynamic(() => import("./condensed-night-purple"), { ssr: true }),
  "greenwillow": dynamic(() => import("./greenwillow"), { ssr: true }),
  "hydrogen": dynamic(() => import("./hydrogen"), { ssr: true }),
  "fancy": dynamic(() => import("./fancy"), { ssr: true }),
};
export default list;
