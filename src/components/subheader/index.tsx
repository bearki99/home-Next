import React, { ReactNode } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.less";
import Link from "next/link";
import classNames from "classnames";
import { changeinitialSubIndexAction } from "../header/store";
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
                  >
                    <span className={styles.text}>
                      {item.name.substring(0, 2)}
                    </span>
                  </Link>
                  {item.labels && (
                    <div className={styles.hoverItem}>
                      {item.labels.map((item: any) => {
                        return <Link key={item.id} href={item.id} className={styles.gotoItem}>{item.label}</Link>;
                      })}
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
