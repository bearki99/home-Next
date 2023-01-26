import React, { ReactNode, useState } from "react";
import { memo } from "react";
import styles from "./styles.module.less";
import { Input, Button } from "antd";
import classNames from "classnames";
interface IProps {
  children?: ReactNode;
}
const HeaderInput: React.FC<IProps> = () => {
  const [isFocus, setFocus] = useState(false);
  function handleFocus() {
    setFocus(true);
  }
  function handleBlur() {
    setFocus(false);
  }
  return (
    <div className={styles.rightContent1}>
      <div className={styles.rightContentFirst}>
        <div
          className={classNames(
            {
              [styles.active]: isFocus === true,
            },
            styles.cotainer
          )}
        >
          <Input
            className={classNames(
              {
                [styles.inputActive]: isFocus === true,
              },
              styles.myInput
            )}
            maxLength={32}
            placeholder={"搜索稀土掘金"}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></Input>
          <div
            className={classNames(
              {
                [styles.searchBtnActive]: isFocus,
              },
              styles.searchBtnCotainer
            )}
          >
            <div
              className={classNames(
                {
                  [styles.searchContentActive]: isFocus,
                },
                styles.searchBtn
              )}
            />
          </div>
        </div>
        <div className={styles.creator}>
          <Button type="primary">创作者中心</Button>
        </div>
      </div>
    </div>
  );
};
export default memo(HeaderInput);
HeaderInput.displayName = "HeaderInput";
