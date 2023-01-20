import { useRouter } from "next/router";
import React, { ReactNode, useCallback } from "react";
import { memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "./style.module.less";
import Link from "next/link";
import classNames from "classnames";
import { changeShowAllAction } from "../header/store";
import { IAppState } from "@/store";
interface IProps {
  children?: ReactNode;
  names?: any;
}

const SubShow: React.FC<IProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { label, names } = router.query;
  const { currentsubTags, showAll } = useSelector((state: IAppState) => ({
    currentsubTags: state.header.currentsubTags,
    showAll: state.header.showAll,
  }), shallowEqual);
  const changeshow = useCallback(() => {
    dispatch(changeShowAllAction(true));
  }, [dispatch]);
  return (
    <div className={styles.subshow}>
      <div className={styles.container}>
        <Link
          href={"/" + label}
          className={classNames(
            {
              [styles.activeItem]: names === undefined,
            },
            [styles.item]
          )}
        >
          <span>全部</span>
        </Link>
        {showAll || (currentsubTags && currentsubTags.length) < 9
          ? currentsubTags &&
            currentsubTags.map((item: any) => {
              return (
                <Link
                  href={"/" + label + "/" + item.id}
                  key={item.id}
                  className={classNames(
                    {
                      [styles.activeItem]: names == item.id,
                    },
                    [styles.item]
                  )}
                >
                  <span>{item.label.slice(0, 4)}</span>
                </Link>
              );
            })
          : currentsubTags &&
            currentsubTags.slice(0, 9).map((item: any) => {
              return (
                <Link
                  href={"/" + label + "/" + item.id}
                  key={item.label}
                  className={classNames(
                    {
                      [styles.activeItem]: names == item.id,
                    },
                    [styles.item]
                  )}
                >
                  <span>{item.label.slice(0, 4)}</span>
                </Link>
              );
            })}
        {!showAll && currentsubTags?.length >= 9 && (
          <div
            className={classNames([styles.item], [styles.allBtn])}
            onClick={changeshow}
          >
            <span>全部</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(SubShow);
SubShow.displayName = "SubShow";
