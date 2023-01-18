import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const HomeMainContent: React.FC<IProps> = () => {
  return <div>MainContent</div>;
};
export default memo(HomeMainContent);
HomeMainContent.displayName = "HomeMainContent";
