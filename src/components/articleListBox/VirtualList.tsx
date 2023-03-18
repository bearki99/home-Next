import React, { useEffect, useState } from "react";
import { memo } from "react";
import ArticleListItem from "@/components/articleListItem";
import AdvertiseListItem from "../advertiseListItem";
import { IAdvertisement } from "@/assets/interface/advertise";
import { IArticleItem } from "@/assets/interface/article";

type VirtualListProps = {
  height: number;
  itemCount: number;
  itemSize: number;
  infoData: any[];
};

const VirtualList = ({
  height,
  itemCount,
  itemSize,
  infoData,
}: VirtualListProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItemCount = Math.ceil(height / itemSize);
  const totalHeight = itemCount * itemSize;

  const startIndex = Math.max(Math.floor(scrollTop / itemSize) - 1, 0);
  const endIndex = Math.min(startIndex + visibleItemCount, itemCount);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setScrollTop(scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div style={{ height: `${totalHeight}px`, position: "relative" }}>
      <div style={{ height: `${totalHeight}px` }}>
        {infoData.slice(startIndex, endIndex + 1).map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${(startIndex + index) * itemSize}px`,
              width: "100%",
              height: `${itemSize}px`,
            }}
          >
            {item.isAdvertise ? (
              <AdvertiseListItem
                advertise={item.content as IAdvertisement}
                key={item.content.id + "-广告"}
              />
            ) : (
              <ArticleListItem
                article={item.content as IArticleItem}
                key={item.content.id}
              ></ArticleListItem>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(VirtualList);
VirtualList.displayName = "VirtualList";
