import classNames from "classnames";
import React, { ReactNode, useCallback, useState } from "react";
import { memo } from "react";
import styles from "./style.module.less";
interface IProps {
  children?: ReactNode;
  infoData?: IAdvertise;
}
export interface IAdvertise {
  content: string;
  id: number;
  image: string;
  title: string;
}
const ADItem: React.FC<IProps> = (props) => {
  const { infoData} = props;
  const image = infoData && infoData.image;
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(false);
  const handleShow = useCallback(() => {
    setFlag(true);
    setFlag2(false);
  }, []);
  const handleHide = useCallback(() => {
    setFlag(false);
    setFlag2(true);
  }, []);
  return (
    <div
      className={classNames(
        [styles.adContent]
      )}
    >
      <img src={image} alt="广告" className={styles.adImg} />
      <div
        className={classNames(
          {
            [styles.show]: flag === true,
            [styles.hide]: flag === false,
          },
          [styles.btn1],
          [styles.btn]
        )}
        onMouseEnter={handleHide}
      >
        <span>广告</span>
      </div>
      <div
        className={classNames(
          {
            [styles.show]: flag2 === true,
            [styles.hide]: flag2 === false,
          },
          [styles.btn2],
          [styles.btn]
        )}
        onMouseLeave={handleShow}
      >
        投放广告
      </div>
    </div>
  );
};
export default memo(ADItem);
ADItem.displayName = "ADItem";
