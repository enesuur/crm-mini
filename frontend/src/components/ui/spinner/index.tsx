import styles from "./styles.module.css";

const Spinner = () => (
  <div className={styles.spinnerWrapper} aria-label="Yükleniyor">
    <div className={styles.spinner} />
  </div>
);

export default Spinner;
