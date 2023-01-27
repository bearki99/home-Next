import React, { memo, Component } from "react";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import theme from "../plugin-theme";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight-ssr";
import { Viewer } from "@bytemd/react";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";

interface IProps {
  value: string;
  themeName: string;
}
interface IState {
  minLevel: number,
  hast: any[],
  throttledScrollHandler: Function,
  itemOffsetTop: any[],
  headNum: number
}

/**
 * md编辑器组件
 */
class MdViewer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  plugins = [
    frontmatter(),
    gemoji(),
    math(),
    mediumZoom(),
    mermaid(),
    gfm(),
    highlight(),
    theme(this.props.themeName),
  ];

  transformToId() {
    const dom = document.querySelector(".markdown-body") as HTMLElement;
    let children = Array.from(dom.children) as HTMLElement[];
    if (children.length > 0) {
      let index = 0;
      for (let i = 0; i < children.length; i++) {
        const tagName = children[i].tagName;
        if (tagName === "H1" || tagName === "H2" || tagName === "H3") {
          children[i].setAttribute("data-id", `heading-${index++}`);
          children[i].classList.add("heading");
        }
      }
    }
  }

  componentDidMount() {
    this.transformToId();
  }

  render() {
    return (
      <Viewer value={this.props.value} plugins={this.plugins} />
    );
  }
}
export default memo(MdViewer);
