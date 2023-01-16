import React, { ReactNode } from "react";
import { memo } from "react";
import data from "@/assets/data/header-data.json";
import styles from "./header.module.less";

import Link from "next/link";
import { Button } from "antd";
interface IProps {
  children?: ReactNode;
}

const Header: React.FC<IProps> = () => {
  return (
    <div className={styles.header}>
      {data.map((item: any) => {
        return <Link key={item.url} href={item.url}>
          <Button>{item.name}</Button>
        </Link>;
      })}
    </div>
  );
};

export default memo(Header);
Header.displayName = "Header";
