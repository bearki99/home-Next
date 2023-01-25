import React, { ReactNode } from "react";
import { memo } from "react";
interface IProps {
  children?: ReactNode;
}
// 课程页面
const Course: React.FC<IProps> = () => {
  return <div>Course</div>;
};
export default memo(Course);
Course.displayName = "Course";
