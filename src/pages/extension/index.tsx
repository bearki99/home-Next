import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// 插件页面
const Extension: React.FC<IProps> = () => {
  return <div>Extension</div>;
};
export default memo(Extension);
Extension.displayName = "Extension";
