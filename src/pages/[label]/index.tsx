import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const MainContent: React.FC<IProps> = () => {
  const router = useRouter();
  const { label = "recommended" } = router.query;
  return <div>MainContent:{label}</div>;
};
export default memo(MainContent);
MainContent.displayName = "MainContent";
