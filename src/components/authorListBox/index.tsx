import React, { ReactNode } from "react";
import { memo } from "react";

import AuthorListItem from "@/components/authorListItem";

import { useSelector } from "react-redux";
import type { IAppState } from "@/store";

interface IProps {
  children?: ReactNode;
}

const AuthorListBox: React.FC<IProps> = () => {
  const { authorListData } = useSelector((state: IAppState) => ({
    authorListData: state.authorList.authors
  }));

  return <div>
    <div style={{ padding: "12px 15.5px", color: "var(--color)" }}>🎖️作者榜</div>
    <div className="authorList">
      {
        authorListData && authorListData.map((item: any) => {
          return (
            <AuthorListItem author={item} key={item.id}></AuthorListItem>
          );
        })
      }
    </div>
  </div>;
};
export default memo(AuthorListBox);
AuthorListBox.displayName = "AuthorListBox";