import React, { ReactNode } from "react";
import { memo } from "react";
import Header from "../header";
interface IProps {
  children?: ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div className="layout">
      <Header />
      <div className="body">
        {children}
      </div>
    </div>
  );
};
export default memo(Layout);
Layout.displayName = "Layout";
