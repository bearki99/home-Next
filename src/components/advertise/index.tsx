import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { memo } from "react";
import AdItem from "./c-cpns/ad-item";
import Download from "./c-cpns/download";
import styles from "./style.module.less";
import { throttle } from "lodash-es";

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
  const { advertiseData} = props;
  const [isHide, setHide] = useState(false);
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

  const bindHandleScrollV2 = React.useRef(
    throttle(handleScrollV2, 100)
  ).current;

  useEffect(() => {
    window.addEventListener("scroll", bindHandleScrollV2);
    return () => {
      window.removeEventListener("scroll", bindHandleScrollV2);
    };
  }, [bindHandleScrollV2]);

  return (
    <div className={styles.container}>
      <div
        className={classNames([styles.all], {
          [styles.isHide]: isHide === true,
          [styles.notHide]: isHide === false,
        })}
      >
        <div className={styles.content}>
          {advertiseData &&
            advertiseData.map((item: IAdvertise) => {
              return <AdItem key={item.id} infoData={item} id={item.id}/>;
            })}
          <Download />
        </div>
      </div>
    </div>
  );
};
export default memo(Advertise);
Advertise.displayName = "Advertise";
