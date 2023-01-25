import MainContent from "@/pages/[label]";
import wrapper from "@/store";
import { GetServerSideProps } from "next";
import { getHeaderTags, getOriginHeader } from "@/components/header/service";
import { getAdvertiseData } from "@/components/advertise/service";
interface IProps {
  homeTags: any[];
  advertiseData: any[];
}
export default function HomePage(props: IProps) {
  const { homeTags, advertiseData } = props;
  return (
    <>
      <MainContent homeTags={homeTags} advertiseData={advertiseData}/>
    </>
  );
}
HomePage.displayName = "HomePage";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function () {
    return async () => {
      const res = await getOriginHeader();
      const homeTags = await getHeaderTags();
      const advertiseData = await getAdvertiseData();
      return {
        props: {
          originHeader: res || [],
          homeTags: homeTags.data || [],
          advertiseData: advertiseData.data || [],
        },
      };
    };
  });
