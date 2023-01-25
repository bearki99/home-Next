import Advertise from "@/components/advertise";
import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import Subheader from "@/components/subheader";
import SubShow from "@/components/subshow";
import wrapper from "@/store";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { GetServerSideProps } from "next";
import { getAdvertiseData } from "@/components/advertise/service";
interface IProps {
  children?: ReactNode;
  homeTags?: any[];
  advertiseData?: any[];
}

const SubContent: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { label = "", names } = router.query;
  const { homeTags, advertiseData } = props;
  const labelTags = homeTags && homeTags.map((item: any) => item.url);
  const currentIndex = labelTags && labelTags.indexOf(label);
  return (
    <>
      {/* 次导航栏 */}
      {names && <Subheader homeTags={homeTags} />}
      <div className={styles.mainBG}>
        <div className={styles.mainContent}>
          {/* 次次导航栏 */}
          {label &&
            currentIndex &&
            homeTags &&
            homeTags[currentIndex] &&
            homeTags[currentIndex]?.labels.length > 0 &&
            (
              <SubShow currentsubTags={homeTags[currentIndex].labels} />
            )}


          {/* 广告模块 */}
          <Advertise advertiseData={advertiseData} />
        </div>
      </div>
    </>
  );
};
export default memo(SubContent);
SubContent.displayName = "SubContent";

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
