import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./header.module.less";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import classNames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeIsHideAction } from "./store";
import HeaderInput from "./c-cpns/input";
import { throttle } from "lodash-es";
import DarkBtn from "../dark-btn";
import MobilePani from "./c-cpns/mobilePani";
import { IHeader } from "@/assets/interface/header";
import { IAppState } from "@/store";
interface IProps {
  children?: ReactNode;
  originHeader?: IHeader[];
}
const LogoSrc =
  "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg";

const Header: React.FC<IProps> = (props) => {
  const { originHeader } = props;
  const dispatch = useDispatch();
  const [clickMenu, setClickMenu] = useState(false);
  const [initialIndex, setIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isHide } = useSelector(
    (state: IAppState) => ({
      isHide: state.header.isHide,
    }),
    shallowEqual
  );
  const changeCurrentIndex = (index: number) => {
    setIndex(index);
  };
  const handleClickMenu = useCallback(() => {
    setClickMenu(!clickMenu);
  }, [clickMenu]);
  //增加点击监听
  const clickCallback = useCallback(
    (event: any) => {
      if (menuRef.current && menuRef.current.contains(event.target)) {
        return;
      } else {
        setClickMenu(false);
      }
    },
    []
  );
  useEffect(() => {
    if (clickMenu) {
      document.addEventListener("click", clickCallback, false);
      return () => {
        document.removeEventListener("click", clickCallback, false);
      };
    }
  }, [clickMenu, clickCallback]);

  //添加滚动监听 目前设置>0.2*contentHeight就隐藏，在>0.2*contentHeight后，如果方向往上，就显示，往下就隐藏
  let scrollTop = 0;
  let topValue = 0;
  let contentHeight = 0;
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
    let direction: string;
    if (scrollTop <= topValue) {
      direction = "top";
    } else {
      direction = "bottom";
    }
    topValue = scrollTop;
    if (scrollTop >= contentHeight * 0.2 && direction === "bottom") {
      dispatch(changeIsHideAction(true));
    } else if (scrollTop >= contentHeight * 0.2 && direction === "top") {
      dispatch(changeIsHideAction(false));
    } else {
      dispatch(changeIsHideAction(false));
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
    <>
      <div className={styles.mymainHeader}>
        <div
          className={classNames(
            {
              [styles.show]: isHide === false,
              [styles.hide]: isHide === true,
            },
            [styles.header]
          )}
        >
          <div className={classNames([styles.cotainer])}>
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
                {originHeader && originHeader.length <= 12 && (
                  <>
                    <div className={styles.navPanigate}>
                      {originHeader &&

                        originHeader.map((item: IHeader, index: number) => {

                          return (
                            <div
                              className={styles.panigateItem}
                              key={item.id}
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
                                <span className={styles.newLabel}>
                                  {item.label}
                                </span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                    <div className={styles.mobilePanigate} ref={menuRef}>
                      <div
                        className={styles.mobileMenu}
                        onClick={handleClickMenu}
                      >
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
                          originHeader.map((item: IHeader, index: number) => {

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
                                  <span className={styles.newLabelV2}>
                                    {item.label}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  </>
                )}

                {originHeader && originHeader.length > 12 && (
                  <MobilePani originHeader={originHeader} />
                )}
              </div>

              <div className={styles.rightSide}>
                <DarkBtn />
                <HeaderInput />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
Header.displayName = "Header";
