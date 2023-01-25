import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// 直播页面
const Live: React.FC<IProps> = () => {
  return <div>Live</div>;
};
export default memo(Live);
Live.displayName = "Live";
