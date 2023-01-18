import React, { ReactNode,useEffect,useState } from "react";
import { memo } from "react";

import AuthorListItem from "@/components/authorListItem";
import {getAuthorListApi} from "@/service/request";

interface IProps {
  children?: ReactNode;
}

const AuthorListBox: React.FC<IProps> = () => {
  let [authorListData,setAuthorListData]=useState([]);
  useEffect(()=>{
    getAuthorListApi().then(res=>{
      setAuthorListData(res.data.list);
    });
  },[]);
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