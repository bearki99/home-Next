import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { GetServerSideProps } from "next";
import Subheader from "@/components/subheader/index";
import SubContent from "./[names]/index";
import wrapper from "@/store";
import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import { getAdvertiseData } from "@/components/advertise/service";
import { useRouter } from "next/router";
interface IProps {
  children?: ReactNode;
  homeTags?: any;
  originHeader?: any;
  advertiseData?: any;
}
interface IItem {
  id: number;
  labels: any[];
  name: string;
  url: string;
}
const MainContent: React.FC<IProps> = (props) => {
  const { homeTags, advertiseData } = props;
  const urlArr = homeTags && homeTags.map((item: IItem) => item.url);
  const router = useRouter();
  const { label = "" } = router.query;
  const flag = urlArr.indexOf(label) !== -1;

  return flag ? (
    <>
      <Subheader homeTags={homeTags} />
      <SubContent advertiseData={advertiseData} homeTags={homeTags} />
    </>
  ) : (
    <div className={styles.mainBG}>
      <div className={styles.mainContent}></div>
    </div>
  );
};
export default memo(MainContent);
MainContent.displayName = "MainContent";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function () {
    return async () => {
      const res = await getOriginHeader();
      const subheader = await getHeaderTags();
      const advertiseData = await getAdvertiseData();
      return {
        props: {
          originHeader: res || [],
          homeTags: subheader.data || [],
          advertiseData: advertiseData.data || [],
        },
      };
    };
  });
