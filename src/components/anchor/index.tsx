// 实现md anchor list
import { LegacyRef, memo } from "react";
import styles from "./anchor.module.less";
import React from "react";
interface IProps {
  catalogContent: string,
  anchorRef: LegacyRef<HTMLDivElement>
}
interface AnchorProps {
  catalogContent: string,
}
const Anchor: React.FC<IProps> = (props: IProps) => {
  const { catalogContent, anchorRef } = props;
  return (
    <div className={styles.anchor_wrapper} ref={anchorRef}>
      <div dangerouslySetInnerHTML={{ __html: catalogContent }}></div>
    </div>
  );
};

export function toToc(data: string[]) {
  let levelStack: string[] = [];
  let result: string = "";
  const addStartUL = () => {
    result += '<ul class="catalog-list">';  // eslint-disable-line
  };
  const addEndUL = () => {
    result += "</ul>\n";
  };
  const addLI = (index: number, itemText: string, itemLabel: string) => {
    result += `<li class="item d${itemLabel}" href="#heading-${index}"><div class="a-container"><a class="catalog-aTag" href="#heading-${index}" title="${itemText}">${itemText}</a></div>`;
  };
  data?.forEach(function (item: any, index: number) {
    let itemText: string = item.replace(/<\/?[hH][1-6].*?>/g, "");
    let itemLabel: string = item.match(/<\/?[hH]([1-6]).*?>/)[1];

    let levelIndex: number = levelStack.indexOf(itemLabel);
    if (levelIndex === -1) {
      levelStack.unshift(itemLabel);
      addStartUL();
      addLI(index, itemText, itemLabel);
    } else if (levelIndex === 0) {
      addLI(index, itemText, itemLabel);
    } else {
      while (levelIndex--) {
        levelStack.shift();
        addEndUL();
      }
      addLI(index, itemText, itemLabel);
    }
  });
  while (levelStack.length) {
    levelStack.shift();
    addEndUL();
  }
  return result;
}

export default memo(React.forwardRef((props: AnchorProps, ref: LegacyRef<HTMLDivElement>) => <Anchor anchorRef={ref} catalogContent={(props as IProps).catalogContent} />));
Anchor.displayName = "Anchor";
