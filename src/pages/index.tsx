import styles from "@/styles/Home.module.less";
import { Button } from "antd";
import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1 className="text-center">unocss</h1>
      <h1 className={styles.title}>Css Modules</h1>
      <Button onClick={() => setCount(count + 1)}>{count}++</Button>
    </main>
  );
}
