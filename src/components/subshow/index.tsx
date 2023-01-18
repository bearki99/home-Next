import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.less";
import Link from "next/link";
import classNames from "classnames";
interface IProps {
  children?: ReactNode;
  names?: any;
}

const SubShow: React.FC<IProps> = () => {
  const router = useRouter();
  const { label, names } = router.query;
  const { currentsubTags } = useSelector((state: any) => ({
    currentsubTags: state.header.currentsubTags,
  }));
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
        {currentsubTags &&
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
          })}
      </div>
    </div>
  );
};
export default memo(SubShow);
SubShow.displayName = "SubShow";
