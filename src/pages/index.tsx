import styles from "@/styles/Home.module.less";
import { useSelector, useDispatch } from "react-redux";
import type { IAppDispatch, IAppState } from "@/store";
import { incrementAction } from "@/store/modules/home";
import { Button } from "antd";

export default function HomePage() {
  const dispatch = useDispatch<IAppDispatch>();
  const { counter } = useSelector((state: IAppState) => ({
    counter: state.home.counter,
  }));
  function changeCounter() {
    const newCounter = counter + 1;
    dispatch(incrementAction(newCounter));
  }
  return (
    <>
      <main className={styles.title}>main-page</main>
      <div className={styles.counter}>Redux-counter: {counter}</div>
      <Button type="primary" onClick={changeCounter} className={styles.btn}>
        +1
      </Button>
    </>
  );
}
