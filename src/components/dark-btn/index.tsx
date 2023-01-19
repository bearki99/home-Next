import React, { ReactNode } from "react";
import { memo } from "react";
import styles from "./style.module.less";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "@/store";
import { changeIsDarkAction } from "../header/store";
interface IProps {
  children?: ReactNode;
}

const DarkBtn: React.FC<IProps> = () => {
  const { isDark } = useSelector((state: IAppState) => ({
    isDark: state.header.isDark,
  }));
  if (typeof window !== "undefined") {
    if (isDark && document) document.body.className = "dark";
    else document.body.className = "light";
  }

  const dispatch = useDispatch();
  return (
    <div
      className={styles.darkContent}
      onClick={() => {
        dispatch(changeIsDarkAction(!isDark));
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
