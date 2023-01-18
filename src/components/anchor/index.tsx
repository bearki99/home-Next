// 实现md anchor list
import { memo } from "react";
import styles from './anchor.module.less'
interface MyProps {
  catalogContent: string,
}
const Anchor: React.FC<MyProps> = (props: MyProps) => {
  const { catalogContent } = props;
  return (
    <>
      <div className={styles.anchor_wrapper}>
        <div dangerouslySetInnerHTML={{ __html: catalogContent }}></div>
      </div>
    </>
  )
}
export default memo(Anchor);
Anchor.displayName = "Anchor";

export function toToc(data: string[]) {
  let levelStack: string[] = []
  let result: string = ''
  const addStartUL = () => { result += '<ul class="catalog-list">'; }
  const addEndUL = () => { result += '</ul>\n'; }
  const addLI = (index: number, itemText: string, itemLabel: string) => {
    result += `<li class="item d${itemLabel}" href="#heading-${index}"><div class="a-container"><a class="catalog-aTag" href="#heading-${index}" title="${itemText}">${itemText}</a></div>`
  }
  const addEndLi = () => { result += '</li>\n'; }
  data?.forEach(function (item: any, index: number) {
    let itemText: string = item.replace(/<\/?[hH][1-6].*?>/g, '');
    let itemLabel: string = item.match(/<\/?[hH]([1-6]).*?>/)[1];

    let levelIndex: number = levelStack.indexOf(itemLabel);
    if (levelIndex === -1) {
      levelStack.unshift(itemLabel)
      addStartUL()
      addLI(index, itemText, itemLabel)
    }
    else if (levelIndex === 0) {
      addLI(index, itemText, itemLabel)
    }
    else {
      while (levelIndex--) {
        levelStack.shift()
        addEndUL()
      }
      addLI(index, itemText, itemLabel)
    }
  })
  while (levelStack.length) {
    levelStack.shift()
    addEndUL()
  }
  return result
}
