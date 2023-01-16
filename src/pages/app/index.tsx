import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// APP页面
const App: React.FC<IProps> = () => {
  return <div>App</div>;
};
export default memo(App);
App.displayName = "App";
