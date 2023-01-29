import React, { ReactNode, useEffect, useState } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { Button } from "antd";
interface IProps {
  children?: ReactNode;
}

const DarkBtn: React.FC<IProps> = () => {
  const [isDark, setIsDark] = useState(false);
  const [flag, setFlag] = useState(false);
  const handleClick = () => {
    if (!isDark) localStorage.setItem("myDark", "1");
    else localStorage.setItem("myDark", "0");
    setIsDark(!isDark);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document && localStorage.getItem("myDark") == null) {
        document.body.className = "light";
        setFlag(false);
      } else if (localStorage.getItem("myDark") == "1") {
        document.body.className = "dark";
        setFlag(true);
      } else {
        document.body.className = "light";
        setFlag(false);
      }
    }
  }, [isDark]);
  return (
    <div className={styles.darkContent} onClick={handleClick}>
      {!isDark && !flag ? (
        <Button className={styles.darkBtn}>黑暗模式</Button>
      ) : (
        <Button className={styles.lightBtn}>白天模式</Button>
      )}
    </div>
  );
};
export default memo(DarkBtn);
DarkBtn.displayName = "DarkBtn";
