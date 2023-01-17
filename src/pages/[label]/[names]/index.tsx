import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const SubContent: React.FC<IProps> = () => {
  return <div>SubContent</div>;
};
export default memo(SubContent);
SubContent.displayName = "SubContent";
