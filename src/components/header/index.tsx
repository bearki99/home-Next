import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const Header: React.FC<IProps> = () => {
  return <div>Header</div>;
};
export default memo(Header);
Header.displayName = "Header";
