import React, { ReactNode, useEffect, useRef, useState } from "react";
import data from "@/assets/data/header-data.json";
import styles from "./header.module.less";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeinitialIndexAction } from "./store";
import HeaderInput from "./c-cpns/input";
interface IProps {
  children?: ReactNode;
  books?: any;
}
const LogoSrc =
  "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg";

const Header: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const [clickMenu, setClickMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { initialIndex } = useSelector(
    (state: any) => ({
      initialIndex: state.header.initialIndex,
    }),
    shallowEqual
  );
  function changeCurrentIndex(index: number) {
    dispatch(changeinitialIndexAction(index));
  }
  function handleClickMenu() {
    setClickMenu(!clickMenu);
  }
  //增加点击监听
  function clickCallback(event: any) {
    if (menuRef.current && menuRef.current.contains(event.target)) {
      return;
    } else {
      setClickMenu(false);
    }
  }
  useEffect(() => {
    if (clickMenu) {
      document.addEventListener("click", clickCallback, false);
      return () => {
        document.removeEventListener("click", clickCallback, false);
      };
    }
  }, [clickMenu]);
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
          <div className={styles.navList}>
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
                {data &&
                  data
                    .slice(0, data.length - 2)
                    .map((item: any, index: number) => {
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
                        </Link>
                      );
                    })}
              </div>
            </div>
          </div>

          <div className={styles.rightSide}>
            <HeaderInput/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
Header.displayName = "Header";
