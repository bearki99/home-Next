import React, { ReactNode, useCallback, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.less";
import Link from "next/link";
import classNames from "classnames";
import { changeinitialSubIndexAction } from "../header/store";
import { debounce } from "lodash";
interface IProps {
  children?: ReactNode;
}
const SubHeader: React.FC<IProps> = () => {
  let { homeTags, initialSubIndex } = useSelector((state: any) => ({
    homeTags: state.header.homeTags,
    initialSubIndex: state.header.initialSubIndex,
  }));
  homeTags = homeTags.slice(0, 1);
  const dispatch = useDispatch();
  const [showSubTags, setShowSubTags] = useState(false);
  const showTag = useCallback(
    debounce(() => setShowSubTags(true), 500),
    []
  );
  const hideTag = useCallback(
    debounce(() => setShowSubTags(false), 300),
    []
  );
  return (
    <div className={styles.container}>
      <div className={styles.headerList}>
        <div className={styles.leftContent}>
          {homeTags &&
            homeTags.map((item: any, index: number) => {
              return (
                <div key={item.id}>
                  <Link
                    href={item.id}
                    className={classNames(
                      {
                        active: index === initialSubIndex,
                      },
                      [styles.subheadItem]
                    )}
                    onClick={() => {
                      dispatch(changeinitialSubIndexAction(index));
                    }}
                    onMouseEnter={showTag}
                    onMouseLeave={hideTag}
                  >
                    <span className={styles.text}>
                      {item.name.substring(0, 2)}
                    </span>
                  </Link>
                  {item.labels && (
                    <div
                      className={classNames(
                        {
                          [styles.show]: showSubTags === true,
                          [styles.hide]: showSubTags === false,
                        },
                        [styles.hoverItem], [styles.forceHidden]
                      )}
                    >
                      <ul className={styles.tagList}>
                        {item.labels.map((item: any) => {
                          return (
                            <li key={item.id} className={styles.tag}>
                              <Link href={item.id} className={styles.gotoItem}>
                                {item.label.substring(0, 4)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
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
  );
};
export default memo(SubHeader);
SubHeader.displayName = "SubHeader";
