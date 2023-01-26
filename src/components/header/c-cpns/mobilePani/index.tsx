import React, { ReactNode } from "react";
import { memo, useState, useRef, useCallback } from "react";

import styles from "./styles.module.less";
import classNames from "classnames";

import Link from "next/link";
import { IHeader } from "@/assets/interface/header";

interface IProps {
  children?: ReactNode;
  originHeader: IHeader[];
}

const MobilePani: React.FC<IProps> = (props) => {
  const { originHeader } = props;
  const [clickMenu, setClickMenu] = useState(false);
  const [initialIndex, setIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickMenu = useCallback(() => {
    setClickMenu(!clickMenu);
  }, [clickMenu]);
  const changeCurrentIndex = (index: number) => {
    setIndex(index);
  };
  return (
    <div className={styles.mobilePanigate} ref={menuRef}>
      <div className={styles.mobileMenu} onClick={handleClickMenu}>
        <span className={styles.mobileName}>首页</span>
        <svg
          data-v-77c302d8=""
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(
            {
              transformMenu: clickMenu === true,
            },
            styles.unfold16Icon
          )}
        >
          <path
            data-v-77c302d8=""
            d="M2.45025 4.82431C2.17422 4.49957 2.40501 4.00049 2.83122 4.00049H9.16878C9.59498 4.00049 9.82578 4.49957 9.54975 4.82431L6.38097 8.55229C6.1813 8.78719 5.8187 8.78719 5.61903 8.55229L2.45025 4.82431Z"
          ></path>
        </svg>
      </div>
      <div
        className={classNames(
          {
            [styles.phoneMenuHidden]: clickMenu === false,
          },
          styles.phoneMenuDetail
        )}
      >
        {originHeader &&
          originHeader.map((item: any, index: number) => {
            return (
              <Link
                href={item.url}
                key={item.url}
                className={styles.mobileItem}
                onClick={() => {
                  changeCurrentIndex(index);
                }}
              >
                <span
                  className={classNames(
                    {
                      active: index === initialIndex,
                    },
                    [styles.mobileTextName]
                  )}
                >
                  {item.name}
                </span>
                {item.label && (
                  <span className={styles.newLabelV2}>{item.label}</span>
                )}
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default memo(MobilePani);
MobilePani.displayName = "MobilePani";
