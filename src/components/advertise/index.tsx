import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { memo } from "react";
import AdItem from "./c-cpns/ad-item";
import Download from "./c-cpns/download";
import styles from "./style.module.less";
import { throttle } from "lodash";
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
  const [isHide, setHide] = useState(false);
  let scrollTop = 0;
  let contentHeight = 0;

  let scrollTopV2 = 0;
  let topValue = 0;
  let contentHeightV2 = 0;

  const getScollTopV2 = () => {
    let scrollTopV2 = 0;
    if (document?.documentElement && document?.documentElement?.scrollTop) {
      scrollTopV2 = document?.documentElement.scrollTop;
      contentHeightV2 = document?.documentElement.clientHeight;
    } else if (document?.body) {
      scrollTopV2 = document?.body.scrollTop;
      contentHeightV2 = document?.body.clientHeight;
    }
    return scrollTopV2;
  };
  const handleScrollV2 = () => {
    scrollTopV2 = getScollTopV2();
    let direction: string;
    if (scrollTopV2 <= topValue) {
      direction = "top";
    } else {
      direction = "bottom";
    }
    topValue = scrollTopV2;
    if (scrollTopV2 >= contentHeightV2 * 0.2 && direction === "bottom") {
      setHide(true);
    } else if (scrollTopV2 >= contentHeightV2 * 0.2 && direction === "top") {
      setHide(false);
    } else {
      setHide(false);
    }
  };

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

  const bindHandleScrollV2 = React.useRef(
    throttle(handleScrollV2, 100)
  ).current;

  useEffect(() => {
    window.addEventListener("scroll", bindHandleScrollV2);
    return () => {
      window.removeEventListener("scroll", bindHandleScrollV2);
    };
  }, [bindHandleScrollV2]);

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
        [styles.notHide]: isHide === false,
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
