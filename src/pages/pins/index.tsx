import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// 沸点页面
const Pins: React.FC<IProps> = () => {
  return <div>Pins</div>;
};
export default memo(Pins);
Pins.displayName = "Pins";
