import React, { ReactNode, useEffect, useState } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { Button } from "antd";
interface IProps {
  children?: ReactNode;
}

const DarkBtn: React.FC<IProps> = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDark && document) document.body.className = "dark";
      else document.body.className = "light";
    }
  }, [isDark]);
  return (
    <div
      className={styles.darkContent}
      onClick={() => {
        setIsDark(!isDark);
      }}
    >
      {!isDark ? (
        <Button className={styles.darkBtn}>黑暗模式</Button>
      ) : (
        <Button className={styles.lightBtn}>白天模式</Button>
      )}
    </div>
  );
};
export default memo(DarkBtn);
DarkBtn.displayName = "DarkBtn";
