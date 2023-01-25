import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// 活动页面
const Events: React.FC<IProps> = () => {
  return <div>Events</div>;
};
export default memo(Events);
Events.displayName = "Events";
