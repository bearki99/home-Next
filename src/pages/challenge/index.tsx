import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// 竞赛页面
const Challenge: React.FC<IProps> = () => {
  return <div>Challenge</div>;
};
export default memo(Challenge);
Challenge.displayName = "Challenge";
