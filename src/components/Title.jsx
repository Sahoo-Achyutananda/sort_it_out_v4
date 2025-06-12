import styles from "./Title.module.css";

function Title({ title }) {
  return <div key={title} className={styles.title}></div>;
}

export default Title;
