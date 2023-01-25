import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { memo } from "react";
import AdItem from "./c-cpns/ad-item";
import Download from "./c-cpns/download";
import styles from "./style.module.less";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import { IAppState } from "@/store";
interface IProps {
  children?: ReactNode;
  advertiseData?: any;
}
interface IAdvertise {
  content: string;
  id: number;
  /**
   * base64
   */
  image: string;
  title: string;
}
const Advertise: React.FC<IProps> = (props) => {
  const { advertiseData } = props;
  const [sticky, setSticky] = useState(false);
  let scrollTop = 0;
  let contentHeight = 0;
  const { isHide } = useSelector((state: IAppState) => ({
    isHide: state.header.isHide,
  }));
  const getScollTop = () => {
    let scrollTop = 0;
    if (document?.documentElement && document?.documentElement?.scrollTop) {
      scrollTop = document?.documentElement.scrollTop;
      contentHeight = document?.documentElement.clientHeight;
    } else if (document?.body) {
      scrollTop = document?.body.scrollTop;
      contentHeight = document?.body.clientHeight;
    }
    return scrollTop;
  };
  const handleScroll = () => {
    scrollTop = getScollTop();
    if (scrollTop >= contentHeight * 0.7) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const bindHandleScroll = React.useRef(throttle(handleScroll, 100)).current;

  useEffect(() => {
    window.addEventListener("scroll", bindHandleScroll);
    return () => {
      window.removeEventListener("scroll", bindHandleScroll);
    };
  }, [bindHandleScroll]);

  return (
    <div
      className={classNames([styles.all], {
        [styles.sticky]: sticky === true,
        [styles.isHide]: isHide === true,
        [styles.notHide]: isHide === false
      })}
    >
      <div className={styles.content}>
        {advertiseData &&
          advertiseData.map((item: IAdvertise) => {
            return <AdItem key={item.id} infoData={item} />;
          })}
        <Download />
      </div>
    </div>
  );
};
export default memo(Advertise);
Advertise.displayName = "Advertise";
