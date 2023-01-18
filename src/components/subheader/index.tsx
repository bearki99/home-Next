import React, { ReactNode, useCallback, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.less";
import Link from "next/link";
import classNames from "classnames";
import {
  changecurrentsubTagsAction,
  changeinitialSubIndexAction,
} from "../header/store";
import { debounce } from "lodash";
import { useRouter } from "next/router";
interface IProps {
  children?: ReactNode;
}
const SubHeader: React.FC<IProps> = () => {
  let { homeTags, initialSubIndex, isHide } = useSelector((state: any) => ({
    homeTags: state.header.homeTags,
    initialSubIndex: state.header.initialSubIndex,
    isHide: state.header.isHide,
  }));
  const dispatch = useDispatch();
  const [showSubTags, setShowSubTags] = useState(false);
  const [currentIndex, changeIdx] = useState(-1);
  const router = useRouter();
  const { names } = router.query;
  const showTag = useCallback(
    debounce(() => setShowSubTags(true), 500),
    []
  );
  const hideTag = () => {
    setShowSubTags(false);
  };
  const handleClick = (item: any) => {
    dispatch(changecurrentsubTagsAction(item));
  };
  return (
    <div className={styles.mysubHeader}>
      <div
        className={classNames([styles.container], {
          [styles.Chide]: isHide === true,
          [styles.Cshow]: isHide === false,
        })}
      >
        <div className={styles.headerList}>
          <div className={styles.leftContent}>
            {homeTags &&
              homeTags.map((item: any, index: number) => {
                return (
                  <div
                    className={styles.allItems}
                    key={item.id}
                    onMouseLeave={hideTag}
                    onClick={() => handleClick(item.labels)}
                  >
                    <Link
                      href={"/" + item.id}
                      className={classNames(
                        {
                          active: index === initialSubIndex,
                        },
                        [styles.subheadItem]
                      )}
                      onClick={() => {
                        dispatch(changeinitialSubIndexAction(index));
                      }}
                      onMouseEnter={() => {
                        showTag();
                        changeIdx(index);
                      }}
                    >
                      <span className={styles.text}>
                        {item.name.substring(0, 2)}
                      </span>
                    </Link>
                    {item.labels && (
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
                                    href={"/" + item.id + "/" + elem.id}
                                    className={styles.gotoItem}
                                  >
                                    {elem.label.substring(0, 4)}
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
            <Link
              className={classNames(
                [styles.subheadItem],
                [styles.lastsubheadItem]
              )}
              href="/subcribe/subcribed"
            >
              标签管理
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(SubHeader);
SubHeader.displayName = "SubHeader";
