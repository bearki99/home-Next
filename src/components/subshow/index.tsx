import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useState } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import Link from "next/link";
import classNames from "classnames";


interface IProps {
  children?: ReactNode;
  names?: string;
  currentsubTags?: any;
  homeTags?: any[];
}

const SubShow: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { currentsubTags, homeTags } = props;
  const initialLabel =homeTags && homeTags[0].url;
  const { label = initialLabel, names } = router.query;
  const [myshow, setMyshow] = useState(false);
  const changeshow = useCallback(() => {
    setMyshow(true);
  }, []);
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
        {myshow || (currentsubTags && currentsubTags.length <= 9)
          ? currentsubTags &&
            currentsubTags.map((item: any) => {
              return (
                <Link
                  href={"/" + label + "/" + item.label}
                  key={item.id}
                  className={classNames(
                    {
                      [styles.activeItem]: names == item.label,
                    },
                    [styles.item]
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })
          : currentsubTags &&
            currentsubTags.slice(0, 9).map((item: any) => {
              return (
                <Link
                  href={"/" + label + "/" + item.label}
                  key={item.label}
                  className={classNames(
                    {
                      [styles.activeItem]: names == item.label,
                    },
                    [styles.item]
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
        {!myshow && currentsubTags && currentsubTags.length > 9 && (
          <div
            className={classNames([styles.item], [styles.allBtn])}
            onClick={changeshow}
          >
            <span>展开</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(SubShow);
SubShow.displayName = "SubShow";
