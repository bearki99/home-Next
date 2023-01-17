import Subheader from "@/components/subheader";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}

const MainContent: React.FC<IProps> = () => {
  const router = useRouter();
  const { label = "recommended" } = router.query;
  return (
    <div>
      {label === "recommended" && <Subheader />}
      {label}
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";
