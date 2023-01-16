import React, { ReactNode } from "react";
import data from "@/assets/data/header-data.json";
import styles from "./header.module.less";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeinitialIndexAction } from "./store";
interface IProps {
  children?: ReactNode;
  books?: any;
}
const LogoSrc =
  "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg";

const Header: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { initialIndex } = useSelector(
    (state: any) => ({
      initialIndex: state.header.initialIndex,
    }),
    shallowEqual
  );
  function changeCurrentIndex(index: number) {
    dispatch(changeinitialIndexAction(index));
  }
  return (
    <div className={styles.header}>
      <div className={styles.cotainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src={LogoSrc}
            className={styles.headerIcon}
            width={36}
            height={28}
            alt={"稀土掘金"}
          />
          <span className={styles.name}>稀土掘金</span>
        </Link>
        <div className={styles.nav}>
          <div className={styles.navPanigate}>
            {data &&
              data.map((item: any, index: number) => {
                return (
                  <div
                    className={styles.panigateItem}
                    key={item.url}
                    onClick={() => changeCurrentIndex(index)}
                  >
                    <Link
                      href={item.url}
                      className={classNames(
                        {
                          active: index === initialIndex,
                        },
                        [styles.panigateA]
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.label && (
                      <span className={styles.newLabel}>{item.label}</span>
                    )}
                  </div>
                );
              })}
          </div>
          <div className={styles.mobilePanigate}>aaa</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
Header.displayName = "Header";
