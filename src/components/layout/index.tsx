import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const { children } = props;
  return <div className="layout">{children}</div>;
};
export default memo(Layout);
Layout.displayName = "Layout";
