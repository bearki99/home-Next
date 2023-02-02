import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { memo, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styles from "./styles.module.less";
import Link from "next/link";
import classNames from "classnames";
import { debounce } from "lodash-es";
import { useRouter } from "next/router";
import { IAppState } from "@/store";
interface IProps {
  children?: ReactNode;
  homeTags?: any[];
}
const SubHeader: React.FC<IProps> = (props) => {
  const { homeTags } = props;
  let { isHide } = useSelector(
    (state: IAppState) => ({
      isHide: state.header.isHide,
    }),
    shallowEqual
  );
  const [showSubTags, setShowSubTags] = useState(false);
  const [currentIndex, changeIdx] = useState(-1);
  const [showLabel, setShowLabel] = useState(true);
  const myRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { names, label = "" } = router.query;
  const showTag = useRef(debounce(() => setShowSubTags(true), 500)).current;
  const hideTag = useCallback(() => {
    setShowSubTags(false);
  }, []);
  useEffect(() => {
    if (myRef.current && myRef.current?.offsetWidth >= 960) setShowLabel(false);
    else setShowLabel(true);
  }, []);
  return (
    <div className={styles.mysubHeader}>
      <div
        className={classNames([styles.container], {
          [styles.Chide]: isHide === true,
          [styles.Cshow]: isHide === false,
        })}
        id="con"
      >
        <div className={styles.headerList}>
          <div
            className={classNames([styles.leftContent])}
            ref={myRef}
          >
            <div className={styles.allItems}>
              <Link
                className={classNames([styles.subheadItem], {
                  active: label === "recommended" || label === "",
                })}
                href="/recommended"
              >
                <span className={styles.text}>综合</span>
              </Link>
            </div>
            {homeTags &&
              homeTags.map((item: any, index: number) => {
                return (
                  <div
                    className={styles.allItems}
                    key={item.id}
                    onMouseLeave={hideTag}
                  >
                    <Link
                      href={"/" + item.url}
                      className={classNames(
                        {
                          active: item.url == label,
                          [styles.changePad]: showLabel === false
                        },
                        [styles.subheadItem]
                      )}
                      onClick={() => {}}
                      onMouseEnter={() => {
                        showTag();
                        changeIdx(index);
                      }}
                    >
                      <span className={styles.text}>{item.name}</span>
                    </Link>

                    {showLabel && item.labels.length > 0 && (
                      <div
                        className={classNames(
                          {
                            [styles.show]:
                              showSubTags === true && index === currentIndex,
                            [styles.hide]: showSubTags === false,
                          },
                          [styles.hoverItem],
                          [styles.forceHidden]
                        )}
                      >
                        <div className={styles.tagList}>
                          {item &&
                            item.labels &&
                            item.labels.map((elem: any) => {
                              return (
                                <div
                                  key={elem.id}
                                  className={classNames(
                                    {
                                      [styles.activeItem]: names == elem.id,
                                    },
                                    [styles.tag]
                                  )}
                                >
                                  <Link
                                    href={"/" + item.url + "/" + elem.label}
                                    className={styles.gotoItem}
                                  >
                                    {elem.label}
                                  </Link>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(SubHeader);
SubHeader.displayName = "SubHeader";
